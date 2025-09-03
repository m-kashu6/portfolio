"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csstree_validator_1 = require("csstree-validator");
function wrapper({ code }) {
    let diagnostics = [];
    for (const { line, column, loc, message } of csstree_validator_1.validate(code)) {
        let severity = 2 /* Warning */;
        let range;
        if (loc && loc.start && loc.end) {
            range = {
                start: { line: line - 1, character: column - 1 },
                end: { line: loc.end.line - 1, character: loc.end.column - 1 }
            };
        }
        else {
            severity = 1 /* Error */;
            range = {
                start: { line: line - 1, character: column - 1 },
                end: { line: line - 1, character: column }
            };
        }
        diagnostics.push({
            range,
            severity,
            message: `${message}`,
            source: 'csstree'
        });
    }
    return Promise.resolve(diagnostics);
}
exports.wrapper = wrapper;
;
//# sourceMappingURL=wrapper.js.map