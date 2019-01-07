"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode = require("vscode");
const util_1 = require("./util");
const goStatus_1 = require("./goStatus");
/**
 * Runs linter in the current package or workspace.
 */
function lintCode(lintWorkspace) {
    let editor = vscode.window.activeTextEditor;
    if (!editor && !lintWorkspace) {
        vscode.window.showInformationMessage('No editor is active, cannot find current package to lint');
        return;
    }
    if (editor.document.languageId !== 'go' && !lintWorkspace) {
        vscode.window.showInformationMessage('File in the active editor is not a Go file, cannot find current package to lint');
        return;
    }
    let documentUri = editor ? editor.document.uri : null;
    let goConfig = vscode.workspace.getConfiguration('go', documentUri);
    goStatus_1.outputChannel.clear();
    goStatus_1.outputChannel.show();
    goStatus_1.outputChannel.appendLine('Linting in progress...');
    goLint(documentUri, goConfig, lintWorkspace)
        .then(warnings => util_1.handleDiagnosticErrors(editor ? editor.document : null, warnings, vscode.DiagnosticSeverity.Warning))
        .catch(err => {
        vscode.window.showInformationMessage('Error: ' + err);
    });
}
exports.lintCode = lintCode;
/**
 * Runs linter and presents the output in the 'Go' channel and in the diagnostic collections.
 *
 * @param fileUri Document uri.
 * @param goConfig Configuration for the Go extension.
 * @param lintWorkspace If true runs linter in all workspace.
 */
function goLint(fileUri, goConfig, lintWorkspace) {
    let lintTool = goConfig['lintTool'] || 'golint';
    let lintFlags = goConfig['lintFlags'] || [];
    let lintEnv = Object.assign({}, util_1.getToolsEnvVars());
    let args = [];
    let configFlag = '--config=';
    let currentWorkspace = util_1.getWorkspaceFolderPath(fileUri);
    lintFlags.forEach(flag => {
        // --json is not a valid flag for golint and in gometalinter, it is used to print output in json which we dont want
        if (flag === '--json') {
            return;
        }
        if (flag.startsWith(configFlag)) {
            let configFilePath = flag.substr(configFlag.length);
            configFilePath = util_1.resolvePath(configFilePath);
            args.push(`${configFlag}${configFilePath}`);
            return;
        }
        args.push(flag);
    });
    if (lintTool === 'gometalinter') {
        if (args.indexOf('--aggregate') === -1) {
            args.push('--aggregate');
        }
        if (goConfig['toolsGopath']) {
            // gometalinter will expect its linters to be in the GOPATH
            // So add the toolsGopath to GOPATH
            lintEnv['GOPATH'] += path.delimiter + goConfig['toolsGopath'];
        }
    }
    if (lintWorkspace && currentWorkspace) {
        args.push('./...');
    }
    if (running) {
        tokenSource.cancel();
    }
    running = true;
    const lintPromise = util_1.runTool(args, (lintWorkspace && currentWorkspace) ? currentWorkspace : path.dirname(fileUri.fsPath), 'warning', false, lintTool, lintEnv, false, tokenSource.token).then((result) => {
        running = false;
        return result;
    });
    return lintPromise;
}
exports.goLint = goLint;
let tokenSource = new vscode.CancellationTokenSource();
let running = false;
//# sourceMappingURL=goLint.js.map