"use strict";
/*
 * Copyright (C) 2018 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License") you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
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
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/editor/lib/browser");
var ContextMenuCommands = /** @class */ (function () {
    function ContextMenuCommands(menuRegistry, registry, editorManager) {
        this.menuRegistry = menuRegistry;
        this.registry = registry;
        this.editorManager = editorManager;
    }
    ContextMenuCommands.prototype.registerCommand = function (id, callback, thisArg) {
        var _this = this;
        var execute = callback.bind(thisArg);
        var removeCommand = this.registry.registerCommand({ id: id }, {
            execute: function () {
                var currentEditor = _this.editorManager.currentEditor;
                if (_this.isYangEditor(currentEditor)) {
                    execute(currentEditor.editor.document.uri);
                }
            },
            isVisible: function () { return _this.isYangEditor(_this.editorManager.currentEditor); }
        });
        var removeMenu = this.menuRegistry.registerMenuAction(browser_1.EDITOR_CONTEXT_MENU.concat("2_yang"), {
            commandId: id,
            label: id
        });
        return {
            dispose: function () {
                removeCommand.dispose();
                removeMenu.dispose();
            }
        };
    };
    ContextMenuCommands.prototype.isYangEditor = function (widget) {
        if (widget)
            return widget.editor.document.languageId === 'yang';
        else
            return false;
    };
    ContextMenuCommands = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.MenuModelRegistry)),
        __param(1, inversify_1.inject(common_1.CommandRegistry)),
        __param(2, inversify_1.inject(browser_1.EditorManager)),
        __metadata("design:paramtypes", [common_1.MenuModelRegistry,
            common_1.CommandRegistry,
            browser_1.EditorManager])
    ], ContextMenuCommands);
    return ContextMenuCommands;
}());
exports.ContextMenuCommands = ContextMenuCommands;
//# sourceMappingURL=dynamic-commands.js.map