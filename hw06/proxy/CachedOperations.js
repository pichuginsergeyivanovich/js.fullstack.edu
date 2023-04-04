"use strict";
var CachedOperations = (function () {
    function CachedOperations(iops) {
        this._cache = new Map();
        this._iops = iops;
    }
    CachedOperations.prototype.SomeLongRunningWebRequest = function () {
        console.log("call to proxy operations cached method started");
        var key = "SomeLongRunningWebRequest";
        if (!this._cache.has(key)) {
            var result = this._iops.SomeLongRunningWebRequest();
            this._cache.set(key, result);
        }
        console.log("call to proxy operations cached method completed");
        return this._cache.get(key);
    };
    return CachedOperations;
}());
//# sourceMappingURL=CachedOperations.js.map