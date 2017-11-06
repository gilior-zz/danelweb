/// <reference path="../Services/app.ts" />
var Danel;
(function (Danel) {
    var ContactStore = (function () {
        function ContactStore(httpService) {
            var me = this;
            me.httpService = httpService;
        }
        return ContactStore;
    }());
    Danel.ContactStore = ContactStore;
    angular.module("Danel").service("ContactStore", [
        "HttpService",
        ContactStore
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=ContactStore.js.map