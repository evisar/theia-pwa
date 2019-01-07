"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/languages/lib/browser");
var yang_language_client_contribution_1 = require("./yang-language-client-contribution");
var lib_1 = require("theia-sprotty/lib");
var di_config_1 = require("../yangdiagram/di.config");
var lib_2 = require("theia-sprotty/lib");
var yang_diagram_manager_1 = require("../yangdiagram/yang-diagram-manager");
var browser_2 = require("@theia/core/lib/browser");
var yang_monaco_language_1 = require("./yang-monaco-language");
var yang_commands_1 = require("./yang-commands");
var monaco_editor_provider_1 = require("@theia/monaco/lib/browser/monaco-editor-provider");
var yang_monaco_editor_provider_1 = require("../monaco/yang-monaco-editor-provider");
require("sprotty/css/sprotty.css");
require("theia-sprotty/css/theia-sprotty.css");
var dynamic_commands_1 = require("./dynamic-commands");
var theme_manager_1 = require("../yangdiagram/theme-manager");
var textmate_contribution_1 = require("@theia/monaco/lib/browser/textmate/textmate-contribution");
var yang_textmate_contribution_1 = require("./yang-textmate-contribution");
exports.default = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
    monaco.languages.register({
        id: 'yang',
        aliases: ['Yang', 'yang'],
        extensions: ['.yang'],
        mimetypes: ['text/yang']
    });
    monaco.languages.onLanguage('yang', function () {
        monaco.languages.setLanguageConfiguration('yang', yang_monaco_language_1.configuration);
    });
    bind(common_1.CommandContribution).to(yang_commands_1.YangCommandContribution).inSingletonScope();
    bind(yang_language_client_contribution_1.YangLanguageClientContribution).toSelf().inSingletonScope();
    bind(browser_1.LanguageClientContribution).toDynamicValue(function (ctx) { return ctx.container.get(yang_language_client_contribution_1.YangLanguageClientContribution); });
    bind(lib_1.DiagramConfiguration).to(di_config_1.YangDiagramConfiguration).inSingletonScope();
    bind(lib_2.DiagramManagerProvider).toProvider(function (context) {
        return function () {
            return new Promise(function (resolve) {
                return resolve(context.container.get(yang_diagram_manager_1.YangDiagramManager));
            });
        };
    }).whenTargetNamed('yang-diagram');
    bind(yang_diagram_manager_1.YangDiagramManager).toSelf().inSingletonScope();
    bind(browser_2.FrontendApplicationContribution).toDynamicValue(function (context) { return context.container.get(yang_diagram_manager_1.YangDiagramManager); });
    bind(browser_2.OpenHandler).toDynamicValue(function (context) { return context.container.get(yang_diagram_manager_1.YangDiagramManager); });
    bind(dynamic_commands_1.ContextMenuCommands).to(dynamic_commands_1.ContextMenuCommands).inSingletonScope();
    rebind(monaco_editor_provider_1.MonacoEditorProvider).to(yang_monaco_editor_provider_1.YangMonacoEditorProvider).inSingletonScope();
    bind(theme_manager_1.ThemeManager).toSelf().inSingletonScope();
    bind(textmate_contribution_1.LanguageGrammarDefinitionContribution).to(yang_textmate_contribution_1.YangTextmateContribution).inSingletonScope();
});
//# sourceMappingURL=frontend-extension.js.map