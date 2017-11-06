module Danel {
    class AccountDashComponentCtrl extends DanelCtrl {
        //private accountStore: AccountStore;
        private dashboardStore: DashboardStore;
        WebSiteCustomYieldInMonths: string;
        public accountDash: AccountDash;

        constructor($scope) {

            super("AccountDashComponentCtrl", $scope);
            var me = this;

            //me.accountStore = accountStore;
            //me.dashboardStore = dashboardStore;

            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);

            me.reloadData();
            me.WebSiteCustomYieldInMonths = me.parametersService.GetDanelParameter(WebParameter.WebSiteCustomYieldInMonths);
        }



        getClass(value: any) {
            console.log(value);
        }

        public setToolTip(): string {
            var me = this;
            return me.accountDash.Account.InvestmentPolicy;
        }



        onDispose() {
            var me = this;

            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);

            super.onDispose();
        }

        private onAccountChanged(accountNumber) {
            var me = this;

            me.reloadData();
        }


        InvestmentPolicy: String;
        private reloadData() {
            var me = this;

            var emptyRequest: EmptyRequest = <EmptyRequest>{

                // Init UiRequestBase
                name: "getCurrentAccount",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],


            };
            me.handleRequest("/api/Dashboard/Account", emptyRequest).then((accountDash: AccountDash) => {

                accountDash.Account = me.accountStore.getCurrentAccount();

                me.applyChanges(() => {
                    me.accountDash = accountDash;

                });
                var res: string = '';
                if (!me.accountDash || !me.accountDash.Account || me.accountDash.Account.InvestmentPolicy) return;
                var policy = me.accountDash.Account.InvestmentPolicy;
                var splitedPolicy = policy.split(' ');
                for (let i = 0; i < splitedPolicy.length; i++) {
                    var currentLength = <number>res.length;
                    var newItemLength = <number>splitedPolicy[i].length;
                    if (currentLength + newItemLength > 22) {
                        res += '...'
                        me.InvestmentPolicy = res;
                        continue;
                    }
                    res += splitedPolicy[i];
                }
            }).fail((err) => { me.$log.log("Error in AccountDashComponentCtrl in Account - Error Message:" + err.InternalMessage); });

            //me.dashboardStore.getAccountDash(me.accountStore.currentAccountNumber)
            //    .then((accountDash: AccountDash) => {

            //        accountDash.Account = me.accountStore.getCurrentAccount();
            //        me.applyChanges(() => {
            //            me.accountDash = accountDash;
            //        });
            //    });
        }
    }

    angular.module("Danel").controller("AccountDashComponentCtrl",
        [
            "$scope",
            //"AccountStore",
            //"DashboardStore",
            AccountDashComponentCtrl
        ]);

    angular.module("Danel").directive("danelAccountDash", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/AccountDash"),
            replace: true,
            controller: "AccountDashComponentCtrl as ctrl",
        };
    }]);
}
