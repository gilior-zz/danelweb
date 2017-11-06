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
            var _this = _super.call(this, "YieldGridComponentCtrl", $scope) || this;
            var me = _this;
            me.accountStore = accountStore;
            me.dashboardStore = dashboardStore;
            // Act Upon Data Update Event.
            //me.eventService.getEvent("DataManager", "YieldDataUpdate").addEventHandler(me, me.reloadData);
            me.eventService.getEvent("YieldToolbarCtrl", "BtnClick").addEventHandler(me, me.onTollbarBtnClick);
            me.toolbarMap = me.parametersService.getParametersMap("YieldToolbarCtrl", "PersistentMap");
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
            if (me.toolbarMap && me.toolbarMap.period != null)
                me.yieldPeriod = me.toolbarMap.period;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.reloadData();
            return _this;
        }
        YieldGridComponentCtrl.prototype.onAccountChanged = function (accountNumber) {
            var me = this;
            me.reloadData();
        };
        YieldGridComponentCtrl.prototype.onTollbarBtnClick = function (params) {
            var me = this;
            me.yieldPeriod = "Yearly";
            if (params != null && params.period != null) {
                // Save parameters in toolbarMap
                me.toolbarMap = params;
                me.yieldPeriod = params.period;
            }
            me.reloadData();
        };
        YieldGridComponentCtrl.prototype.reloadData = function () {
            var me = this;
            me.getData(me.accountStore.currentAccountNumber, me.yieldPeriod || "Yearly", "", "")
                .then(function (yieldDash) {
                me.applyChanges(function () {
                    if (yieldDash == null)
                        me.model = { Months: [], GridMonths: [] };
                    else {
                        me.model = yieldDash;
                    }
                });
                // Fire YieldDataUpdate Event
                setTimeout(function () {
                    $(".k-filterable").css("background-color", me.headerAndTotalColor);
                }, 1000);
                setTimeout(function () {
                    $(".yield-view .k-grid-content table tbody tr:last").css("background-color", me.headerAndTotalColor);
                }, 2000);
            }).fail(function (err) {
                me.model = null;
                me.$log.log("Error in YieldDashComponent in reloadData - Error Message:" + err.InternalMessage);
            });
        };
        YieldGridComponentCtrl.prototype.getData = function (accountNumber, period, index1Id, index2Id) {
            var me = this;
            var yieldRequest = {
                // Init UiRequestBase
                name: "YieldRequest",
                entityList: [{ Id: accountNumber, EntityType: 50 }],
                // Set YieldRequest
                period: period,
                index1Id: index1Id,
                index2Id: index2Id
            };
            return me.handleRequest("/api/Dashboard/Yield", yieldRequest);
        };
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