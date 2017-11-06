/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var DashboardIndexCtrl = (function (_super) {
        __extends(DashboardIndexCtrl, _super);
        function DashboardIndexCtrl($scope, accountStore) {
            _super.call(this, "DashboardIndexCtrl", $scope);
            var me = this;
            //accountStore.getAll()
            //    .then((accounts) => {
            //        me.applyChanges(() => {
            //            me.accounts = accounts;
            //        });
            //    });
            //me.selectedAccountNumber = accountStore.currentAccountNumber;
            //me.$scope.$watch(
            //    function () {
            //        return me.selectedAccountNumber;
            //    },
            //    function (newValue, oldValue) {
            //        //
            //        //  User selected a new account
            //        //
            //        accountStore.changeAccount(newValue);
            //    });
        }
        return DashboardIndexCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("DashboardIndexCtrl", [
        "$scope",
        "AccountStore",
        DashboardIndexCtrl,
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=DashboardIndexCtrl.js.map