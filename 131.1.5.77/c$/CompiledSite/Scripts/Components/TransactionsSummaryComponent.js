var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var TransactionsSummaryComponentCtrl = (function (_super) {
        __extends(TransactionsSummaryComponentCtrl, _super);
        function TransactionsSummaryComponentCtrl($scope) {
            _super.call(this, "TransactionsSummaryComponentCtrl", $scope);
            var me = this;
            //me.accountStore = accountStore;
            //me.transactionsStore = transactionsStore;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.reloadData();
        }
        TransactionsSummaryComponentCtrl.prototype.onDispose = function () {
            var me = this;
            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            _super.prototype.onDispose.call(this);
        };
        TransactionsSummaryComponentCtrl.prototype.onAccountChanged = function (accountNumber) {
            var me = this;
            me.reloadData();
        };
        TransactionsSummaryComponentCtrl.prototype.reloadData = function () {
            var me = this;
            var emptyRequest = {
                // Init UiRequestBase
                name: "ResetPassword",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
            };
            me.handleRequest("/api/Transaction/TotalTransactions", emptyRequest).then(function (transactionsSummary) {
                transactionsSummary.Account = me.accountStore.getCurrentAccount();
                me.applyChanges(function () {
                    me.transactionsSummary = transactionsSummary;
                });
            }).fail(function (err) { me.$log.log("Error in TransactionsSummaryComponentCtrl in TotalTransactions - Error Message:" + err.InternalMessage); });
            //me.transactionsStore.getTotalTransactions(me.accountStore.currentAccountNumber)
            //    .then((transactionsSummary: TransactionsSummary) => {
            //        transactionsSummary.Account = me.accountStore.getCurrentAccount();
            //        me.applyChanges(() => {
            //            me.transactionsSummary = transactionsSummary;
            //        });
            //    });
        };
        return TransactionsSummaryComponentCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("TransactionsSummaryComponentCtrl", [
        "$scope",
        //"AccountStore",
        //"TransactionsStore",
        TransactionsSummaryComponentCtrl
    ]);
    angular.module("Danel").directive("danelTransactionsSummary", ["$log", function ($log) {
            return {
                restrict: "E",
                scope: {},
                templateUrl: Danel.HttpService.fixUrl("/views/Directive/TransactionsSummary"),
                replace: true,
                controller: "TransactionsSummaryComponentCtrl as ctrl",
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=TransactionsSummaryComponent.js.map