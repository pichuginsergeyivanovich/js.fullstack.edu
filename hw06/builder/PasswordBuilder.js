"use strict";
var PasswordBuilder = (function () {
    function PasswordBuilder(maxlen) {
        this.maxlen = maxlen;
        this.items = new Array();
        this.items.push(new LettersPasswordRequirement("cap letters", true, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 1));
        this.items.push(new LettersPasswordRequirement("lower case letters", true, "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase(), 1));
        this.items.push(new LettersPasswordRequirement("digits", true, "0123456789", 1));
        this.items.push(new LettersPasswordRequirement("specials", true, "_@#%^&()[]~!_-=+$", 1));
    }
    PasswordBuilder.prototype.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    };
    PasswordBuilder.prototype.build = function () {
        var _password = "";
        var head = "";
        var tie = "";
        this.items.forEach(function (r) {
            var _a = r.apply(_password), h = _a[0], t = _a[1];
            head += h;
            tie += t;
        });
        var rest = "";
        while (head.length + rest.length <= this.maxlen) {
            var next_index = this.getRandomInt(0, tie.length - 1);
            var next = tie[next_index];
            tie = tie.replace(next, "");
            rest += next;
        }
        _password = head + rest;
        return _password;
    };
    return PasswordBuilder;
}());
//# sourceMappingURL=PasswordBuilder.js.map