"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var theming_1 = require("@theia/core/lib/browser/theming");
var inversify_1 = require("inversify");
var darkTheme = require('yang-sprotty/css/dark/dark.useable.css');
var lightTheme = require('yang-sprotty/css/light/light.useable.css');
var ThemeManager = /** @class */ (function () {
    function ThemeManager() {
    }
    ThemeManager.prototype.initialize = function () {
        var _this = this;
        var themeService = theming_1.ThemeService.get();
        if (themeService instanceof theming_1.ThemeService) {
            this.switchTheme(undefined, themeService.getCurrentTheme());
            this.disposable = themeService.onThemeChange(function (event) { return _this.switchTheme(event.oldTheme, event.newTheme); });
        }
    };
    ThemeManager.prototype.switchTheme = function (oldTheme, newTheme) {
        if (oldTheme) {
            if (oldTheme.id === 'dark')
                darkTheme.unuse();
            else
                lightTheme.unuse();
        }
        if (newTheme.id === 'dark')
            darkTheme.use();
        else
            lightTheme.use();
    };
    ThemeManager.prototype.dispose = function () {
        this.disposable.dispose();
    };
    ThemeManager = __decorate([
        inversify_1.injectable()
    ], ThemeManager);
    return ThemeManager;
}());
exports.ThemeManager = ThemeManager;
//# sourceMappingURL=theme-manager.js.map