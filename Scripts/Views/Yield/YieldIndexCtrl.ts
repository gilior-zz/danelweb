/// <reference path="../../typings/angularjs/angular.d.ts" />

module Danel {
    class YieldIndexCtrl extends DanelCtrl {
        accounts: AccountDetails[];
        selectedAccountNumber: string;

        constructor($scope) {

            super("DashboardIndexCtrl", $scope);
            var me = this;

                   }



    }

    angular.module("Danel").controller("YieldIndexCtrl",
        [
            "$scope",
            YieldIndexCtrl,
        ]);
}
