module Danel {
    class TransactionDashComponentCtrl extends DanelCtrl {
        //private accountStore: AccountStore;
        //private dashboardStore: DashboardStore;
        //private transactionsStore: TransactionsStore;
        //private eventService: EventsService;
        //private parametersService: ParametersService;
        public model: TransactionDash;
        private transactionsParametersMap;
        public setgrid: Function;
        public gridWidget: GridWidget;
        constructor($scope) {

            super("TransactionDashComponentCtrl", $scope);
            var me = this;
            //me.transactionsStore = transactionsStore;
            //me.accountStore = accountStore;
            //me.dashboardStore = dashboardStore;
            //me.eventService = eventsService;
            //me.parametersService = parametersService;
            me.transactionsParametersMap = me.parametersService.getParametersMap("transactionsParametersMap", "PersistentMap");
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);

            me.eventService.getEvent("TransactionsFilter", "transactionRangeChanged").addEventHandler(me, me.onTransactionRangeChanged);
            me.setgrid = (gridtwidget: GridWidget) => {
                me.gridWidget = gridtwidget;
                //me.reloadData();
            }
                        me.$scope.$watch(
                function () {
                    return me.gridWidget;
                },
                function (newValue, oldValue) {
                    me.gridWidget = newValue;
                    me.gridWidget.setGridAsGroupable();
                    me.gridWidget.setGridAsFilterable();
                });
            me.reloadData();
        }

        onDispose() {
            var me = this;

            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            me.eventService.getEvent("TransactionsFilter", "transactionRangeChanged").removeEventHandler(me, me.onTransactionRangeChanged);

            super.onDispose();
        }

        private onAccountChanged(accountNumber) {
            var me = this;
            me.onTransactionRangeChanged(me.transactionsParametersMap);
        }

        private reloadData() {
            if (true) {
                var me = this;

                var transactionRequest: TransactionRequest = <TransactionRequest>{

                    // Init UiRequestBase
                    name: "onTransactionRangeChanged",
                    entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                    period: me.transactionsParametersMap.period || "lastM",
                    from: me.transactionsParametersMap.from,
                    to: me.transactionsParametersMap.to
                };
                me.handleRequest("/api/Transaction/Transaction", transactionRequest).then((model) => {
                    me.applyChanges(() => {
                        me.model = model;
                    });
                }).fail((err: DanelError) => {

                        me.$log.log("Error in TransactionDashComponentCtrl in onTransactionRangeChanged - Error Message:" + err.internalMessage);
                    });
            }

        }

        public onTransactionRangeChanged(params): void {
            var me = this;

            var transactionRequest: TransactionRequest = <TransactionRequest>{

                // Init UiRequestBase
                name: "onTransactionRangeChanged",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],

                from: params.from,
                to: params.to,
                period: params.period
            };
            me.handleRequest("/api/Transaction/Transaction", transactionRequest).then((model) => {
                me.applyChanges(() => {
                    me.model = model;
                });
            }).fail((err) => { me.$log.log("Error in TransactionDashComponentCtrl in onTransactionRangeChanged - Error Message:" + err.InternalMessage); });

            //me.transactionsStore.getTransactions(me.accountStore.currentAccountNumber, params.period, params.from, params.to)
            //    .then((model) => {
            //        me.applyChanges(() => {
            //            me.model = model;
            //        });
            //    });
        }
    }

    angular.module("Danel").controller("TransactionDashComponentCtrl",
        [
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
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/TransactionDash"),
            replace: true,
            controller: "TransactionDashComponentCtrl as ctrl",
        };
    }]);
}
