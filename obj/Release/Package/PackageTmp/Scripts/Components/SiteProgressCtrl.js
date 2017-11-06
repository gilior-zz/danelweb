var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var SiteProgressCtrl = (function (_super) {
        __extends(SiteProgressCtrl, _super);
        function SiteProgressCtrl($scope, httpService) {
            var _this = _super.call(this, "SiteProgressCtrl", $scope) || this;
            var me = _this;
            me.httpService = httpService;
            me.httpService.workBegin.addEventHandler(me, me.onHttpWorkBegin);
            me.httpService.workEnd.addEventHandler(me, me.onHttpWorkEnd);
            return _this;
        }
        SiteProgressCtrl.prototype.onDispose = function () {
            var me = this;
            me.httpService.workBegin.removeEventHandler(me, me.onHttpWorkBegin);
            me.httpService.workEnd.removeEventHandler(me, me.onHttpWorkEnd);
            _super.prototype.onDispose.call(this);
        };
        SiteProgressCtrl.prototype.onHttpWorkBegin = function () {
            var me = this;
            me.applyChanges(function () {
                me.running = true;
            });
        };
        SiteProgressCtrl.prototype.onHttpWorkEnd = function () {
            var me = this;
            me.applyChanges(function () {
                me.running = false;
            });
        };
        return SiteProgressCtrl;
    }(Danel.BaseCtrl));
    Danel.SiteProgressCtrl = SiteProgressCtrl;
    angular.module("Danel")
        .controller("SiteProgressCtrl", [
        "$scope",
        "HttpService",
        SiteProgressCtrl
    ])
        .directive("danelSiteProgress", function () {
        return {
            restrict: "E",
            scope: {},
            replace: true,
            templateUrl: Danel.HttpService.fixUrl("/views/Directive/SiteProgress"),
            controller: "SiteProgressCtrl as ctrl",
        };
    });
})(Danel || (Danel = {}));
//# sourceMappingURL=SiteProgressCtrl.js.map