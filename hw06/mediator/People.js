"use strict";
var People = (function () {
    function People() {
        this._humans = new Array();
    }
    People.prototype.union = function () {
        throw new Error("Method not implemented.");
    };
    People.prototype.add = function (human) {
        this._humans.push(human);
        console.log('new human borns. he speaks ' + human.Languge.lang);
    };
    People.prototype.communicate = function () {
        var _this = this;
        this._humans.forEach(function (human) {
            _this._humans.forEach(function (other) {
                human.Languge.CommunicateTo(other);
            });
        });
    };
    return People;
}());
//# sourceMappingURL=People.js.map