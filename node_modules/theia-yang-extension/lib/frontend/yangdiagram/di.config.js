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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var lib_1 = require("sprotty/lib");
var lib_2 = require("theia-sprotty/lib");
var lib_3 = require("theia-sprotty/lib");
var lib_4 = require("yang-sprotty/lib");
var YangDiagramConfiguration = /** @class */ (function () {
    function YangDiagramConfiguration() {
        this.diagramType = 'yang-diagram';
    }
    YangDiagramConfiguration.prototype.createContainer = function (widgetId) {
        var container = lib_4.createYangDiagramContainer(widgetId);
        container.bind(lib_1.TYPES.ModelSource).to(lib_2.TheiaDiagramServer).inSingletonScope();
        container.rebind(lib_1.KeyTool).to(lib_3.TheiaKeyTool).inSingletonScope();
        return container;
    };
    YangDiagramConfiguration = __decorate([
        inversify_1.injectable()
    ], YangDiagramConfiguration);
    return YangDiagramConfiguration;
}());
exports.YangDiagramConfiguration = YangDiagramConfiguration;
//# sourceMappingURL=di.config.js.map