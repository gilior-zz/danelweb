/// <reference path="../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var DanelBillboardCtrl = (function (_super) {
        __extends(DanelBillboardCtrl, _super);
        function DanelBillboardCtrl($scope) {
            var _this = _super.call(this, "DanelBillboardCtrl", $scope) || this;
            var me = _this;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.reloadData();
            return _this;
        }
        DanelBillboardCtrl.prototype.setUserName = function () {
            var me = this;
            me.applyChanges(function () {
                me.userName = me.authService.getCurrentUserName();
            });
        };
        DanelBillboardCtrl.prototype.setAccountName = function () {
            var me = this;
            me.applyChanges(function () {
                me.accountName = me.accountStore.getCurrentAccountName();
            });
        };
        DanelBillboardCtrl.prototype.onDispose = function () {
            var me = this;
            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            _super.prototype.onDispose.call(this);
        };
        DanelBillboardCtrl.prototype.onAccountChanged = function (accountNumber) {
            var me = this;
            me.reloadData();
        };
        DanelBillboardCtrl.prototype.reloadData = function () {
            var me = this;
            var emptyRequest = {
                // Init UiRequestBase
                name: "Billboard",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
            };
            me.handleRequest("/api/Parameters/Billboard", emptyRequest, false).then(function (html) {
                me.applyChanges(function () {
                    me.html = me.interpolate(html)(me.$scope);
                });
            }).fail(function (err) { me.$log.log("Error in DanelBillboardCtrl in Account - Error Message:" + err.InternalMessage); });
            me.setUserName();
            me.setAccountName();
        };
        return DanelBillboardCtrl;
    }(Danel.DanelCtrl));
    angular.module('Danel')
        .controller("DanelBillboardCtrl", [
        "$scope",
        DanelBillboardCtrl
    ])
        .directive("danelBillboard", function () {
        return {
            restrict: "E",
            scope: {},
            replace: true,
            templateUrl: Danel.HttpService.fixUrl("/views/Directive/Billboard"),
            controller: "DanelBillboardCtrl as ctrl",
        };
    });
})(Danel || (Danel = {}));
//# sourceMappingURL=BillboardComponent.js.map