module Danel {
    class TransactionsSummaryComponentCtrl extends DanelCtrl {
        //private accountStore: AccountStore;
        //private transactionsStore: TransactionsStore;

        public transactionsSummary: TransactionsSummary;

        constructor($scope) {

            super("TransactionsSummaryComponentCtrl", $scope);
            var me = this;

            //me.accountStore = accountStore;
            //me.transactionsStore = transactionsStore;

            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);

            me.reloadData();
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

        private reloadData() {
            var me = this;

            var emptyRequest: EmptyRequest = <EmptyRequest>{

                // Init UiRequestBase
                name: "ResetPassword",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],


            };
            me.handleRequest("/api/Transaction/TotalTransactions", emptyRequest).then((transactionsSummary: TransactionsSummary) => {
                transactionsSummary.Account = me.accountStore.getCurrentAccount();
                me.applyChanges(() => {
                    me.transactionsSummary = transactionsSummary;
                });
            }).fail((err) => { me.$log.log("Error in TransactionsSummaryComponentCtrl in TotalTransactions - Error Message:" + err.InternalMessage); });


            //me.transactionsStore.getTotalTransactions(me.accountStore.currentAccountNumber)
            //    .then((transactionsSummary: TransactionsSummary) => {
            //        transactionsSummary.Account = me.accountStore.getCurrentAccount();
            //        me.applyChanges(() => {
            //            me.transactionsSummary = transactionsSummary;
            //        });
            //    });
        }
    }

    angular.module("Danel").controller("TransactionsSummaryComponentCtrl",
        [
            "$scope",
        //"AccountStore",
        //"TransactionsStore",
            TransactionsSummaryComponentCtrl
        ]);

    angular.module("Danel").directive("danelTransactionsSummary", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/TransactionsSummary"),
            replace: true,
            controller: "TransactionsSummaryComponentCtrl as ctrl",
        };
    }]);
}
