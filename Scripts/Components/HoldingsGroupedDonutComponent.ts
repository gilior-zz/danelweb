module Danel {
    class HoldingsGroupedDonutComponentCtrl extends BaseCtrl {
        private accountStore: AccountStore;
      
        private groupingStore: GroupingStore
        private holdingsStore: HoldingsStore
        public holdings: PortfolioDash;

        constructor($scope, accountStore: AccountStore, groupingStore: GroupingStore, holdingsStore: HoldingsStore) {
            var me = this;

            super("HoldingsGroupedDonutComponentCtrl", $scope);

            me.accountStore = accountStore;

            me.groupingStore = groupingStore;
            me.holdingsStore = holdingsStore;
            accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            groupingStore.groupingChanged.addEventHandler(me, me.onGroupingChanged);
            me.reloadData();
        }

        onDispose() {
            var me = this;

            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            me.groupingStore.groupingChanged.removeEventHandler(me, me.onAccountChanged);
            super.onDispose();
        }

        private onAccountChanged(accountNumber) {
            var me = this;

            me.reloadData();
        }

        private onGroupingChanged(groupingID) {
            var me = this;
            me.reloadData();
        }

        private reloadData() {
            var me = this;

            me.holdingsStore.getGroupedPortfolio(me.accountStore.currentAccountNumber, me.groupingStore.currentGroupingID)
                .then((portfolioDash) => {
                    me.applyChanges(() => {
                        me.holdings = portfolioDash;
                    });
                });
        }
    }



    angular.module("Danel").controller("HoldingsGroupedDonutComponentCtrl",
        [
            "$scope",
            "AccountStore",
            "GroupingStore",
            "HoldingsStore",
            HoldingsGroupedDonutComponentCtrl
        ]);

    angular.module("Danel").directive("danelHoldingsGroupedDonut", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/HoldingsGroupedDonut"),
            replace: true,
            controller: "HoldingsGroupedDonutComponentCtrl as ctrl",
        };
    }]);
}
