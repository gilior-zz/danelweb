/// <reference path="../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var DanelTopHeaderCtrl = (function (_super) {
        __extends(DanelTopHeaderCtrl, _super);
        function DanelTopHeaderCtrl($scope, authService) {
            var _this = _super.call(this, "DanelTopHeaderCtrl", $scope) || this;
            var me = _this;
            var emptyRequest = {
                // Init UiRequestBase
                name: "getsiteTitle",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
            };
            me.applyChanges(function () { me.$scope.siteTitle = me.parametersService.GetDanelParameter(Danel.WebParameter.CompanyDisplayName); });
            return _this;
        }
        DanelTopHeaderCtrl.prototype.signOut = function () {
            var me = this;
            me.authService.logout()
                .fin(function () {
                window.location.reload();
            });
        };
        return DanelTopHeaderCtrl;
    }(Danel.DanelCtrl));
    angular.module('Danel')
        .controller("DanelTopHeaderCtrl", [
        "$scope",
        "AuthService",
        DanelTopHeaderCtrl
    ])
        .directive("danelTopHeader", function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: Danel.HttpService.fixUrl("/views/Directive/DanelTopHeader"),
            controller: "DanelTopHeaderCtrl as ctrl",
        };
    });
})(Danel || (Danel = {}));
//# sourceMappingURL=DanelTopHeader.js.map