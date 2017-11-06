module Danel {
    class DanelChangePasswordCtrl extends BaseCtrl {
        public password_1: string;
        public password_2: string;
      
        constructor($scope, parametersService: ParametersService, authService: AuthService) {
            var me = this;
            super("DanelChangePasswordCtrl", $scope);      
            me.$scope.$watch(function () {
                return me.password_1;
            },
                function (newValue: number, oldValue: number) {
                    me.password_2 = '';
                });
            me.$scope.$watch(function () {
                return me.password_2;
            },
                function (newValue: number, oldValue: number) {
                    if (me.password_2 != me.password_1) {
                        var obj = jQuery('.profile-form').find('input[name=pass2]');
                        $(obj).addClass("ng-dirty");
                        $(obj).addClass("ng-invalid");
                    }
                    else {
                        var obj = jQuery('.profile-form').find('input[name=pass2]');
                        $(obj).addClass("ng-valid");
                    }
                });  
        }

        onDispose() {
            var me = this;
            super.onDispose();
        }
    }

    angular.module("Danel").controller("DanelChangePasswordCtrl",
        [
            "$scope",          
            DanelChangePasswordCtrl
        ]);

    angular.module("Danel").directive("danelChangePassword", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/DanelChangePassword"),
            replace: true,
            controller: "DanelChangePasswordCtrl as ctrl",
        };
    }]);
}
