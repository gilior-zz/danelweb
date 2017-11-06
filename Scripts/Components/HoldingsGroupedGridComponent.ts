module Danel {
    class HoldingsGroupedGridComponentCtrl extends BaseCtrl {
        private accountStore: AccountStore;
      
        private groupingStore: GroupingStore
        private holdingsStore: HoldingsStore
        public holdings: PortfolioDash;
        public totalPortfolioAmount: number;
        public groupName: string;
        constructor($scope, accountStore: AccountStore, groupingStore: GroupingStore, holdingsStore: HoldingsStore) {
            var me = this;

            super("HoldingsGroupedGridComponentCtrl", $scope);

            me.accountStore = accountStore;

            me.groupingStore = groupingStore;
            me.holdingsStore = holdingsStore;
            accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            groupingStore.groupingChanged.addEventHandler(me, me.onGroupingChanged);
            me.groupName = me.groupingStore.getCurrentGroup().GroupName;
            me.reloadData();
            me.totalPortfolioAmount = 0;         
        }

        onDispose() {
            var me = this;

            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            me.groupingStore.groupingChanged.removeEventHandler(me, me.onGroupingChanged);
            super.onDispose();
        }

        private onAccountChanged(accountNumber) {
            var me = this;

            me.reloadData();
        }

        private onGroupingChanged(groupingID) {
            var me = this;
            me.groupName = me.groupingStore.getCurrentGroup().GroupName;
            me.applyChanges(() => {
                $(".holdings-grouped thead [data-field=Name] .k-link").html(me.groupName)
            });

            me.reloadData();
        }

        private reloadData() {
            var me = this;

            me.holdingsStore.getGroupedPortfolio(me.accountStore.currentAccountNumber, me.groupingStore.currentGroupingID)
                .then((portfolioDash) => {
                    me.applyChanges(() => {
                        me.holdings = portfolioDash;
                        me.totalPortfolioAmount = 0;
                        me.holdings.Categories.forEach(function (item) { me.totalPortfolioAmount += item.Amount });
                    });
                });
        }
    }



    angular.module("Danel").controller("HoldingsGroupedGridComponentCtrl",
        [
            "$scope",
            "AccountStore",
            "GroupingStore",
            "HoldingsStore",
            HoldingsGroupedGridComponentCtrl
        ]);

    angular.module("Danel").directive("danelHoldingsGroupedGrid", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/HoldingsGroupedGrid"),
            replace: true,
            controller: "HoldingsGroupedGridComponentCtrl as ctrl",
        };
    }]);
}
