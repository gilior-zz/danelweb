/// <reference path="../Services/app.ts" />
var Danel;
(function (Danel) {
    var AdminStore = (function () {
        function AdminStore(httpService) {
            var me = this;
            me.httpService = httpService;
        }
        return AdminStore;
    }());
    Danel.AdminStore = AdminStore;
    angular.module("Danel").service("AdminStore", [
        "HttpService",
        AdminStore
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=AdminStore.js.map