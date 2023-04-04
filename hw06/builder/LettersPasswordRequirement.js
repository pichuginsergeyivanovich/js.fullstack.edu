"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LettersPasswordRequirement = (function (_super) {
    __extends(LettersPasswordRequirement, _super);
    function LettersPasswordRequirement(name, use, letters, min) {
        if (min === void 0) { min = 1; }
        var _this = _super.call(this, name, use) || this;
        _this.letters = letters;
        _this.min = min;
        return _this;
    }
    LettersPasswordRequirement.prototype.apply = function (value) {
        var _this = this;
        var index_head = this.getRandomInt(0, this.letters.length - 1);
        this.head = this.letters.substring(index_head, index_head + 1);
        this.head.split('').forEach(function (s) { _this.tie = _this.letters.replace(s, ""); });
        return [this.head, this.tie];
    };
    LettersPasswordRequirement.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };
    return LettersPasswordRequirement;
}(PasswordRequirement));
//# sourceMappingURL=LettersPasswordRequirement.js.map