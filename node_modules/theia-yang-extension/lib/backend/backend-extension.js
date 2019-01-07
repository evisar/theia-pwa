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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var inversify_1 = require("inversify");
var node_1 = require("@theia/languages/lib/node");
var os_1 = require("@theia/core/lib/common/os");
var server_1 = require("vscode-ws-jsonrpc/lib/server");
var net = require("net");
var EXECUTABLE_NAME = os_1.isWindows ? 'yang-language-server.bat' : 'yang-language-server';
var EXECUTABLE_PATH = path_1.resolve(path_1.join(__dirname, '..', '..', 'build', 'yang-language-server', 'bin', EXECUTABLE_NAME));
function getPort() {
    var arg = process.argv.filter(function (arg) { return arg.startsWith('--YANG_LSP='); })[0];
    if (!arg) {
        return undefined;
    }
    else {
        return Number.parseInt(arg.substring('--YANG_LSP='.length), 10);
    }
}
var YangLanguageServerContribution = /** @class */ (function (_super) {
    __extends(YangLanguageServerContribution, _super);
    function YangLanguageServerContribution() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 'yang';
        _this.name = 'Yang';
        _this.description = {
            id: 'yang',
            name: 'Yang',
            documentSelector: ['yang'],
            fileEvents: [
                '**/*.yang'
            ]
        };
        return _this;
    }
    YangLanguageServerContribution.prototype.start = function (clientConnection) {
        var socketPort = getPort();
        if (socketPort) {
            var socket_1 = new net.Socket();
            var serverConnection = server_1.createSocketConnection(socket_1, socket_1, function () {
                socket_1.destroy();
            });
            this.forward(clientConnection, serverConnection);
            socket_1.connect(socketPort);
        }
        else {
            var args = [];
            var serverConnection = this.createProcessStreamConnection(EXECUTABLE_PATH, args);
            this.forward(clientConnection, serverConnection);
        }
    };
    YangLanguageServerContribution = __decorate([
        inversify_1.injectable()
    ], YangLanguageServerContribution);
    return YangLanguageServerContribution;
}(node_1.BaseLanguageServerContribution));
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(node_1.LanguageServerContribution).to(YangLanguageServerContribution).inSingletonScope();
});
//# sourceMappingURL=backend-extension.js.map