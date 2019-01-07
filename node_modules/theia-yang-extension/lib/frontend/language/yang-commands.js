"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
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
var browser_1 = require("@theia/editor/lib/browser");
var browser_2 = require("@theia/languages/lib/browser");
/**
 * Show YANG references
 */
exports.SHOW_YANG_REFERENCES = {
    id: 'yang.show.references'
};
/**
 * Apply Workspace Edit
 */
exports.APPLY_WORKSPACE_EDIT = {
    id: 'yang.apply.workspaceEdit'
};
var YangCommandContribution = /** @class */ (function () {
    function YangCommandContribution(workspace) {
        this.workspace = workspace;
    }
    YangCommandContribution.prototype.registerCommands = function (commands) {
        var _this = this;
        commands.registerCommand(exports.SHOW_YANG_REFERENCES, {
            execute: function (uri, position, locations) {
                return commands.executeCommand(browser_1.EditorCommands.SHOW_REFERENCES.id, uri, position, locations);
            }
        });
        commands.registerCommand(exports.APPLY_WORKSPACE_EDIT, {
            execute: function (changes) {
                return !!_this.workspace.applyEdit && _this.workspace.applyEdit(changes);
            }
        });
    };
    YangCommandContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_2.Workspace)),
        __metadata("design:paramtypes", [Object])
    ], YangCommandContribution);
    return YangCommandContribution;
}());
exports.YangCommandContribution = YangCommandContribution;
//# sourceMappingURL=yang-commands.js.map