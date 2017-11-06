module Danel {
    class YieldGridComponentCtrl extends DanelCtrl {
        private dashboardStore: DashboardStore;
        private toolbarMap;
        private yieldPeriod: string;
        public setgrid: Function;
        public gridWidget: GridWidget;
        public model: YieldDash;
        public totalDeposits: number;
        public totalWithdrawals: number;
        public totalYield: number;
        public totalYieldGross: number;
        public totalTax: number;
        public totalProfit: number;
        public totalPortfolioValue: number;
        constructor($scope, accountStore: AccountStore, dashboardStore: DashboardStore) {

            super("YieldGridComponentCtrl", $scope);
            var me = this;

            me.accountStore = accountStore;
            me.dashboardStore = dashboardStore;

            // Act Upon Data Update Event.
            //me.eventService.getEvent("DataManager", "YieldDataUpdate").addEventHandler(me, me.reloadData);
            me.eventService.getEvent("YieldToolbarCtrl", "BtnClick").addEventHandler(me, me.onTollbarBtnClick);
            me.toolbarMap = me.parametersService.getParametersMap("YieldToolbarCtrl", "PersistentMap");
            me.setgrid = (gridtwidget: GridWidget) => {
                me.gridWidget = gridtwidget;

            }
            me.$scope.$watch(
                function () {
                    return me.gridWidget;
                },
                function (newValue, oldValue) {
                    me.gridWidget = newValue;
                    //me.gridWidget.setGridAsGroupable();
                    me.gridWidget.setGridAsFilterable();
                });

            me.applyChanges(() => {
                $(".yield-view .k-grid-content table tbody tr:last-child").css("background-color", me.headerAndTotalColor);
            })

            if (me.toolbarMap && me.toolbarMap.period != null)
                me.yieldPeriod = me.toolbarMap.period;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.reloadData();

        }

        private onAccountChanged(accountNumber) {
            var me = this;

            me.reloadData();
        }

        private onTollbarBtnClick(params) {
            var me = this;
            me.yieldPeriod = "Yearly"

            if (params != null && params.period != null) {
                // Save parameters in toolbarMap
                me.toolbarMap = params;
                me.yieldPeriod = <string>params.period;
            }

            me.reloadData();


        }

        private reloadData() {
            var me = this;

            me.getData(me.accountStore.currentAccountNumber, me.yieldPeriod || "Yearly", "", "")
                .then((yieldDash) => {
                    me.applyChanges(() => {

                        if (yieldDash == null)
                            me.model = { Months: [], GridMonths: [] };
                        else {
                            me.model = yieldDash;
                            //me.gridWidget.selectElementGivenItsId("total-row");
                        }

                    });

                    // Fire YieldDataUpdate Event
                    setTimeout(() => {
                        $(".k-filterable").css("background-color", me.headerAndTotalColor);
                    }, 1000);
                    setTimeout(() => {
                        $(".yield-view .k-grid-content table tbody tr:last").css("background-color", me.headerAndTotalColor);
                    }, 2000);
                }).fail(err => {
                    me.model = null;
                    me.$log.log("Error in YieldDashComponent in reloadData - Error Message:" + err.InternalMessage);
                });
        }

        private getData(accountNumber: string, period: string, index1Id: string, index2Id: string): Q.Promise<YieldDash> {
            var me = this;

            var yieldRequest: YieldRequest = <YieldRequest>{

                // Init UiRequestBase
                name: "YieldRequest",
                entityList: [{ Id: accountNumber, EntityType: 50 }],

                // Set YieldRequest
                period: period,
                index1Id: index1Id,
                index2Id: index2Id
            };

            return me.handleRequest("/api/Dashboard/Yield", yieldRequest);
        }

        onDispose() {
            var me = this;

            me.eventService.getEvent("DataManager", "YieldDataUpdate").removeEventHandler(me, me.reloadData);

            super.onDispose();
        }


        private ReSumFields(item: YieldDashMonth): void {
            var me = this;
            //me.totalWithdrawals += item.Withdrawals;
            //me.totalYield += item.Yield;
            //me.totalTax += item.Tax;
            //me.totalDeposits += item.Deposits;
            //me.totalYieldGross += item.YieldGross;
            //me.totalProfit += item.Profit;
            //me.totalPortfolioValue += item.PortfolioValue;

        }

        //private reloadData(params) {
        //    var me = this;
        //    //  me.model.Months.forEach(i=> me.ReSumFields(i));
        //    me.applyChanges(() => {
        //        me.model = <YieldDash>params["YieldModel"];
        //        me.totalDeposits = 0;
        //        me.totalWithdrawals = 0;
        //        me.totalYield = 0;
        //        me.totalTax = 0;
        //        me.totalYieldGross = 0;
        //        me.totalProfit = 0;
        //        me.totalPortfolioValue = 0;              
        //    });          
        //}
    }

    angular.module("Danel").controller("YieldGridComponentCtrl",
        [
            "$scope",
            "AccountStore",
            "DashboardStore",
            "EventsService",
            YieldGridComponentCtrl
        ]);

    angular.module("Danel").directive("danelYieldGrid", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/YieldGridComponent"),
            replace: true,
            controller: "YieldGridComponentCtrl as ctrl",
        };
    }]);
}
