"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var monaco_editor_provider_1 = require("@theia/monaco/lib/browser/monaco-editor-provider");
var monaco_editor_service_1 = require("@theia/monaco/lib/browser/monaco-editor-service");
var monaco_languageclient_1 = require("monaco-languageclient");
var browser_1 = require("@theia/editor/lib/browser");
var monaco_text_model_service_1 = require("@theia/monaco/lib/browser/monaco-text-model-service");
var monaco_context_menu_1 = require("@theia/monaco/lib/browser/monaco-context-menu");
var monaco_workspace_1 = require("@theia/monaco/lib/browser/monaco-workspace");
var monaco_command_service_1 = require("@theia/monaco/lib/browser/monaco-command-service");
var monaco_quick_open_service_1 = require("@theia/monaco/lib/browser/monaco-quick-open-service");
var monaco_diff_navigator_factory_1 = require("@theia/monaco/lib/browser/monaco-diff-navigator-factory");
var YangMonacoEditorProvider = /** @class */ (function (_super) {
    __extends(YangMonacoEditorProvider, _super);
    function YangMonacoEditorProvider(editorService, monacoModelResolver, contextMenuService, m2p, p2m, workspace, commandServiceFactory, editorPreferences, quickOpenService, diffNavigatorFactory) {
        var _this = _super.call(this, editorService, monacoModelResolver, contextMenuService, m2p, p2m, workspace, commandServiceFactory, editorPreferences, quickOpenService, diffNavigatorFactory) || this;
        _this.editorService = editorService;
        _this.monacoModelResolver = monacoModelResolver;
        _this.contextMenuService = contextMenuService;
        _this.m2p = m2p;
        _this.p2m = p2m;
        _this.workspace = workspace;
        _this.commandServiceFactory = commandServiceFactory;
        _this.editorPreferences = editorPreferences;
        _this.quickOpenService = quickOpenService;
        _this.diffNavigatorFactory = diffNavigatorFactory;
        return _this;
    }
    YangMonacoEditorProvider.prototype.createMonacoEditorOptions = function (model) {
        var editorOptions = _super.prototype.createMonacoEditorOptions.call(this, model);
        return __assign({}, editorOptions, { snippetSuggestions: 'inline' });
    };
    YangMonacoEditorProvider = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(monaco_editor_service_1.MonacoEditorService)),
        __param(1, inversify_1.inject(monaco_text_model_service_1.MonacoTextModelService)),
        __param(2, inversify_1.inject(monaco_context_menu_1.MonacoContextMenuService)),
        __param(3, inversify_1.inject(monaco_languageclient_1.MonacoToProtocolConverter)),
        __param(4, inversify_1.inject(monaco_languageclient_1.ProtocolToMonacoConverter)),
        __param(5, inversify_1.inject(monaco_workspace_1.MonacoWorkspace)),
        __param(6, inversify_1.inject(monaco_command_service_1.MonacoCommandServiceFactory)),
        __param(7, inversify_1.inject(browser_1.EditorPreferences)),
        __param(8, inversify_1.inject(monaco_quick_open_service_1.MonacoQuickOpenService)),
        __param(9, inversify_1.inject(monaco_diff_navigator_factory_1.MonacoDiffNavigatorFactory)),
        __metadata("design:paramtypes", [monaco_editor_service_1.MonacoEditorService,
            monaco_text_model_service_1.MonacoTextModelService,
            monaco_context_menu_1.MonacoContextMenuService,
            monaco_languageclient_1.MonacoToProtocolConverter,
            monaco_languageclient_1.ProtocolToMonacoConverter,
            monaco_workspace_1.MonacoWorkspace, Function, Object, monaco_quick_open_service_1.MonacoQuickOpenService,
            monaco_diff_navigator_factory_1.MonacoDiffNavigatorFactory])
    ], YangMonacoEditorProvider);
    return YangMonacoEditorProvider;
}(monaco_editor_provider_1.MonacoEditorProvider));
exports.YangMonacoEditorProvider = YangMonacoEditorProvider;
//# sourceMappingURL=yang-monaco-editor-provider.js.map