import { codeToHtml } from "shiki";
import { random } from "ph-utils";
import { elem, getAttr } from "ph-utils/dom";
export default class SourceCode extends HTMLElement {
    async connectedCallback() {
        let $textareas = elem("textarea", this);
        if ($textareas == null || $textareas.length === 0) {
            const $template = elem(".template", this)[0];
            if ($template != null) {
                $textareas = elem("textarea", $template);
            }
        }
        const len = $textareas.length;
        if (len === 1 && !$textareas[0].name) {
            this.innerHTML = await this.tagCode($textareas[0], true);
        }
        else {
            const tabStr = [];
            const codeStr = [];
            const name = `group-_${random(4)}`;
            for (let i = 0; i < len; i++) {
                const $textarea = $textareas[i];
                if ($textarea.value) {
                    const id = `tab-${random(7)}`;
                    const tabname = $textarea.name || getAttr($textarea, "lang", "ts");
                    tabStr.push(`<input type="radio" name="${name}" id="${id}"${i === 0 ? " checked" : ""}>`);
                    tabStr.push(`<label for="${id}">${tabname}</label>`);
                    const codeHtml = await this.tagCode($textarea, i === 0);
                    codeStr.push(codeHtml);
                }
            }
            const res = [
                '<div class="vp-code-group vp-adaptive-theme">',
                `<div class="tabs">${tabStr.join("")}</div>`,
                `<div class="blocks">${codeStr.join("")}</div></div>`,
            ];
            this.innerHTML = res.join("");
        }
    }
    async tagCode(area, active = false) {
        const lang = getAttr(area, "lang", "ts");
        const code = await this.parseCodeTempte(area.value, lang);
        const inners = [
            `<div class="source-code language-ts vp-adaptive-theme line-numbers-mode${active ? " active" : ""}">`,
        ];
        const showCopy = getAttr(this, "show-copy", true);
        if (showCopy) {
            inners.push('<button title="Copy Code" class="copy"></button>');
        }
        inners.push(`<span class="lang">${lang}</span>${code}</div>`);
        return inners.join("");
    }
    /**
     * 格式化匹配的代码, 只是去除多余的空格, 使对齐
     *
     * @param {string} sourceStr 源代码字符串
     *
     * @returns {string} 对齐后的源代码
     */
    formatCode(sourceStr) {
        const rows = sourceStr.split("\n");
        let startTrimCount = -1;
        const res = [];
        for (let row of rows) {
            if (row === "" && startTrimCount === -1)
                continue;
            // 计算开头的空格数量
            if (startTrimCount === -1) {
                startTrimCount = 0;
                const startTrimMatch = row.match(/^\s*/);
                if (startTrimMatch != null) {
                    startTrimCount = startTrimMatch[0].length;
                }
            }
            row = row.replace(new RegExp(`^(\\s{${startTrimCount}})`), "");
            row = row.replace("<!---->", "").replace("//-", "");
            res.push(row);
        }
        return res.join("\n");
    }
    async parseCodeTempte(preCode, lang = "ts") {
        const sourceCode = this.formatCode(preCode);
        if (typeof sourceCode === "string" && sourceCode) {
            let preCode = await codeToHtml(sourceCode.trim(), {
                lang,
                themes: {
                    light: "github-light",
                    dark: "github-dark",
                },
                defaultColor: false,
            });
            preCode = preCode.replace("github-dark", "github-dark vp-code");
            const lineMatch = preCode.match(/class="line"/g);
            const lineNumber = lineMatch ? lineMatch.length : 0;
            const fragment = document.createElement("div");
            const parser = new DOMParser();
            const doc = parser.parseFromString(preCode, "text/html");
            const children = doc.body.children;
            for (let i = 0, len = children.length; i < len; i++) {
                if (children[i] != null) {
                    fragment.appendChild(children[i]);
                }
            }
            const $lineNumber = document.createElement("div");
            $lineNumber.className = "line-numbers-wrapper";
            $lineNumber.setAttribute("aria-hidden", "true");
            let $lineTmp = "";
            for (let i = 1; i <= lineNumber; i++) {
                $lineTmp += `<span class="line-number">${i}</span><br>`;
            }
            $lineNumber.innerHTML = $lineTmp;
            fragment.appendChild($lineNumber);
            return fragment.innerHTML;
        }
        return "";
    }
}
