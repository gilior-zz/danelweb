var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var YieldGridComponentCtrl = (function (_super) {
        __extends(YieldGridComponentCtrl, _super);
        function YieldGridComponentCtrl($scope, accountStore, dashboardStore) {
            _super.call(this, "YieldGridComponentCtrl", $scope);
            var me = this;
            me.accountStore = accountStore;
            me.dashboardStore = dashboardStore;
            // Act Upon Data Update Event.
            me.eventService.getEvent("DataManager", "YieldDataUpdate").addEventHandler(me, me.reloadData);
            me.setgrid = function (gridtwidget) {
                me.gridWidget = gridtwidget;
            };
            me.$scope.$watch(function () {
                return me.gridWidget;
            }, function (newValue, oldValue) {
                me.gridWidget = newValue;
                //me.gridWidget.setGridAsGroupable();
                me.gridWidget.setGridAsFilterable();
            });
            me.applyChanges(function () {
                $(".yield-view .k-grid-content table tbody tr:last-child").css("background-color", me.headerAndTotalColor);
            });
        }
        YieldGridComponentCtrl.prototype.onDispose = function () {
            var me = this;
            me.eventService.getEvent("DataManager", "YieldDataUpdate").removeEventHandler(me, me.reloadData);
            _super.prototype.onDispose.call(this);
        };
        YieldGridComponentCtrl.prototype.ReSumFields = function (item) {
            var me = this;
            //me.totalWithdrawals += item.Withdrawals;
            //me.totalYield += item.Yield;
            //me.totalTax += item.Tax;
            //me.totalDeposits += item.Deposits;
            //me.totalYieldGross += item.YieldGross;
            //me.totalProfit += item.Profit;
            //me.totalPortfolioValue += item.PortfolioValue;
        };
        YieldGridComponentCtrl.prototype.reloadData = function (params) {
            var me = this;
            //  me.model.Months.forEach(i=> me.ReSumFields(i));
            me.applyChanges(function () {
                me.model = params["YieldModel"];
                me.totalDeposits = 0;
                me.totalWithdrawals = 0;
                me.totalYield = 0;
                me.totalTax = 0;
                me.totalYieldGross = 0;
                me.totalProfit = 0;
                me.totalPortfolioValue = 0;
                //me.model.Months.forEach(i=> me.ReSumFields(i));
                //me.model.Months.forEach(function (i) {
                //    me.totlaWithdrawal += i.Withdrawal;
                //    me.totalYield += i.Yield;
                //    me.totlaTax += i.Tax;
                //    me.totlaDeposits += i.Deposit;
                //    me.totalYieldGross += i.YieldGross;
                //});
            });
            //me.dashboardStore.getTransactionDash(me.accountStore.currentAccountNumber)
            //    .then((model) => {
            //        me.applyChanges(() => {
            //            me.model = model;
            //        });
            //    });
        };
        return YieldGridComponentCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("YieldGridComponentCtrl", [
        "$scope",
        "AccountStore",
        "DashboardStore",
        "EventsService",
        YieldGridComponentCtrl
    ]);
    angular.module("Danel").directive("danelYieldGrid", ["$log", function ($log) {
            return {
                restrict: "E",
                scope: {},
                templateUrl: Danel.HttpService.fixUrl("/views/Directive/YieldGridComponent"),
                replace: true,
                controller: "YieldGridComponentCtrl as ctrl",
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=YieldGridComponent.js.map