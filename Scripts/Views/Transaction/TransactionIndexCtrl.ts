/// <reference path="../../typings/angularjs/angular.d.ts" />

module Danel {
    class TransactionIndexCtrl extends DanelCtrl { 
       
        private dashboardStore: DashboardStore;     
        constructor($scope) {

            super("TransactionIndexCtrl", $scope);      
            var me = this;
        }
    }

    angular.module("Danel").controller("TransactionIndexCtrl",
        [
            "$scope",           
            TransactionIndexCtrl,
        ]);
}
