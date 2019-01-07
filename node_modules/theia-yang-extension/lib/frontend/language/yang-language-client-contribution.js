"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
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
var browser_1 = require("@theia/core/lib/browser");
var browser_2 = require("@theia/languages/lib/browser");
var lib_1 = require("theia-sprotty/lib");
var common_1 = require("@theia/core/lib/common");
var semantic_highlighting_service_1 = require("@theia/editor/lib/browser/semantic-highlight/semantic-highlighting-service");
var dynamic_commands_1 = require("./dynamic-commands");
var YangLanguageClientContribution = /** @class */ (function (_super) {
    __extends(YangLanguageClientContribution, _super);
    function YangLanguageClientContribution(workspace, languages, languageClientFactory, yangDiagramManagerProvider, keybindingRegistry, commandRegistry, commands, semanticHighlightingService) {
        var _this = _super.call(this, workspace, languages, languageClientFactory) || this;
        _this.yangDiagramManagerProvider = yangDiagramManagerProvider;
        _this.keybindingRegistry = keybindingRegistry;
        _this.commandRegistry = commandRegistry;
        _this.commands = commands;
        _this.semanticHighlightingService = semanticHighlightingService;
        _this.id = 'yang';
        _this.name = 'Yang';
        return _this;
    }
    Object.defineProperty(YangLanguageClientContribution.prototype, "globPatterns", {
        get: function () {
            return [
                '**/*.yang'
            ];
        },
        enumerable: true,
        configurable: true
    });
    YangLanguageClientContribution.prototype.waitForActivation = function (app) {
        return Promise.race([
            _super.prototype.waitForActivation.call(this, app),
            this.waitForOpenDiagrams(this.yangDiagramManagerProvider())
        ]);
    };
    YangLanguageClientContribution.prototype.createLanguageClient = function (connection) {
        var client = Object.assign(_super.prototype.createLanguageClient.call(this, connection), { languageId: this.id });
        client.registerFeature(semantic_highlighting_service_1.SemanticHighlightingService.createNewFeature(this.semanticHighlightingService, client));
        return client;
    };
    YangLanguageClientContribution.prototype.waitForOpenDiagrams = function (diagramManagerProvider) {
        return diagramManagerProvider.then(function (diagramManager) {
            return new Promise(function (resolve) {
                var disposable = diagramManager.onDiagramOpened(function (uri) {
                    disposable.dispose();
                    resolve(uri);
                });
            });
        });
    };
    YangLanguageClientContribution.prototype.registerCommand = function (id, callback, thisArg) {
        return this.commands.registerCommand(id, callback, thisArg);
    };
    YangLanguageClientContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_2.Workspace)),
        __param(1, inversify_1.inject(browser_2.Languages)),
        __param(2, inversify_1.inject(browser_2.LanguageClientFactory)),
        __param(3, inversify_1.inject(lib_1.DiagramManagerProvider)), __param(3, inversify_1.named('yang-diagram')),
        __param(4, inversify_1.inject(browser_1.KeybindingRegistry)),
        __param(5, inversify_1.inject(common_1.CommandRegistry)),
        __param(6, inversify_1.inject(dynamic_commands_1.ContextMenuCommands)),
        __param(7, inversify_1.inject(semantic_highlighting_service_1.SemanticHighlightingService)),
        __metadata("design:paramtypes", [Object, Object, browser_2.LanguageClientFactory, Function, browser_1.KeybindingRegistry,
            common_1.CommandRegistry,
            dynamic_commands_1.ContextMenuCommands,
            semantic_highlighting_service_1.SemanticHighlightingService])
    ], YangLanguageClientContribution);
    return YangLanguageClientContribution;
}(browser_2.BaseLanguageClientContribution));
exports.YangLanguageClientContribution = YangLanguageClientContribution;
//# sourceMappingURL=yang-language-client-contribution.js.map