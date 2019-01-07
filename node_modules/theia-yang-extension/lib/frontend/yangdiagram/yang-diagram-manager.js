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
var browser_1 = require("@theia/languages/lib/browser");
var browser_2 = require("@theia/editor/lib/browser");
var yang_language_client_contribution_1 = require("../language/yang-language-client-contribution");
var lib_1 = require("theia-sprotty/lib");
var theme_manager_1 = require("./theme-manager");
var YangDiagramManager = /** @class */ (function (_super) {
    __extends(YangDiagramManager, _super);
    function YangDiagramManager(languageClientContribution, theiaFileSaver, editorManager, diagramWidgetRegistry, themeManager) {
        var _this = _super.call(this) || this;
        _this.diagramType = 'yang-diagram';
        _this.iconClass = 'fa fa-microchip';
        themeManager.initialize();
        _this._diagramConnector = new lib_1.TheiaSprottyConnector(languageClientContribution, theiaFileSaver, editorManager, diagramWidgetRegistry);
        return _this;
    }
    Object.defineProperty(YangDiagramManager.prototype, "diagramConnector", {
        get: function () {
            return this._diagramConnector;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YangDiagramManager.prototype, "label", {
        get: function () {
            return 'Yang diagram';
        },
        enumerable: true,
        configurable: true
    });
    YangDiagramManager = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(yang_language_client_contribution_1.YangLanguageClientContribution)),
        __param(1, inversify_1.inject(lib_1.TheiaFileSaver)),
        __param(2, inversify_1.inject(browser_2.EditorManager)),
        __param(3, inversify_1.inject(lib_1.DiagramWidgetRegistry)),
        __param(4, inversify_1.inject(theme_manager_1.ThemeManager)),
        __metadata("design:paramtypes", [Object, lib_1.TheiaFileSaver,
            browser_2.EditorManager,
            lib_1.DiagramWidgetRegistry,
            theme_manager_1.ThemeManager])
    ], YangDiagramManager);
    return YangDiagramManager;
}(lib_1.DiagramManagerImpl));
exports.YangDiagramManager = YangDiagramManager;
//# sourceMappingURL=yang-diagram-manager.js.map