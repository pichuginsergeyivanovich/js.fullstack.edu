"use strict";
var List = (function () {
    function List() {
        this._bag = new Array();
    }
    List.prototype.add = function (item) {
        this._bag.push(item);
    };
    List.prototype.delete = function (item) {
        this._bag = this._bag.filter(function (e, i) {
            return e != item;
        });
    };
    List.prototype.search = function (item) {
        for (var i = 0; i < this._bag.length; i++) {
            if (this._bag[i] == item)
                return i;
        }
        return -1;
    };
    List.prototype.update = function (i, item) {
        if (this._bag.length > i)
            this._bag[i] = item;
    };
    List.prototype.length = function () {
        return this._bag.length;
    };
    List.prototype.print = function () {
        console.log(this);
    };
    return List;
}());
//# sourceMappingURL=List.js.map