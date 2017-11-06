/// <reference path="../../typings/angularjs/angular.d.ts" />

module Danel {
    class AuthRecoverNameCtrl extends BaseCtrl {
        private accountStore: AccountStore;
        constructor($scope) {

            super("AuthRecoverNameCtrl", $scope);
            var me = this;
        }
    }

    angular.module("Danel").controller("AuthRecoverNameCtrl",
        [
            "$scope",
            AuthRecoverNameCtrl,
        ]);
}
