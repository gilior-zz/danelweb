/// <reference path="../../typings/angularjs/angular.d.ts" />

module Danel {
    class AuthNewRegisterCtrl extends DanelCtrl {
       
        constructor($scope) {

            super("AuthNewRegisterCtrl", $scope);
            var me = this;
        }
    }

    angular.module("Danel").controller("AuthNewRegisterCtrl",
        [
            "$scope",
            AuthNewRegisterCtrl,
        ]);
}
