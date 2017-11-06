/// <reference path="../Services/app.ts" />
var Danel;
(function (Danel) {
    var AccountStore = (function () {
        function AccountStore() {
            var me = this;
            me.accounts = null;
            me.currentAccountNumber = "-1";
            me.accountChanged = new Danel.Event();
        }
        //getAll() : Q.Promise<AccountDetails[]> {
        //    var me = this;
        //    if (me.accounts) {
        //        return Q.when(me.accounts);
        //    }
        //    return me.httpService.GET("/api/Account/GetAll")
        //        .then((accounts) => {
        //            return me.accounts = accounts;
        //        });
        //}
        AccountStore.prototype.setAccounts = function (accounts) {
            var me = this;
            me.accounts = accounts;
            if (accounts.length == 1) {
                me.currentAccountNumber = accounts[0].AccountID;
                me.changeAccount(me.currentAccountNumber);
            }
        };
        AccountStore.prototype.changeAccount = function (accountNumber) {
            var me = this;
            me.currentAccountNumber = accountNumber;
            me.accountChanged.fire(me.currentAccountNumber);
        };
        AccountStore.prototype.getCurrentAccountName = function () {
            var me = this;
            if (!me.accounts)
                return "";
            for (var i = 0; i < me.accounts.length; i++) {
                var account = me.accounts[i];
                if (account.AccountID === me.currentAccountNumber) {
                    return account.Name;
                }
            }
            return "";
        };
        AccountStore.prototype.getCurrentAccount = function () {
            var me = this;
            for (var i = 0; i < me.accounts.length; i++) {
                var account = me.accounts[i];
                if (account.AccountID === me.currentAccountNumber) {
                    return account;
                }
            }
            return null;
        };
        return AccountStore;
    }());
    Danel.AccountStore = AccountStore;
    angular.module("Danel").service("AccountStore", [
        AccountStore
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=AccountStore.js.map