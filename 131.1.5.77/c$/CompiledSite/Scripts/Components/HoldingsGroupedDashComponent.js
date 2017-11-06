var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var DanelHoldingsGroupedDashCtrl = (function (_super) {
        __extends(DanelHoldingsGroupedDashCtrl, _super);
        function DanelHoldingsGroupedDashCtrl($scope) {
            _super.call(this, "DanelHoldingsGroupedDashCtrl", $scope);
            var me = this;
            //me.accountStore = accountStore;
            //me.holdingsStore = holdingsStore;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.setgrid = function (gridtwidget) {
                me.gridtwidget = gridtwidget;
            };
            me.reloadData();
        }
        DanelHoldingsGroupedDashCtrl.prototype.onDispose = function () {
            var me = this;
            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            _super.prototype.onDispose.call(this);
        };
        DanelHoldingsGroupedDashCtrl.prototype.goToPage = function () {
            var me = this;
            me.state.go("home.portfolio");
        };
        DanelHoldingsGroupedDashCtrl.prototype.onAccountChanged = function (accountNumber) {
            var me = this;
            me.reloadData();
        };
        DanelHoldingsGroupedDashCtrl.prototype.reloadData = function () {
            var me = this;
            var holdingsGroupedRequest = {
                // Init UiRequestBase
                name: "Grouped Holdings",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                groupID: 1
            };
            me.handleRequest("/api/Holdings/GroupedHoldings", holdingsGroupedRequest).then(function (Holdings) {
                me.applyChanges(function () {
                    me.holdings = Holdings;
                });
            }).fail(function (err) { me.$log.log("Error in DanelHoldingsGroupedDashCtrl in GroupedHoldings - Error Message:" + err.InternalMessage); });
            //me.holdingsStore.getGroupedPortfolio(me.accountStore.currentAccountNumber, 1)
            //    .then((portfolioDash) => {
            //        me.applyChanges(() => {
            //            me.holdings = portfolioDash;
            //        });
            //    });
        };
        return DanelHoldingsGroupedDashCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("DanelHoldingsGroupedDashCtrl", [
        "$scope",
        DanelHoldingsGroupedDashCtrl
    ]);
    angular.module("Danel").directive("danelHoldingsGroupedDash", ["$log", function ($log) {
            return {
                restrict: "E",
                scope: {},
                templateUrl: Danel.HttpService.fixUrl("/views/Directive/HoldingsGroupedDash"),
                replace: true,
                controller: "DanelHoldingsGroupedDashCtrl as ctrl",
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=HoldingsGroupedDashComponent.js.map