/// <reference path="../typings/angularjs/angular.d.ts" />


module Danel {
    class DanelRadioListCtrl extends BaseCtrl {
        selectedGroup: any;
        constructor($scope)
        {
            var me = this;
            super("DanelRadioListCtrl", $scope);
        }
    }
    angular.module('Danel')
        .controller("DanelRadioListCtrl",
        [
            "$scope",           
            DanelRadioListCtrl
        ])
        .directive("danelRadioList", function () {
            return {
                restrict: "E",
                replace: false,
                templateUrl: HttpService.fixUrl("/views/Directive/DanelRadioList"),
                controller: "DanelRadioListCtrl as ctrl",
            };
        });
}