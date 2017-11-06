module Danel {
    class HoldingsDetailedComponentCtrl extends DanelCtrl {
        //private accountStore: AccountStore;      
        //private groupingStore: GroupingStore
        //private holdingsStore: HoldingsStore
        public holdings: PortfolioDash;
        private showTitle: boolean;
        public setgrid: Function;
        public gridWidget: GridWidget;
        constructor($scope) {

            super("HoldingsDetailedComponentCtrl", $scope);
            var me = this;
            // Present the component Title
           
            me.showTitle = me.state.current.name == "home.dashboard";
            //me.accountStore = accountStore;

            //me.groupingStore = groupingStore;
            //me.holdingsStore = holdingsStore;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.setgrid = (gridtwidget: GridWidget) => {
                me.gridWidget = gridtwidget;
                me.reloadData();
            }
            //groupingStore.detailedGroupingChanged.addEventHandler(me, me.onGroupingChanged);
            me.reloadData();
            me.$scope.$watch(
                function () {
                    return me.gridWidget;
                },
                function (newValue, oldValue) {
                    me.gridWidget = newValue;
                    me.gridWidget.setGridAsGroupable();
                    me.gridWidget.setGridAsFilterable();
                   
                });

        }

        public goToPage() {
            var me = this;
            me.state.go("home.portfolio");
        }


        onDispose() {
            var me = this;
            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            //me.groupingStore.groupingChanged.removeEventHandler(me, me.onGroupingChanged);
            super.onDispose();
        }

        private onAccountChanged(accountNumber) {
            var me = this;

            me.reloadData();
        }

        private onGroupingChanged(groupingID) {
            var me = this;
            //me.reloadData();
        }



        private reloadData() {
            var me = this;

            var emptyRequest: EmptyRequest = <EmptyRequest>{

                // Init UiRequestBase
                name: "Detalied Portfolio",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],


            };
            me.handleRequest("/api/Holdings/DetaliedPortfolio", emptyRequest).then((Holdings: PortfolioDash) => {
                me.applyChanges(() => {
                    me.holdings = Holdings;
                });
            }).fail((err) => { me.$log.log("Error in HoldingsDetailedComponentCtrl in DetaliedPortfolio - Error Message:" + err.InternalMessage); });

            //me.holdingsStore.getDetailedPortfolio(me.accountStore.currentAccountNumber)
            //    .then((Holdings) => {
            //        me.applyChanges(() => {
            //            me.holdings = Holdings;
            //        });

            //    });
        }
    }

    angular.module("Danel").controller("HoldingsDetailedComponentCtrl",
        [
            "$scope",

            HoldingsDetailedComponentCtrl
        ]);

    angular.module("Danel").directive("danelHoldingsDetailed", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {

            },
            templateUrl: HttpService.fixUrl("/views/Directive/HoldingsDetailed"),
            replace: true,
            controller: "HoldingsDetailedComponentCtrl as ctrl",
        };
    }]);
}
