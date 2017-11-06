module Danel {

    class DanelHoldingsGroupedDashCtrl extends DanelCtrl {
        public group: Group;      
        //private holdingsStore: HoldingsStore;
        public holdings: PortfolioDash;
        public gridtwidget: GridWidget;
        //private accountStore: AccountStore;
        public setgrid: Function;
        constructor($scope) {
            super("DanelHoldingsGroupedDashCtrl", $scope);
            var me = this;
         
            //me.accountStore = accountStore;
            //me.holdingsStore = holdingsStore;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.setgrid = (gridtwidget: GridWidget) => {
                me.gridtwidget = gridtwidget;
            }
            me.reloadData();
        }

        onDispose() {
            var me = this;

            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            super.onDispose();
        }

        private goToPage() {
            var me = this;
            me.state.go("home.portfolio");
        }

        private onAccountChanged(accountNumber) {
            var me = this;
            me.reloadData();
        }

        private reloadData() {
            var me = this;

            var holdingsGroupedRequest: HoldingsGroupedRequest = <HoldingsGroupedRequest>{

                // Init UiRequestBase
                name: "Grouped Holdings",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                groupID: 1

            };
            me.handleRequest("/api/Holdings/GroupedHoldings", holdingsGroupedRequest).then((Holdings: PortfolioDash) => {
                me.applyChanges(() => {
                    me.holdings = Holdings;
                });
            }).fail((err) => { me.$log.log("Error in DanelHoldingsGroupedDashCtrl in GroupedHoldings - Error Message:" + err.InternalMessage); });


            //me.holdingsStore.getGroupedPortfolio(me.accountStore.currentAccountNumber, 1)
            //    .then((portfolioDash) => {
            //        me.applyChanges(() => {
            //            me.holdings = portfolioDash;
            //        });
            //    });
        }
    }


    angular.module("Danel").controller("DanelHoldingsGroupedDashCtrl",
        [
            "$scope",
            DanelHoldingsGroupedDashCtrl
        ]);

    angular.module("Danel").directive("danelHoldingsGroupedDash", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/HoldingsGroupedDash"),
            replace: true,
            controller: "DanelHoldingsGroupedDashCtrl as ctrl",
        };
    }]);
}