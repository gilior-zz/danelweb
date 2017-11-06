module Danel {
    class PortfolioDashComponentCtrl extends BaseCtrl {
        private accountStore: AccountStore;
        private dashboardStore: DashboardStore;

        public portfolio: PortfolioDash;

        constructor($scope, accountStore: AccountStore, dashboardStore: DashboardStore) {
            var me = this;

            super("PortfolioDashComponentCtrl", $scope);

            me.accountStore = accountStore;
            me.dashboardStore = dashboardStore;

            accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);

            me.reloadData();
        }

        onDispose() {
            var me = this;

            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);

            super.onDispose();
        }

        private onAccountChanged(accountNumber) {
            var me = this;

            me.reloadData();
        }

        private reloadData() {
            var me = this;

            me.dashboardStore.getPortfolioDash(me.accountStore.currentAccountNumber)
                .then((portfolioDash) => {
                    me.applyChanges(() => {
                        me.portfolio = portfolioDash;
                    });
                });
        }
    }

    angular.module("Danel").controller("PortfolioDashComponentCtrl",
        [
            "$scope",
            "AccountStore",
            "DashboardStore",
            PortfolioDashComponentCtrl
        ]);

    angular.module("Danel").directive("danelPortfolioDash", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/PortfolioDash"),
            replace: true,
            controller: "PortfolioDashComponentCtrl as ctrl",
        };
    }]);
}
