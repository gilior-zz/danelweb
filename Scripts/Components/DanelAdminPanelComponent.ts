module Danel {
    class DanelAdminPanelComponentCtrl extends DanelCtrl {
        //private parametersService: ParametersService;
        //private authService: AuthService;
        //private adminMap;
        //public adminObj: UserDetails;
        //public userObj: UserDetails;
        //public showAdminStrip: Boolean;
        constructor($scope) {
            super("DanelAdminPanelComponentCtrl", $scope);
            var me = this;
            //me.parametersService = parametersService;
            //me.authService = authService;
            //me.adminMap = me.parametersService.getParametersMap("adminMap", "PersistentMap");
            //if (me.adminMap.inAdminMode) {
            //    me.adminObj = me.authService.adminDetails;
            //    me.userObj = me.adminMap.userDetails;
            //}
        }

        public logOutAdmin(): void {
            var me = this;
            me.authService.logout().then(() => { me.redirect("/"); });
        }

        onDispose() {
            var me = this;
            super.onDispose();
        }


    }



    angular.module("Danel").controller("DanelAdminPanelComponentCtrl",
        [
            "$scope",
        //"ParametersService",
        //"AuthService",
            DanelAdminPanelComponentCtrl
        ]);

    angular.module("Danel").directive("danelAdminPanel", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/DanelAdminPanel"),
            replace: true,
            controller: "DanelAdminPanelComponentCtrl as ctrl",
        };
    }]);
}
