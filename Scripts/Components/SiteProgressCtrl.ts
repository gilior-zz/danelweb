module Danel {
    export class SiteProgressCtrl extends BaseCtrl {
        running: boolean;
        httpService: HttpService;

        constructor($scope, httpService: HttpService) {

            super("SiteProgressCtrl", $scope);
            var me = this;

            me.httpService = httpService;
            me.httpService.workBegin.addEventHandler(me, me.onHttpWorkBegin);
            me.httpService.workEnd.addEventHandler(me, me.onHttpWorkEnd);
        }

        onDispose() {
            var me = this;

            me.httpService.workBegin.removeEventHandler(me, me.onHttpWorkBegin);
            me.httpService.workEnd.removeEventHandler(me, me.onHttpWorkEnd);

            super.onDispose();
        }

        onHttpWorkBegin() {
            var me = this;

            me.applyChanges(() => {
                me.running = true;
            });
        }

        onHttpWorkEnd() {
            var me = this;

            me.applyChanges(() => {
                me.running = false;
            });
        }
    }

    angular.module("Danel")
        .controller("SiteProgressCtrl",
        [
            "$scope",
            "HttpService",
            SiteProgressCtrl
        ])
        .directive("danelSiteProgress", () => {
        return {
            restrict: "E",
            scope: {
            },
            replace: true,
            templateUrl: HttpService.fixUrl("/views/Directive/SiteProgress"),
            controller: "SiteProgressCtrl as ctrl",
        };
    });

}
