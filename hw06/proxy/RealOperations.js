"use strict";
var RealOperations = (function () {
    function RealOperations() {
    }
    RealOperations.prototype.SomeLongRunningWebRequest = function () {
        console.log("call to real operations method started");
        var delay = 0;
        while (delay < 10000000) {
            delay++;
            if (delay % 1000 == 0) {
                console.log("working");
            }
        }
        console.log("call to real operations method completed");
        return "1980";
    };
    return RealOperations;
}());
//# sourceMappingURL=RealOperations.js.map