/// <reference path="../Services/app.ts" />
var Danel;
(function (Danel) {
    var TransactionsStore = (function () {
        function TransactionsStore(httpService) {
            var me = this;
            me.httpService = httpService;
        }
        return TransactionsStore;
    }());
    Danel.TransactionsStore = TransactionsStore;
    angular.module("Danel").service("TransactionsStore", [
        "HttpService",
        TransactionsStore
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=TransactionsStore.js.map