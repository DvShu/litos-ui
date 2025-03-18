import t from"./vue.3fTHZ0-y.js";import e from"./javascript.DFxyEsuO.js";import"./html.DdvSvpI8.js";import"./css.6ydISZ1j.js";import"./typescript.6msxI5qU.js";import"./json.BLmTiKMJ.js";import"./html-derivative.Bgz295Fz.js";const n=Object.freeze(JSON.parse(`{"displayName":"Vue HTML","fileTypes":[],"name":"vue-html","patterns":[{"include":"source.vue#vue-interpolations"},{"begin":"(<)([A-Z][a-zA-Z0-9:\\\\-]*)(?=[^>]*></\\\\2>)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html"},"2":{"name":"support.class.component.html"}},"end":"(>)(<)(/)(\\\\2)(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html"},"2":{"name":"punctuation.definition.tag.begin.html meta.scope.between-tag-pair.html"},"3":{"name":"punctuation.definition.tag.begin.html"},"4":{"name":"support.class.component.html"},"5":{"name":"punctuation.definition.tag.end.html"}},"name":"meta.tag.any.html","patterns":[{"include":"#tag-stuff"}]},{"begin":"(<)([a-z][a-zA-Z0-9:\\\\-]*)(?=[^>]*></\\\\2>)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html"},"2":{"name":"entity.name.tag.html"}},"end":"(>)(<)(/)(\\\\2)(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html"},"2":{"name":"punctuation.definition.tag.begin.html meta.scope.between-tag-pair.html"},"3":{"name":"punctuation.definition.tag.begin.html"},"4":{"name":"entity.name.tag.html"},"5":{"name":"punctuation.definition.tag.end.html"}},"name":"meta.tag.any.html","patterns":[{"include":"#tag-stuff"}]},{"begin":"(<\\\\?)(xml)","captures":{"1":{"name":"punctuation.definition.tag.html"},"2":{"name":"entity.name.tag.xml.html"}},"end":"(\\\\?>)","name":"meta.tag.preprocessor.xml.html","patterns":[{"include":"#tag-generic-attribute"},{"include":"#string-double-quoted"},{"include":"#string-single-quoted"}]},{"begin":"<!--","captures":{"0":{"name":"punctuation.definition.comment.html"}},"end":"-->","name":"comment.block.html"},{"begin":"<!","captures":{"0":{"name":"punctuation.definition.tag.html"}},"end":">","name":"meta.tag.sgml.html","patterns":[{"begin":"(?i:DOCTYPE)","captures":{"1":{"name":"entity.name.tag.doctype.html"}},"end":"(?=>)","name":"meta.tag.sgml.doctype.html","patterns":[{"match":"\\"[^\\">]*\\"","name":"string.quoted.double.doctype.identifiers-and-DTDs.html"}]},{"begin":"\\\\[CDATA\\\\[","end":"]](?=>)","name":"constant.other.inline-data.html"},{"match":"(\\\\s*)(?!--|>)\\\\S(\\\\s*)","name":"invalid.illegal.bad-comments-or-CDATA.html"}]},{"begin":"(</?)([A-Z][a-zA-Z0-9:\\\\-]*\\\\b)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html"},"2":{"name":"support.class.component.html"}},"end":"(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html"}},"name":"meta.tag.block.any.html","patterns":[{"include":"#tag-stuff"}]},{"begin":"(</?)([a-z][a-zA-Z0-9:\\\\-]*\\\\b)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html"},"2":{"name":"entity.name.tag.block.any.html"}},"end":"(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html"}},"name":"meta.tag.block.any.html","patterns":[{"include":"#tag-stuff"}]},{"begin":"(</?)((?i:body|head|html)\\\\b)","captures":{"1":{"name":"punctuation.definition.tag.begin.html"},"2":{"name":"entity.name.tag.structure.any.html"}},"end":"(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html"}},"name":"meta.tag.structure.any.html","patterns":[{"include":"#tag-stuff"}]},{"begin":"(</?)((?i:address|blockquote|dd|div|dl|dt|fieldset|form|frame|frameset|h1|h2|h3|h4|h5|h6|iframe|noframes|object|ol|p|ul|applet|center|dir|hr|menu|pre)(?!-)\\\\b)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html"},"2":{"name":"entity.name.tag.block.any.html"}},"end":"(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html"}},"name":"meta.tag.block.any.html","patterns":[{"include":"#tag-stuff"}]},{"begin":"(</?)((?i:a|abbr|acronym|area|b|base|basefont|bdo|big|br|button|caption|cite|code|col|colgroup|del|dfn|em|font|head|html|i|img|input|ins|isindex|kbd|label|legend|li|link|map|meta|noscript|optgroup|option|param|[qs]|samp|script|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|tt|u|var)(?!-)\\\\b)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html"},"2":{"name":"entity.name.tag.inline.any.html"}},"end":"(/?>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html"}},"name":"meta.tag.inline.any.html","patterns":[{"include":"#tag-stuff"}]},{"begin":"(</?)([a-zA-Z0-9:\\\\-]+)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html"},"2":{"name":"entity.name.tag.other.html"}},"end":"(/?>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html"}},"name":"meta.tag.other.html","patterns":[{"include":"#tag-stuff"}]},{"include":"#entities"},{"match":"<>","name":"invalid.illegal.incomplete.html"},{"match":"<","name":"invalid.illegal.bad-angle-bracket.html"}],"repository":{"entities":{"patterns":[{"captures":{"1":{"name":"punctuation.definition.entity.html"},"3":{"name":"punctuation.definition.entity.html"}},"match":"(&)([a-zA-Z0-9]+|#[0-9]+|#x\\\\h+)(;)","name":"constant.character.entity.html"},{"match":"&","name":"invalid.illegal.bad-ampersand.html"}]},"string-double-quoted":{"begin":"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.html"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.html"}},"name":"string.quoted.double.html","patterns":[{"include":"source.vue#vue-interpolations"},{"include":"#entities"}]},"string-single-quoted":{"begin":"'","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.html"}},"end":"'","endCaptures":{"0":{"name":"punctuation.definition.string.end.html"}},"name":"string.quoted.single.html","patterns":[{"include":"source.vue#vue-interpolations"},{"include":"#entities"}]},"tag-generic-attribute":{"match":"(?<=[^=])\\\\b([a-zA-Z0-9:\\\\-_]+)","name":"entity.other.attribute-name.html"},"tag-id-attribute":{"begin":"\\\\b(id)\\\\b\\\\s*(=)","captures":{"1":{"name":"entity.other.attribute-name.id.html"},"2":{"name":"punctuation.separator.key-value.html"}},"end":"(?!\\\\G)(?<=['\\"[^\\\\s<>/]])","name":"meta.attribute-with-value.id.html","patterns":[{"begin":"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.html"}},"contentName":"meta.toc-list.id.html","end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.html"}},"name":"string.quoted.double.html","patterns":[{"include":"source.vue#vue-interpolations"},{"include":"#entities"}]},{"begin":"'","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.html"}},"contentName":"meta.toc-list.id.html","end":"'","endCaptures":{"0":{"name":"punctuation.definition.string.end.html"}},"name":"string.quoted.single.html","patterns":[{"include":"source.vue#vue-interpolations"},{"include":"#entities"}]},{"captures":{"0":{"name":"meta.toc-list.id.html"}},"match":"(?<==)(?:[^\\\\s<>/'\\"]|/(?!>))+","name":"string.unquoted.html"}]},"tag-stuff":{"patterns":[{"include":"#vue-directives"},{"include":"#tag-id-attribute"},{"include":"#tag-generic-attribute"},{"include":"#string-double-quoted"},{"include":"#string-single-quoted"},{"include":"#unquoted-attribute"}]},"unquoted-attribute":{"match":"(?<==)(?:[^\\\\s<>/'\\"]|/(?!>))+","name":"string.unquoted.html"},"vue-directives":{"begin":"(?:\\\\b(v-)|([:@#]))([a-zA-Z0-9\\\\-_]+)(?::([a-zA-Z\\\\-_]+))?(?:\\\\.([a-zA-Z\\\\-_]+))*\\\\s*(=)","captures":{"1":{"name":"entity.other.attribute-name.html"},"2":{"name":"punctuation.separator.key-value.html"},"3":{"name":"entity.other.attribute-name.html"},"4":{"name":"entity.other.attribute-name.html"},"5":{"name":"entity.other.attribute-name.html"},"6":{"name":"punctuation.separator.key-value.html"}},"end":"(?<=['\\"])|(?=[\\\\s<>\`])","name":"meta.directive.vue","patterns":[{"begin":"\`","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.html"}},"end":"\`","endCaptures":{"0":{"name":"punctuation.definition.string.end.html"}},"name":"source.directive.vue","patterns":[{"include":"source.js#expression"}]},{"begin":"\\"","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.html"}},"end":"\\"","endCaptures":{"0":{"name":"punctuation.definition.string.end.html"}},"name":"source.directive.vue","patterns":[{"include":"source.js#expression"}]},{"begin":"'","beginCaptures":{"0":{"name":"punctuation.definition.string.begin.html"}},"end":"'","endCaptures":{"0":{"name":"punctuation.definition.string.end.html"}},"name":"source.directive.vue","patterns":[{"include":"source.js#expression"}]}]}},"scopeName":"text.html.vue-html","embeddedLangs":["vue","javascript"],"embeddedLangsLazy":[]}`)),d=[...t,...e,n];export{d as default};
