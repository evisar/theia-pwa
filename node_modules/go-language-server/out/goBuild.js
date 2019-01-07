"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode = require("vscode");
const util_1 = require("./util");
const goStatus_1 = require("./goStatus");
const os = require("os");
const goPackages_1 = require("./goPackages");
const testUtils_1 = require("./testUtils");
const goPath_1 = require("./goPath");
/**
 * Builds current package or workspace.
 */
function buildCode(buildWorkspace) {
    let editor = vscode.window.activeTextEditor;
    if (!editor && !buildWorkspace) {
        vscode.window.showInformationMessage('No editor is active, cannot find current package to build');
        return;
    }
    if (editor.document.languageId !== 'go' && !buildWorkspace) {
        vscode.window.showInformationMessage('File in the active editor is not a Go file, cannot find current package to build');
        return;
    }
    let documentUri = editor ? editor.document.uri : null;
    let goConfig = vscode.workspace.getConfiguration('go', documentUri);
    goStatus_1.outputChannel.clear();
    goStatus_1.outputChannel.show();
    goStatus_1.outputChannel.appendLine('Building in progress...');
    goBuild(documentUri, goConfig, buildWorkspace)
        .then(errors => util_1.handleDiagnosticErrors(editor ? editor.document : null, errors, vscode.DiagnosticSeverity.Error))
        .catch(err => {
        vscode.window.showInformationMessage('Error: ' + err);
    });
}
exports.buildCode = buildCode;
/**
 * Runs go build -i or go test -i and presents the output in the 'Go' channel and in the diagnostic collections.
 *
 * @param fileUri Document uri.
 * @param goConfig Configuration for the Go extension.
 * @param buildWorkspace If true builds code in all workspace.
 */
function goBuild(fileUri, goConfig, buildWorkspace) {
    const buildEnv = Object.assign({}, util_1.getToolsEnvVars());
    const currentWorkspace = util_1.getWorkspaceFolderPath(fileUri);
    const cwd = path.dirname(fileUri.fsPath);
    const tmpPath = path.normalize(path.join(os.tmpdir(), 'go-code-check'));
    const isTestFile = fileUri.fsPath.endsWith('_test.go');
    let buildFlags = isTestFile ? testUtils_1.getTestFlags(goConfig, null) : (Array.isArray(goConfig['buildFlags']) ? [...goConfig['buildFlags']] : []);
    // Remove the -i flag as it will be added later anyway
    if (buildFlags.indexOf('-i') > -1) {
        buildFlags.splice(buildFlags.indexOf('-i'), 1);
    }
    // If current file is a test file, then use `go test -c` instead of `go build` to find build errors
    let buildArgs = isTestFile ? ['test', '-c'] : ['build'];
    buildArgs.push('-i', '-o', tmpPath, ...buildFlags);
    if (goConfig['buildTags'] && buildFlags.indexOf('-tags') === -1) {
        buildArgs.push('-tags');
        buildArgs.push(goConfig['buildTags']);
    }
    if (buildWorkspace && currentWorkspace && !isTestFile) {
        return goPackages_1.getNonVendorPackages(currentWorkspace).then(pkgs => {
            let buildPromises = [];
            buildPromises = pkgs.map(pkgPath => {
                return util_1.runTool(buildArgs.concat(pkgPath), currentWorkspace, 'error', true, null, buildEnv, true);
            });
            return Promise.all(buildPromises).then((resultSets) => {
                let results = [].concat.apply([], resultSets);
                // Filter duplicates
                return results.filter((results, index, self) => self.findIndex((t) => {
                    return t.file === results.file && t.line === results.line && t.msg === results.msg && t.severity === results.severity;
                }) === index);
            });
        });
    }
    // Find the right importPath instead of directly using `.`. Fixes https://github.com/Microsoft/vscode-go/issues/846
    let currentGoWorkspace = goPath_1.getCurrentGoWorkspaceFromGOPATH(util_1.getCurrentGoPath(), cwd);
    let importPath = currentGoWorkspace ? cwd.substr(currentGoWorkspace.length + 1) : '.';
    return util_1.runTool(buildArgs.concat(importPath), cwd, 'error', true, null, buildEnv, true);
}
exports.goBuild = goBuild;
//# sourceMappingURL=goBuild.js.map