/// <reference path="../../typings/angularjs/angular.d.ts" />

module Danel {
    class HomeCtrl extends DanelCtrl {
        isActiveWebSite: boolean;
        constructor($scope) {

            super("HomeCtrl", $scope);
            var me = this;
            this.isActiveWebSite = me.parametersService.GetDanelParameter(WebParameter.IsActiveWebSite) == 'true';
        }
    }

    angular.module("Danel").controller("HomeCtrl",
        [
            "$scope",
            HomeCtrl,
        ]);
}
