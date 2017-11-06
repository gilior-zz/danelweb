var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var TransactionDashComponentCtrl = (function (_super) {
        __extends(TransactionDashComponentCtrl, _super);
        function TransactionDashComponentCtrl($scope) {
            var _this = _super.call(this, "TransactionDashComponentCtrl", $scope) || this;
            var me = _this;
            //me.transactionsStore = transactionsStore;
            //me.accountStore = accountStore;
            //me.dashboardStore = dashboardStore;
            //me.eventService = eventsService;
            //me.parametersService = parametersService;
            me.transactionsParametersMap = me.parametersService.getParametersMap("transactionsParametersMap", "PersistentMap");
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.eventService.getEvent("TransactionsFilter", "transactionRangeChanged").addEventHandler(me, me.onTransactionRangeChanged);
            me.setgrid = function (gridtwidget) {
                me.gridWidget = gridtwidget;
                //me.reloadData();
            };
            me.$scope.$watch(function () {
                return me.gridWidget;
            }, function (newValue, oldValue) {
                me.gridWidget = newValue;
                me.gridWidget.setGridAsGroupable();
                me.gridWidget.setGridAsFilterable();
            });
            me.reloadData();
            return _this;
        }
        TransactionDashComponentCtrl.prototype.onDispose = function () {
            var me = this;
            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            me.eventService.getEvent("TransactionsFilter", "transactionRangeChanged").removeEventHandler(me, me.onTransactionRangeChanged);
            _super.prototype.onDispose.call(this);
        };
        TransactionDashComponentCtrl.prototype.onAccountChanged = function (accountNumber) {
            var me = this;
            me.onTransactionRangeChanged(me.transactionsParametersMap);
        };
        TransactionDashComponentCtrl.prototype.reloadData = function () {
            if (true) {
                var me = this;
                var transactionRequest = {
                    // Init UiRequestBase
                    name: "onTransactionRangeChanged",
                    entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                    period: me.transactionsParametersMap.period || "lastM",
                    from: me.transactionsParametersMap.from,
                    to: me.transactionsParametersMap.to
                };
                me.handleRequest("/api/Transaction/Transaction", transactionRequest).then(function (model) {
                    me.applyChanges(function () {
                        me.model = model;
                    });
                }).fail(function (err) {
                    me.$log.log("Error in TransactionDashComponentCtrl in onTransactionRangeChanged - Error Message:" + err.internalMessage);
                });
            }
        };
        TransactionDashComponentCtrl.prototype.onTransactionRangeChanged = function (params) {
            var me = this;
            var transactionRequest = {
                // Init UiRequestBase
                name: "onTransactionRangeChanged",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                from: params.from,
                to: params.to,
                period: params.period
            };
            me.handleRequest("/api/Transaction/Transaction", transactionRequest).then(function (model) {
                me.applyChanges(function () {
                    me.model = model;
                });
            }).fail(function (err) { me.$log.log("Error in TransactionDashComponentCtrl in onTransactionRangeChanged - Error Message:" + err.InternalMessage); });
            //me.transactionsStore.getTransactions(me.accountStore.currentAccountNumber, params.period, params.from, params.to)
            //    .then((model) => {
            //        me.applyChanges(() => {
            //            me.model = model;
            //        });
            //    });
        };
        return TransactionDashComponentCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("TransactionDashComponentCtrl", [
        "$scope",
        //"AccountStore",
        //"DashboardStore",
        //"ParametersService",
        //"EventsService",
        //"TransactionsStore",
        TransactionDashComponentCtrl
    ]);
    angular.module("Danel").directive("danelTransactionDash", ["$log", function ($log) {
            return {
                restrict: "E",
                scope: {},
                templateUrl: Danel.HttpService.fixUrl("/views/Directive/TransactionDash"),
                replace: true,
                controller: "TransactionDashComponentCtrl as ctrl",
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=TransactionDashComponent.js.map