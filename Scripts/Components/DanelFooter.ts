/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../services/app.ts" />

declare var embed: any;
module Danel {
    class DanelFooterCtrl extends DanelCtrl {
        private pagesNameMap;
        embedObj: any;
        companyDisplayName: string;
        companyWebsiteLink: string;
        allowWebMessageToAdvisor: boolean;
        private window;
        private contactEvent: Event;
        constructor($scope) {

            super("DanelFooterCtrl", $scope);
            var me = this;


            var termOfUse = $scope.termOfUse = function () {
                if (me.state.current.name == 'login' || me.state.current.name == 'admin' || me.state.current.name == '') return;
                me.window.data("kendoWindow").center().open();
                me.applyChanges(() => {
                    $(".k-window-title").html("תנאי שימוש")
                });
            }


            var privacyPolicy = $scope.privacyPolicy = function () {
                me.window.data("kendoWindow").center().open();
                me.applyChanges(() => {
                    $(".k-window-title").html("מדיניות פרטיות")
                });
            }


            var contact = $scope.contact = function () {
                if (!me.allowWebMessageToAdvisor) {
                    me.pagesNameMap["pageName"] = "צור קשר";
                    me.state.go("home.contact");
                }
                else
                    me.contactEvent.fireWithParams();
            }




            me.pagesNameMap = me.parametersService.getParametersMap("PagesNameMap");
            me.contactEvent = me.eventService.addEvent("DanelFooter", "Contact");
            me.window = $("#window");
            if (!me.window.data("kendoWindow")) {
                me.window.kendoWindow({
                    draggable: false,
                    modal: true,
                    width: 850,
                    height: 500,
                    resizable: false,

                    actions: [
                        "Close"
                    ],
                    visible: false
                });
            }

            var req: parameterRequest = <parameterRequest>{ webParameter: (WebParameter.CompanyWebsiteLink + WebParameter.CompanyDisplayName + WebParameter.DisplayTermsOfUseOnLogin + WebParameter.AllowWebMessageToAdvisor) };

            me.allowWebMessageToAdvisor = me.parametersService.GetDanelParameter(WebParameter.AllowWebMessageToAdvisor).toLowerCase() == 'true';
            me.$scope.companyDisplayName = me.parametersService.GetDanelParameter(WebParameter.CompanyDisplayName);
            me.$scope.companyWebsiteLink = me.parametersService.GetDanelParameter(WebParameter.CompanyWebsiteLink);
            var displayTermsOfUseOnLogin = me.parametersService.GetDanelParameter(WebParameter.DisplayTermsOfUseOnLogin).toLowerCase() == 'true' && me.authService.isLoggedIn();
            if (displayTermsOfUseOnLogin)
                termOfUse();
            me.embedObj = new embed("Content/customer_data/current_customer/TermsOfUse.pdf", "#window");


        }

        //public contact(): void {
        //    var me = this;
        //    if (!me.allowWebMessageToAdvisor) {
        //        me.pagesNameMap["pageName"] = "צור קשר";
        //        me.state.go("home.contact");
        //    }
        //    else
        //        me.contactEvent.fireWithParams();
        //}

        //public termOfUse(): void {
        //    var me = this;
        //    me.window.data("kendoWindow").center().open();
        //    me.applyChanges(() => {
        //        $(".k-window-title").html("תנאי שימוש")
        //    });
        //}

        //public privacyPolicy(): void {
        //    var me = this;
        //    me.window.data("kendoWindow").center().open();
        //    me.applyChanges(() => {
        //        $(".k-window-title").html("מדיניות פרטיות")
        //    });
        //}

        onDispose() {
            var me = this;
            super.onDispose();
        }

    }
    angular.module("Danel").controller("DanelFooterCtrl",
        [
            "$scope",
            DanelFooterCtrl
        ]);

    angular.module("Danel").directive("danelFooter", ["$log", function ($log) {
        return {
            restrict: "E",
            templateUrl: HttpService.fixUrl("/views/Directive/DanelFooter"),
            replace: true,
            controller: "DanelFooterCtrl as ctrl",
        };
    }]);
}