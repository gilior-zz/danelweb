/// <reference path="../../typings/angularjs/angular.d.ts" />

module Danel {
    class PortfolioIndexCtrl extends DanelCtrl {
        constructor($scope) {

            super("PortfolioIndexCtrl", $scope);
            var me = this;
        }
    }

    angular.module("Danel").controller("PortfolioIndexCtrl",
        [
            "$scope",
            PortfolioIndexCtrl,
        ]);
}
