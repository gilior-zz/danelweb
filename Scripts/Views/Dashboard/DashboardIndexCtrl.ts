/// <reference path="../../typings/angularjs/angular.d.ts" />

module Danel {
    class DashboardIndexCtrl extends DanelCtrl {
        accounts: AccountDetails[];
        selectedAccountNumber: string;

        constructor($scope, accountStore: AccountStore) {

            super("DashboardIndexCtrl", $scope);
            var me = this;

            //accountStore.getAll()
            //    .then((accounts) => {
            //        me.applyChanges(() => {
            //            me.accounts = accounts;
            //        });
            //    });

            me.selectedAccountNumber = accountStore.currentAccountNumber;

            me.$scope.$watch(
                function () {
                    return me.selectedAccountNumber;
                },
                function (newValue, oldValue) {
                    //
                    //  User selected a new account
                    //
                    accountStore.changeAccount(newValue);
                });
        }


    }

    angular.module("Danel").controller("DashboardIndexCtrl",
        [
            "$scope",
            "AccountStore",
            DashboardIndexCtrl,
        ]);
}
