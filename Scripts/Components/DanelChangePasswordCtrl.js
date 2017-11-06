var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Danel;
(function (Danel) {
    var DanelChangePasswordCtrl = (function (_super) {
        __extends(DanelChangePasswordCtrl, _super);
        function DanelChangePasswordCtrl($scope, parametersService, authService) {
            var me = this;
            _super.call(this, "DanelChangePasswordCtrl", $scope);
            me.$scope.$watch(function () {
                return me.password_1;
            }, function (newValue, oldValue) {
                me.password_2 = '';
            });
            me.$scope.$watch(function () {
                return me.password_2;
            }, function (newValue, oldValue) {
                if (me.password_2 != me.password_1) {
                    var obj = jQuery('.profile-form').find('input[name=pass2]');
                    $(obj).addClass("ng-dirty");
                    $(obj).addClass("ng-invalid");
                } else {
                    var obj = jQuery('.profile-form').find('input[name=pass2]');
                    $(obj).addClass("ng-valid");
                }
            });
        }
        DanelChangePasswordCtrl.prototype.onDispose = function () {
            var me = this;
            _super.prototype.onDispose.call(this);
        };
        return DanelChangePasswordCtrl;
    })(Danel.BaseCtrl);

    angular.module("Danel").controller("DanelChangePasswordCtrl", [
        "$scope",
        DanelChangePasswordCtrl
    ]);

    angular.module("Danel").directive("danelChangePassword", [
        "$log", function ($log) {
            return {
                restrict: "E",
                scope: {},
                templateUrl: Danel.HttpService.fixUrl("/views/Directive/DanelChangePassword"),
                replace: true,
                controller: "DanelChangePasswordCtrl as ctrl"
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=DanelChangePasswordCtrl.js.map
