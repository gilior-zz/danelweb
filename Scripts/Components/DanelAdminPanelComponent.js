var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var DanelAdminPanelComponentCtrl = (function (_super) {
        __extends(DanelAdminPanelComponentCtrl, _super);
        //private parametersService: ParametersService;
        //private authService: AuthService;
        //private adminMap;
        //public adminObj: UserDetails;
        //public userObj: UserDetails;
        //public showAdminStrip: Boolean;
        function DanelAdminPanelComponentCtrl($scope) {
            var _this = _super.call(this, "DanelAdminPanelComponentCtrl", $scope) || this;
            var me = _this;
            return _this;
            //me.parametersService = parametersService;
            //me.authService = authService;
            //me.adminMap = me.parametersService.getParametersMap("adminMap", "PersistentMap");
            //if (me.adminMap.inAdminMode) {
            //    me.adminObj = me.authService.adminDetails;
            //    me.userObj = me.adminMap.userDetails;
            //}
        }
        DanelAdminPanelComponentCtrl.prototype.logOutAdmin = function () {
            var me = this;
            me.authService.logout().then(function () { me.redirect("/"); });
        };
        DanelAdminPanelComponentCtrl.prototype.onDispose = function () {
            var me = this;
            _super.prototype.onDispose.call(this);
        };
        return DanelAdminPanelComponentCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("DanelAdminPanelComponentCtrl", [
        "$scope",
        //"ParametersService",
        //"AuthService",
        DanelAdminPanelComponentCtrl
    ]);
    angular.module("Danel").directive("danelAdminPanel", ["$log", function ($log) {
            return {
                restrict: "E",
                scope: {},
                templateUrl: Danel.HttpService.fixUrl("/views/Directive/DanelAdminPanel"),
                replace: true,
                controller: "DanelAdminPanelComponentCtrl as ctrl",
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=DanelAdminPanelComponent.js.map