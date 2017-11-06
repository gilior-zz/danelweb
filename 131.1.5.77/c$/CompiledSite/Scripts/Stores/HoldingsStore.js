/// <reference path="../Services/app.ts" />
var Danel;
(function (Danel) {
    var HoldingsStore = (function () {
        function HoldingsStore(httpService) {
            var me = this;
            me.httpService = httpService;
        }
        return HoldingsStore;
    }());
    Danel.HoldingsStore = HoldingsStore;
    angular.module("Danel").service("HoldingsStore", [
        "HttpService",
        HoldingsStore
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=HoldingsStore.js.map