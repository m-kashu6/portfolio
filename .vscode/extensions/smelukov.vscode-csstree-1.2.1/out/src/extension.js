"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_languageclient_1 = require("vscode-languageclient");
function activate(context) {
    let serverModule = path.join(__dirname, 'server.js');
    let client = new vscode_languageclient_1.LanguageClient('csstree', {
        run: {
            module: serverModule,
            transport: vscode_languageclient_1.TransportKind.ipc
        },
        debug: {
            module: serverModule,
            transport: vscode_languageclient_1.TransportKind.ipc,
            options: {
                execArgv: ['--nolazy', '--debug=6004']
            }
        }
    }, {
        documentSelector: ['css'],
        synchronize: {
            configurationSection: 'csstree'
        }
    });
    context.subscriptions.push(new vscode_languageclient_1.SettingMonitor(client, 'csstree.enable').start());
}
exports.activate = activate;
;
//# sourceMappingURL=extension.js.map