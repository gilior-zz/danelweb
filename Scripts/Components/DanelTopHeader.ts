/// <reference path="../typings/angularjs/angular.d.ts" />

module Danel {
    class DanelTopHeaderCtrl extends DanelCtrl {
        constructor($scope, authService: AuthService) {
            super("DanelTopHeaderCtrl", $scope);
            var me = this;
            var emptyRequest: EmptyRequest = <EmptyRequest>{

                // Init UiRequestBase
                name: "getsiteTitle",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],


            };


           

            me.applyChanges(() => { me.$scope.siteTitle = me.parametersService.GetDanelParameter(WebParameter.CompanyDisplayName) });

        }

        signOut() {
            var me = this;

            me.authService.logout()
                .fin(function () {
                    window.location.reload();
                });
        }
    }


    angular.module('Danel')
        .controller("DanelTopHeaderCtrl",
        [
            "$scope",
            "AuthService",
            DanelTopHeaderCtrl
        ])
        .directive("danelTopHeader", function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: HttpService.fixUrl("/views/Directive/DanelTopHeader"),
                controller: "DanelTopHeaderCtrl as ctrl",
            };
        });
}

