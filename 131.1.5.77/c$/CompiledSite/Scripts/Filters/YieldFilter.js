var Danel;
(function (Danel) {
    angular.module("Danel").filter("yield", function () {
        return function (input) {
            if (input >= 0) {
                return input + "%+";
            }
            else {
                return Math.abs(input) + "%-";
            }
        };
    });
})(Danel || (Danel = {}));
//# sourceMappingURL=YieldFilter.js.map