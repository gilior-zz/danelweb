/// <reference path="../Services/app.ts" />
var Danel;
(function (Danel) {
    var ProfileStore = (function () {
        function ProfileStore(httpService) {
            var me = this;
            me.httpService = httpService;
        }
        return ProfileStore;
    }());
    Danel.ProfileStore = ProfileStore;
    angular.module("Danel").service("ProfileStore", [
        "HttpService",
        ProfileStore
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=ProfileStore.js.map