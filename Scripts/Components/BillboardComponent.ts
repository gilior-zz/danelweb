/// <reference path="../typings/angularjs/angular.d.ts" />

module Danel {
    class DanelBillboardCtrl extends DanelCtrl {
        html: string;
        userName: string;
        accountName: string;
        constructor($scope) {
            super("DanelBillboardCtrl", $scope);
            var me = this;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.reloadData();
        }

        public setUserName(): void {
            var me = this;
            me.applyChanges(() => {
                me.userName = me.authService.getCurrentUserName();
            });
        }

        public setAccountName(): void {
            var me = this;
            me.applyChanges(() => {
                me.accountName = me.accountStore.getCurrentAccountName();
            });
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

        private reloadData(): void {
            var me = this;
            var emptyRequest: EmptyRequest = <EmptyRequest>{
                // Init UiRequestBase
                name: "Billboard",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
            };
            me.handleRequest("/api/Parameters/Billboard", emptyRequest, false).then((html: string) => {
                me.applyChanges(() => {
                    me.html = me.interpolate(html)(me.$scope);
                });
            }).fail((err) => { me.$log.log("Error in DanelBillboardCtrl in Account - Error Message:" + err.InternalMessage); });
            me.setUserName();
            me.setAccountName();
            
        }
    }

    angular.module('Danel')
        .controller("DanelBillboardCtrl",
        [
            "$scope",
            DanelBillboardCtrl
        ])
        .directive("danelBillboard", function () {
            return {
                restrict: "E",
                scope: {},
                replace: true,
                templateUrl: HttpService.fixUrl("/views/Directive/Billboard"),
                controller: "DanelBillboardCtrl as ctrl",

            };
        })
    }
