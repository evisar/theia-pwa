"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode = require("vscode");
const util_1 = require("./util");
const goStatus_1 = require("./goStatus");
/**
 * Runs go vet in the current package or workspace.
 */
function vetCode(vetWorkspace) {
    let editor = vscode.window.activeTextEditor;
    if (!editor && !vetWorkspace) {
        vscode.window.showInformationMessage('No editor is active, cannot find current package to vet');
        return;
    }
    if (editor.document.languageId !== 'go' && !vetWorkspace) {
        vscode.window.showInformationMessage('File in the active editor is not a Go file, cannot find current package to vet');
        return;
    }
    let documentUri = editor ? editor.document.uri : null;
    let goConfig = vscode.workspace.getConfiguration('go', documentUri);
    goStatus_1.outputChannel.clear();
    goStatus_1.outputChannel.show();
    goStatus_1.outputChannel.appendLine('Vetting in progress...');
    goVet(documentUri, goConfig, vetWorkspace)
        .then(warnings => util_1.handleDiagnosticErrors(editor ? editor.document : null, warnings, vscode.DiagnosticSeverity.Warning))
        .catch(err => {
        vscode.window.showInformationMessage('Error: ' + err);
    });
}
exports.vetCode = vetCode;
/**
 * Runs go vet or go tool vet and presents the output in the 'Go' channel and in the diagnostic collections.
 *
 * @param fileUri Document uri.
 * @param goConfig Configuration for the Go extension.
 * @param vetWorkspace If true vets code in all workspace.
 */
function goVet(fileUri, goConfig, vetWorkspace) {
    let vetFlags = goConfig['vetFlags'] || [];
    let vetEnv = Object.assign({}, util_1.getToolsEnvVars());
    let vetArgs = vetFlags.length ? ['tool', 'vet', ...vetFlags, '.'] : ['vet', './...'];
    let currentWorkspace = util_1.getWorkspaceFolderPath(fileUri);
    if (running) {
        tokenSource.cancel();
    }
    running = true;
    const vetPromise = util_1.runTool(vetArgs, (vetWorkspace && currentWorkspace) ? currentWorkspace : path.dirname(fileUri.fsPath), 'warning', true, null, vetEnv, false, tokenSource.token).then((result) => {
        running = false;
        return result;
    });
    return vetPromise;
}
exports.goVet = goVet;
let tokenSource = new vscode.CancellationTokenSource();
let running = false;
//# sourceMappingURL=goVet.js.map