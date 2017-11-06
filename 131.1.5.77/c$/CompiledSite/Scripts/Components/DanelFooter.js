/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../services/app.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var DanelFooterCtrl = (function (_super) {
        __extends(DanelFooterCtrl, _super);
        function DanelFooterCtrl($scope) {
            _super.call(this, "DanelFooterCtrl", $scope);
            var me = this;
            var termOfUse = $scope.termOfUse = function () {
                me.window.data("kendoWindow").center().open();
                me.applyChanges(function () {
                    $(".k-window-title").html("תנאי שימוש");
                });
            };
            var privacyPolicy = $scope.privacyPolicy = function () {
                me.window.data("kendoWindow").center().open();
                me.applyChanges(function () {
                    $(".k-window-title").html("מדיניות פרטיות");
                });
            };
            var contact = $scope.contact = function () {
                if (!me.allowWebMessageToAdvisor) {
                    me.pagesNameMap["pageName"] = "צור קשר";
                    me.state.go("home.contact");
                }
                else
                    me.contactEvent.fireWithParams();
            };
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
            var req = { webParameter: (Danel.WebParameter.CompanyWebsiteLink + Danel.WebParameter.CompanyDisplayName + Danel.WebParameter.DisplayTermsOfUseOnLogin + Danel.WebParameter.AllowWebMessageToAdvisor) };
            me.httpService.POST('/api/Parameters/GetParameter', req).then(function (res) {
                me.applyChanges(function () {
                    me.allowWebMessageToAdvisor = res.ParameterItems[0].Value.toLowerCase() == 'true';
                    me.$scope.companyDisplayName = res.ParameterItems[1].Value;
                    me.$scope.companyWebsiteLink = res.ParameterItems[2].Value;
                    var displayTermsOfUseOnLogin = res.ParameterItems[3].Value.toLowerCase() == 'true' && me.authService.isLoggedIn();
                });
                var displayTermsOfUseOnLogin = res.ParameterItems[3].Value.toLowerCase() == 'true' && me.authService.isLoggedIn() && me.state.current.name != 'login';
                if (displayTermsOfUseOnLogin)
                    termOfUse();
            }).fail(function (err) {
                me.$log.log("Error in getsiteTitle in DanelTopHeaderCtrl - Error Message:" + err.InternalMessage);
            });
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
        DanelFooterCtrl.prototype.onDispose = function () {
            var me = this;
            _super.prototype.onDispose.call(this);
        };
        return DanelFooterCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("DanelFooterCtrl", [
        "$scope",
        DanelFooterCtrl
    ]);
    angular.module("Danel").directive("danelFooter", ["$log", function ($log) {
            return {
                restrict: "E",
                templateUrl: Danel.HttpService.fixUrl("/views/Directive/DanelFooter"),
                replace: true,
                controller: "DanelFooterCtrl as ctrl",
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=DanelFooter.js.map