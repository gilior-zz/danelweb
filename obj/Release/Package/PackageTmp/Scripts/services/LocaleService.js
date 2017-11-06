/// <reference path="../typings/q/q.d.ts" />
/// <reference path="app.ts" />
var Danel;
(function (Danel) {
    var LocaleService = (function () {
        function LocaleService() {
            var me = this;
        }
        LocaleService.prototype.getMonthShortName = function (month) {
            var names = [
                "ינו",
                "פבו",
                "מרץ",
                "אפר",
                "מאי",
                "יונ",
                "יול",
                "אוג",
                "ספט",
                "אוק",
                "נוב",
                "דצמ",
            ];
            if (month < 1 || month > 12) {
                return month + "";
            }
            return names[month - 1];
        };
        return LocaleService;
    }());
    Danel.LocaleService = LocaleService;
    angular.module("Danel").service("LocaleService", LocaleService);
})(Danel || (Danel = {}));
//# sourceMappingURL=LocaleService.js.map