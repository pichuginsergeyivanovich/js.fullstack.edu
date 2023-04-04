"use strict";
var Language = (function () {
    function Language(lang) {
        this.lang = lang;
    }
    Language.prototype.CommunicateTo = function (human) {
        var result = human.Languge.lang == this.lang;
        if (result)
            console.log("two people talks and undertand each other.");
        else
            console.log("two people talks and don't undertang each other.");
        return result;
    };
    return Language;
}());
//# sourceMappingURL=Language.js.map