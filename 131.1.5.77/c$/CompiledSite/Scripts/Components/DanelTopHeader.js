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
            _super.call(this, "DanelTopHeaderCtrl", $scope);
            var me = this;
            var emptyRequest = {
                // Init UiRequestBase
                name: "getsiteTitle",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
            };
            var req = { webParameter: Danel.WebParameter.CompanyDisplayName };
            me.httpService.POST('/api/Parameters/GetParameter', req).then(function (res) {
                //me.siteTitle = res.ParameterItems[0].Value;
                me.applyChanges(function () { me.$scope.siteTitle = res.ParameterItems[0].Value; });
            }).fail(function (err) {
                me.$log.log("Error in getsiteTitle in DanelTopHeaderCtrl - Error Message:" + err.InternalMessage);
            });
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