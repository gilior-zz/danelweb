/// <reference path="../typings/angularjs/angular.d.ts" />

module Danel {
    class TopAccountCtrl extends DanelCtrl {
        accounts: AccountDetails[];
        selectedAccountNumber: string;
        private pagesNameMap;


        constructor($scope) {

            super("TopAccountCtrl", $scope);
            var me = this;

            me.pagesNameMap = me.parametersService.getParametersMap("PagesNameMap", "PersistentMap");

            if (me.pagesNameMap["pageName"] == null)
                me.pagesNameMap["pageName"] = "מסך ראשי";

            if (me.pagesNameMap["pageNameImage"] == null)
                me.pagesNameMap["pageNameImage"] = "/Content/customer_data/current_customer/home-icon.png";

            me.getUserAccounts()
                .then((accounts) => {
                    me.applyChanges(() => {
                        me.accounts = accounts;
                        me.accountStore.setAccounts(me.accounts);
                    });
                });

            me.selectedAccountNumber = me.accountStore.currentAccountNumber;

            me.$scope.$watch(
                function () {
                    return me.selectedAccountNumber;
                },
                function (newValue, oldValue) {
                    //
                    //  User selected a new account
                    //
                    me.accountStore.changeAccount(newValue);
                });
        }

        getUserAccounts(): Q.Promise<AccountDetails[]> {
            var me = this;

            if (me.accounts) {
                return Q.when(me.accounts);
            }

            var accountsRequest: AccountsRequest = <AccountsRequest>{

                // Init UiRequestBase
                name: "GetUserAccounts",
                entityList: [{ Id: "-1", EntityType: 50 }],

                // Set AccountsRequest
                userId: me.authService.getUserId()
            };

            return me.handleRequest("/api/Account/GetUserAccounts", accountsRequest);
        }


        getPageName(): string {
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
        }

        getPageImageUrl(): string {
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
        }
    }

    angular.module('Danel')
        .controller("TopAccountCtrl",
        [
            "$scope",
            TopAccountCtrl
        ])
        .directive("danelTopAccount", function () {
            return {
                restrict: "E",
                replace: true,
                scope: {},
                templateUrl: HttpService.fixUrl("/views/Directive/TopAccount"),
                controller: "TopAccountCtrl as ctrl",
            };
        });
}

