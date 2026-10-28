import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { API } from "typescript/unstable/sync";
import { createVirtualFileSystem } from "typescript/unstable/fs";
import * as ts from "typescript/unstable/ast";

const repository = fileURLToPath(new URL("../", import.meta.url));
const slash = (value) => value.replaceAll("\\", "/");
const unique = (items) => [...new Set(items)].sort();

export const limitations = [
  "Uses the installed TypeScript 7 unstable AST API; it does not execute component code or build lib/.",
  "The graph includes syntactic value imports/re-exports and literal dynamic imports, including deferred imports; it excludes explicitly type-only syntax, not inferred type-only usage.",
  "Top-level operations are CallExpression/NewExpression sites outside function bodies and instance initializers. Class static initializers, static blocks, heritage expressions and computed names are included; conditional sites may not execute.",
  "Function calls (including IIFEs), constructor bodies, getters, decorators and external packages are not evaluated. Their transitive effects, indirect calls, assignments and DOM behaviour require manual/runtime checks.",
  "Registration records describe direct identifier/array arguments to calls spelled regist or customElements.define; aliases, computed registrations and optional UI dependencies require manual review.",
  "Nonliteral imports cannot be resolved statically. Style imports are inventoried, not interpreted as global style installation. Cycles are reported for review, not rejected on their own.",
];

function location(source, node) {
  const point = source.getLineAndCharacterOfPosition(node.getStart(source));
  return { line: point.line + 1, column: point.character + 1 };
}

function runtimeImport(node) {
  const clause = node.importClause;
  if (!clause) return true;
  if (clause.isTypeOnly) return false;
  if (clause.name || !clause.namedBindings || !ts.isNamedImports(clause.namedBindings)) return true;
  return (
    clause.namedBindings.elements.length === 0 ||
    clause.namedBindings.elements.some((element) => !element.isTypeOnly)
  );
}

function runtimeExport(node) {
  if (!node.moduleSpecifier || node.isTypeOnly) return false;
  return (
    !node.exportClause ||
    !ts.isNamedExports(node.exportClause) ||
    node.exportClause.elements.length === 0 ||
    node.exportClause.elements.some((element) => !element.isTypeOnly)
  );
}

function stringLiteral(node) {
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node));
}

function scanSource(source, id) {
  const imports = [];
  const bindings = {};
  const topLevelOperations = [];
  const registrationCalls = [];
  const dynamicImports = [];
  const tags = {};
  const addImport = (node, specifier, kind) => {
    imports.push({ specifier, kind, ...location(source, node) });
  };

  for (const statement of source.statements) {
    if (ts.isImportDeclaration(statement) && runtimeImport(statement)) {
      const specifier = statement.moduleSpecifier.text;
      addImport(statement, specifier, "import");
      const clause = statement.importClause;
      if (clause?.name) bindings[clause.name.text] = specifier;
      if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        for (const binding of clause.namedBindings.elements) {
          if (!binding.isTypeOnly) bindings[binding.name.text] = specifier;
        }
      }
    } else if (ts.isExportDeclaration(statement) && runtimeExport(statement)) {
      addImport(statement, statement.moduleSpecifier.text, "re-export");
    } else if (
      ts.isImportEqualsDeclaration(statement) &&
      !statement.isTypeOnly &&
      ts.isExternalModuleReference(statement.moduleReference) &&
      stringLiteral(statement.moduleReference.expression)
    ) {
      addImport(statement, statement.moduleReference.expression.text, "import-equals");
      bindings[statement.name.text] = statement.moduleReference.expression.text;
    }
    if (ts.isClassDeclaration(statement)) {
      for (const member of statement.members) {
        if (
          ts.isPropertyDeclaration(member) &&
          member.name?.getText(source) === "baseName" &&
          member.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword) &&
          stringLiteral(member.initializer)
        ) {
          tags[statement.name?.text ?? "default"] = `l-${member.initializer.text}`;
          if (
            statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword)
          )
            tags.default = `l-${member.initializer.text}`;
        }
      }
    }
  }

  // Runtime dependency sites can occur inside functions; import types cannot.
  function visitImports(node) {
    if (ts.isTypeNode(node)) return;
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      if (stringLiteral(node.arguments[0])) {
        addImport(node, node.arguments[0].text, "dynamic-import");
      } else {
        dynamicImports.push({ expression: node.getText(source), ...location(source, node) });
      }
    }
    node.forEachChild(visitImports);
  }
  source.forEachChild(visitImports);

  function visitTopLevel(node, context = "module") {
    if (ts.isTypeNode(node)) return;
    if (node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DeclareKeyword)) return;
    if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node))
      return;
    if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
      // Decorator expressions are inventoried; decorator invocation is not simulated.
      for (const modifier of node.modifiers ?? []) {
        if (ts.isDecorator(modifier)) visitTopLevel(modifier.expression, "decorator-expression");
      }
      for (const clause of node.heritageClauses ?? []) {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
          for (const type of clause.types) visitTopLevel(type.expression, "class-heritage");
        }
      }
      for (const member of node.members) {
        if (member.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DeclareKeyword))
          continue;
        if (member.name && ts.isComputedPropertyName(member.name)) {
          visitTopLevel(member.name.expression, "computed-name");
        }
        for (const modifier of member.modifiers ?? []) {
          if (ts.isDecorator(modifier)) visitTopLevel(modifier.expression, "decorator-expression");
        }
        if (ts.isClassStaticBlockDeclaration(member)) {
          visitTopLevel(member.body, "class-static-block");
        } else if (
          ts.isPropertyDeclaration(member) &&
          member.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword) &&
          member.initializer
        ) {
          visitTopLevel(member.initializer, "class-static-field");
        }
      }
      return;
    }
    if (
      ts.isMethodDeclaration(node) ||
      ts.isGetAccessorDeclaration(node) ||
      ts.isSetAccessorDeclaration(node) ||
      ts.isConstructorDeclaration(node)
    ) {
      if (node.name && ts.isComputedPropertyName(node.name))
        visitTopLevel(node.name.expression, "computed-name");
      return;
    }
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) {
      const callee = node.expression.getText(source);
      const operation = {
        kind: ts.isNewExpression(node) ? "new" : "call",
        callee,
        expression: node.getText(source),
        context,
        pureAnnotated: /[@#]__PURE__/.test(
          source.text.slice(node.getFullStart(), node.getStart(source)),
        ),
        ...location(source, node),
      };
      topLevelOperations.push(operation);
      if (operation.kind === "call" && ["regist", "customElements.define"].includes(callee)) {
        const argument = node.arguments[callee === "regist" ? 0 : 1];
        const identifiers =
          argument && ts.isArrayLiteralExpression(argument)
            ? argument.elements.filter(ts.isIdentifier)
            : argument && ts.isIdentifier(argument)
              ? [argument]
              : [];
        registrationCalls.push({
          callee,
          arguments: node.arguments.map((item) => item.getText(source)),
          bindings: identifiers.map((item) => ({
            name: item.text,
            specifier: bindings[item.text],
          })),
          ...location(source, node),
        });
      }
    }
    node.forEachChild((child) => visitTopLevel(child, context));
  }
  source.forEachChild((node) => visitTopLevel(node));
  return { id, imports, tags, topLevelOperations, registrationCalls, dynamicImports };
}

function resolveDependency(from, specifier, sources) {
  if (/\.(?:css|less|scss|sass)(?:[?#]|$)/i.test(specifier)) {
    return {
      category: "style",
      target: specifier.startsWith(".")
        ? path.posix.normalize(
            path.posix.join(path.posix.dirname(from), specifier.split(/[?#]/)[0]),
          )
        : specifier.split(/[?#]/)[0],
    };
  }
  if (!specifier.startsWith(".")) return { category: "external", target: specifier };
  const base = path.posix.normalize(
    path.posix.join(path.posix.dirname(from), specifier.split(/[?#]/)[0]),
  );
  const target = [base, `${base}.ts`, `${base}/index.ts`, base.replace(/\.js$/, ".ts")].find(
    (candidate) => Object.hasOwn(sources, candidate),
  );
  return { category: target ? "module" : "unresolved", target: target ?? base };
}

function reachable(modules, start) {
  const paths = new Map([[start, [start]]]);
  for (const [id, trail] of paths) {
    for (const dependency of modules[id].dependencies) {
      if (dependency.category === "module" && !paths.has(dependency.target)) {
        paths.set(dependency.target, [...trail, dependency.target]);
      }
    }
  }
  return paths;
}

export function checkBoundaries(modules, { entryPrefix = "entries/", barrel = "index.ts" } = {}) {
  const violations = [];
  for (const id of Object.keys(modules).sort()) {
    const entry = id.startsWith(entryPrefix);
    for (const [target, trail] of reachable(modules, id)) {
      if (id === target) continue;
      const entersRegistration = target.startsWith(entryPrefix);
      if ((target === barrel && id !== barrel) || (!entry && entersRegistration)) {
        violations.push({
          rule: entry
            ? "entry-imports-barrel"
            : entersRegistration
              ? "implementation-imports-entry"
              : "implementation-imports-barrel",
          from: id,
          target,
          path: trail,
        });
      }
    }
  }
  return violations;
}

function findCycles(modules) {
  const visited = new Set();
  const active = new Map();
  const stack = [];
  const cycles = [];
  function visit(id) {
    if (active.has(id)) {
      cycles.push([...stack.slice(active.get(id)), id]);
      return;
    }
    if (visited.has(id)) return;
    visited.add(id);
    active.set(id, stack.length);
    stack.push(id);
    for (const edge of modules[id].dependencies) {
      if (edge.category === "module") visit(edge.target);
    }
    stack.pop();
    active.delete(id);
  }
  for (const id of Object.keys(modules).sort()) visit(id);
  return cycles;
}

/** Parse supplied .ts source text without writing files or running components. */
export function analyzeSources(input, options = {}) {
  const sources = Object.fromEntries(
    Object.entries(input)
      .filter(([id]) => id.endsWith(".ts") && !id.endsWith(".d.ts"))
      .map(([id, text]) => [slash(id), text])
      .sort(([a], [b]) => a.localeCompare(b)),
  );
  const virtualRoot = slash(path.join(repository, ".dependency-audit-virtual"));
  const config = `${virtualRoot}/tsconfig.json`;
  const virtualFiles = Object.fromEntries(
    Object.entries(sources).map(([id, text]) => [`${virtualRoot}/${id}`, text]),
  );
  virtualFiles[config] = JSON.stringify({
    files: Object.keys(sources),
    compilerOptions: {
      noLib: true,
      noResolve: true,
      target: "esnext",
      experimentalDecorators: true,
    },
  });
  const api = new API({ cwd: repository, fs: createVirtualFileSystem(virtualFiles) });
  const modules = {};
  const parseErrors = [];
  let snapshot;
  try {
    snapshot = api.updateSnapshot({ openProjects: [config] });
    const project = snapshot.getProject(config);
    if (!project) throw new Error("TypeScript did not load the audit virtual project");
    for (const id of Object.keys(sources)) {
      const source = project.program.getSourceFile(`${virtualRoot}/${id}`);
      if (!source) throw new Error(`TypeScript did not parse ${id}`);
      const module = scanSource(source, id);
      module.dependencies = module.imports.map((dependency) => ({
        ...dependency,
        ...resolveDependency(id, dependency.specifier, sources),
      }));
      delete module.imports;
      modules[id] = module;
    }
    for (const diagnostic of project.program.getSyntacticDiagnostics()) {
      parseErrors.push({ code: diagnostic.code, message: diagnostic.messageText });
    }
  } finally {
    snapshot?.dispose();
    api.close();
  }
  const entryPrefix = options.entryPrefix ?? "entries/";
  const entryIds = Object.keys(modules).filter((id) => id.startsWith(entryPrefix));
  const closures = Object.fromEntries(
    entryIds.map((id) => [id, [...reachable(modules, id).keys()].sort()]),
  );
  const sharedModules = Object.keys(modules)
    .map((id) => ({
      module: id,
      entries: entryIds.filter((entry) => closures[entry].includes(id)),
    }))
    .filter((item) => item.entries.length > 1);
  const sharedIds = new Set(sharedModules.map((item) => item.module));
  const entries = Object.fromEntries(
    entryIds.map((entry) => {
      const closure = closures[entry];
      const edges = closure.flatMap((id) =>
        modules[id].dependencies.map((edge) => ({ ...edge, from: id })),
      );
      const registrations = closure.flatMap((id) =>
        modules[id].registrationCalls.map((call) => ({
          ...call,
          module: id,
          bindings: call.bindings.map((binding) => {
            const dependency =
              binding.specifier && resolveDependency(id, binding.specifier, sources);
            return {
              ...binding,
              implementation: dependency?.category === "module" ? dependency.target : undefined,
              tag:
                dependency?.category === "module"
                  ? modules[dependency.target].tags.default
                  : undefined,
            };
          }),
        })),
      );
      return [
        entry,
        {
          modules: closure,
          registrationEntries: closure.filter((id) => id !== entry && id.startsWith(entryPrefix)),
          registrations,
          sharedModules: closure.filter((id) => sharedIds.has(id)),
          styles: edges.filter((edge) => edge.category === "style"),
          externals: edges.filter((edge) => edge.category === "external"),
        },
      ];
    }),
  );
  const violations = checkBoundaries(modules, options);
  const unresolved = Object.values(modules).flatMap((module) =>
    module.dependencies
      .filter((dependency) => dependency.category === "unresolved")
      .map((dependency) => ({ module: module.id, ...dependency })),
  );
  return {
    ok: violations.length === 0 && unresolved.length === 0 && parseErrors.length === 0,
    summary: {
      modules: Object.keys(modules).length,
      entries: entryIds.length,
      runtimeEdges: Object.values(modules).reduce(
        (sum, module) => sum + module.dependencies.length,
        0,
      ),
      topLevelOperations: Object.values(modules).reduce(
        (sum, module) => sum + module.topLevelOperations.length,
        0,
      ),
    },
    violations,
    unresolved,
    parseErrors,
    cycles: findCycles(modules),
    entries,
    sharedModules,
    modules,
    limitations,
  };
}

export function auditRepository(root = path.join(repository, "src/components")) {
  const sources = {};
  function readDirectory(directory) {
    for (const item of readdirSync(directory, { withFileTypes: true })) {
      const full = path.join(directory, item.name);
      if (item.isDirectory()) readDirectory(full);
      else if (item.isFile() && item.name.endsWith(".ts") && !item.name.endsWith(".d.ts")) {
        sources[slash(path.relative(root, full))] = readFileSync(full, "utf8");
      }
    }
  }
  readDirectory(root);
  return analyzeSources(sources);
}

export function formatSummary(audit) {
  const { summary } = audit;
  const lines = [
    `Dependency audit: ${audit.ok ? "PASS" : "FAIL"}`,
    `${summary.modules} modules; ${summary.entries} entries; ${summary.runtimeEdges} runtime edges; ${summary.topLevelOperations} top-level Call/New sites`,
    `${audit.violations.length} boundary violations; ${audit.unresolved.length} unresolved imports; ${audit.parseErrors.length} syntax errors; ${audit.cycles.length} cycles`,
  ];
  for (const [id, entry] of Object.entries(audit.entries)) {
    const registrations = unique(
      entry.registrations.flatMap((call) =>
        call.bindings.map((binding) => binding.tag ?? binding.name),
      ),
    );
    lines.push(
      `${id}: ${entry.modules.length} modules; registers [${registrations.join(", ")}]; styles [${unique(entry.styles.map((edge) => edge.target)).join(", ")}]; external [${unique(entry.externals.map((edge) => edge.target)).join(", ")}]`,
    );
  }
  for (const violation of audit.violations)
    lines.push(`${violation.rule}: ${violation.path.join(" -> ")}`);
  for (const unresolved of audit.unresolved)
    lines.push(`unresolved: ${unresolved.module}:${unresolved.line} ${unresolved.specifier}`);
  for (const error of audit.parseErrors)
    lines.push(`syntax error TS${error.code}: ${JSON.stringify(error.message)}`);
  for (const cycle of audit.cycles) lines.push(`cycle: ${cycle.join(" -> ")}`);
  lines.push("Static scan only. Use --json for complete graphs, operation sites and limitations.");
  return lines.join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const args = process.argv.slice(2);
    if (args.some((arg) => arg !== "--json"))
      throw new Error("Usage: node scripts/audit-dependencies.mjs [--json]");
    const audit = auditRepository();
    process.stdout.write(
      `${args.includes("--json") ? JSON.stringify(audit, null, 2) : formatSummary(audit)}\n`,
    );
    if (!audit.ok) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}