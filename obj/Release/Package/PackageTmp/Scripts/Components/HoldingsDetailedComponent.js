var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var HoldingsDetailedComponentCtrl = (function (_super) {
        __extends(HoldingsDetailedComponentCtrl, _super);
        function HoldingsDetailedComponentCtrl($scope) {
            var _this = _super.call(this, "HoldingsDetailedComponentCtrl", $scope) || this;
            var me = _this;
            // Present the component Title
            me.showTitle = me.state.current.name == "home.dashboard";
            //me.accountStore = accountStore;
            //me.groupingStore = groupingStore;
            //me.holdingsStore = holdingsStore;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.setgrid = function (gridtwidget) {
                me.gridWidget = gridtwidget;
                me.reloadData();
            };
            //groupingStore.detailedGroupingChanged.addEventHandler(me, me.onGroupingChanged);
            me.reloadData();
            me.$scope.$watch(function () {
                return me.gridWidget;
            }, function (newValue, oldValue) {
                me.gridWidget = newValue;
                me.gridWidget.setGridAsGroupable();
                me.gridWidget.setGridAsFilterable();
            });
            return _this;
        }
        HoldingsDetailedComponentCtrl.prototype.goToPage = function () {
            var me = this;
            me.state.go("home.portfolio");
        };
        HoldingsDetailedComponentCtrl.prototype.onDispose = function () {
            var me = this;
            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            //me.groupingStore.groupingChanged.removeEventHandler(me, me.onGroupingChanged);
            _super.prototype.onDispose.call(this);
        };
        HoldingsDetailedComponentCtrl.prototype.onAccountChanged = function (accountNumber) {
            var me = this;
            me.reloadData();
        };
        HoldingsDetailedComponentCtrl.prototype.onGroupingChanged = function (groupingID) {
            var me = this;
            //me.reloadData();
        };
        HoldingsDetailedComponentCtrl.prototype.reloadData = function () {
            var me = this;
            var emptyRequest = {
                // Init UiRequestBase
                name: "Detalied Portfolio",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
            };
            me.handleRequest("/api/Holdings/DetaliedPortfolio", emptyRequest).then(function (Holdings) {
                me.applyChanges(function () {
                    me.holdings = Holdings;
                });
            }).fail(function (err) { me.$log.log("Error in HoldingsDetailedComponentCtrl in DetaliedPortfolio - Error Message:" + err.InternalMessage); });
            //me.holdingsStore.getDetailedPortfolio(me.accountStore.currentAccountNumber)
            //    .then((Holdings) => {
            //        me.applyChanges(() => {
            //            me.holdings = Holdings;
            //        });
            //    });
        };
        return HoldingsDetailedComponentCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("HoldingsDetailedComponentCtrl", [
        "$scope",
        HoldingsDetailedComponentCtrl
    ]);
    angular.module("Danel").directive("danelHoldingsDetailed", ["$log", function ($log) {
            return {
                restrict: "E",
                scope: {},
                templateUrl: Danel.HttpService.fixUrl("/views/Directive/HoldingsDetailed"),
                replace: true,
                controller: "HoldingsDetailedComponentCtrl as ctrl",
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=HoldingsDetailedComponent.js.map