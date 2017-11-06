/// <reference path="../../typings/angularjs/angular.d.ts" />

module Danel {
    class HoldingsIndexCtrl extends DanelCtrl {
        constructor($scope) {
            super("HoldingsIndexCtrl", $scope);        
            var me = this;
        }
    }
        
       


    angular.module("Danel").controller("HoldingsIndexCtrl",
        [
            "$scope",
          
            HoldingsIndexCtrl,
        ]);

}