/// <reference path="../Services/app.ts" />
var Danel;
(function (Danel) {
    var DashboardStore = (function () {
        function DashboardStore(httpService) {
            var me = this;
            me.httpService = httpService;
        }
        return DashboardStore;
    }());
    Danel.DashboardStore = DashboardStore;
    angular.module("Danel").service("DashboardStore", [
        "HttpService",
        DashboardStore
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=DashboardStore.js.map