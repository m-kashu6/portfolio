"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wrapper_js_1 = require("./wrapper.js");
const vscode_languageserver_1 = require("vscode-languageserver");
let config;
let connection = vscode_languageserver_1.createConnection(new vscode_languageserver_1.IPCMessageReader(process), new vscode_languageserver_1.IPCMessageWriter(process));
let documents = new vscode_languageserver_1.TextDocuments();
function validate(document) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const diagnostics = yield wrapper_js_1.wrapper({
                code: document.getText(),
            });
            connection.sendDiagnostics({ uri: document.uri, diagnostics });
        }
        catch (err) {
            connection.window.showErrorMessage(err.stack.replace(/\n/g, ' '));
        }
    });
}
function validateAll() {
    return Promise.all(documents.all().map(doc => validate(doc)));
}
connection.onInitialize(params => {
    validateAll();
    return {
        capabilities: {
            textDocumentSync: documents.syncKind
        }
    };
});
connection.onDidChangeConfiguration(params => {
    let settings = params.settings;
    config = settings.csstree.config;
    validateAll();
});
documents.onDidChangeContent(event => validate(event.document));
documents.onDidClose(e => connection.sendDiagnostics({ uri: e.document.uri, diagnostics: [] }));
documents.listen(connection);
connection.onDidChangeWatchedFiles(validateAll);
connection.listen();
//# sourceMappingURL=server.js.map