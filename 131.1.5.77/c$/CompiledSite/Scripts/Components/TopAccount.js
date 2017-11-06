/// <reference path="../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var TopAccountCtrl = (function (_super) {
        __extends(TopAccountCtrl, _super);
        function TopAccountCtrl($scope) {
            _super.call(this, "TopAccountCtrl", $scope);
            var me = this;
            me.pagesNameMap = me.parametersService.getParametersMap("PagesNameMap", "PersistentMap");
            if (me.pagesNameMap["pageName"] == null)
                me.pagesNameMap["pageName"] = "מסך ראשי";
            if (me.pagesNameMap["pageNameImage"] == null)
                me.pagesNameMap["pageNameImage"] = "/Content/customer_data/current_customer/home-icon.png";
            me.getUserAccounts()
                .then(function (accounts) {
                me.applyChanges(function () {
                    me.accounts = accounts;
                    me.accountStore.setAccounts(me.accounts);
                });
            });
            me.selectedAccountNumber = me.accountStore.currentAccountNumber;
            me.$scope.$watch(function () {
                return me.selectedAccountNumber;
            }, function (newValue, oldValue) {
                //
                //  User selected a new account
                //
                me.accountStore.changeAccount(newValue);
            });
        }
        TopAccountCtrl.prototype.getUserAccounts = function () {
            var me = this;
            if (me.accounts) {
                return Q.when(me.accounts);
            }
            var accountsRequest = {
                // Init UiRequestBase
                name: "GetUserAccounts",
                entityList: [{ Id: "-1", EntityType: 50 }],
                // Set AccountsRequest
                userId: me.authService.getUserId()
            };
            return me.handleRequest("/api/Account/GetUserAccounts", accountsRequest);
        };
        TopAccountCtrl.prototype.getPageName = function () {
            var me = this;
            //return <string>me.pagesNameMap["pageName"];
            switch (me.state.current.name) {
                case 'home.portfolio':
                    return 'הרכב תיק';
                case 'home.dashboard':
                    return 'מסך ראשי';
                case 'home.yield':
                    return 'תשואות';
                case 'home.transaction':
                    return 'תנועות';
                case 'home.contact':
                    return 'צור קשר';
                case 'home.profile':
                    return 'הפרופיל שלי';
            }
        };
        TopAccountCtrl.prototype.getPageImageUrl = function () {
            var me = this;
            //return <string>me.pagesNameMap["pageNameImage"];
            switch (me.state.current.name) {
                case 'home.portfolio':
                    return './Content/customer_data/current_customer/holdings-page-icon.png';
                case 'home.dashboard':
                    return './Content/customer_data/current_customer/home-icon.png';
                case 'home.yield':
                    return './Content/customer_data/current_customer/yield-page-icon.png';
                case 'home.transaction':
                    return './Content/customer_data/current_customer/transaction-page-icon.png';
                case 'home.contact':
                    return './Content/customer_data/current_customer/contact.png';
                case 'home.profile':
                    return './Content/customer_data/current_customer/User.png';
            }
        };
        return TopAccountCtrl;
    }(Danel.DanelCtrl));
    angular.module('Danel')
        .controller("TopAccountCtrl", [
        "$scope",
        TopAccountCtrl
    ])
        .directive("danelTopAccount", function () {
        return {
            restrict: "E",
            replace: true,
            scope: {},
            templateUrl: Danel.HttpService.fixUrl("/views/Directive/TopAccount"),
            controller: "TopAccountCtrl as ctrl",
        };
    });
})(Danel || (Danel = {}));
//# sourceMappingURL=TopAccount.js.map