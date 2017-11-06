/// <reference path="../Services/app.ts" />

module Danel {
    export class AccountStore {

        private accounts: AccountDetails[];
        public currentAccountNumber: string;
        public accountChanged: Event;

        constructor() {
            var me = this;

            me.accounts = null;
            me.currentAccountNumber = "-1";

            me.accountChanged = new Event();
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

        public setAccounts(accounts: AccountDetails[]) {
            var me = this;
 me.accounts = accounts;
            if (accounts.length == 1) 
{
  me.currentAccountNumber = accounts[0].AccountID;
me.changeAccount(me.currentAccountNumber); 
}
              
           

        }

        changeAccount(accountNumber) {
            var me = this;

            me.currentAccountNumber = accountNumber;

            me.accountChanged.fire(me.currentAccountNumber);
        }

        getCurrentAccountName(): string {
            var me = this;
            if (!me.accounts) return "";
            for (var i = 0; i < me.accounts.length; i++) {
                var account = me.accounts[i];

                if (account.AccountID === me.currentAccountNumber) {
                    return account.Name;
                }
            }

            return "";

        }

        getCurrentAccount(): AccountDetails {
            var me = this;

            for (var i = 0; i < me.accounts.length; i++) {
                var account = me.accounts[i];

                if (account.AccountID === me.currentAccountNumber) {
                    return account;
                }
            }

            return null;
        }
    }

    export interface AccountDetails {
        AccountID: string;
        Number: string;
        Name: string;
        ManagedBy: string;
        InvestmentPolicy: string;
        VBPolicy: string;
        FCPolicy: string;

    }

    angular.module("Danel").service("AccountStore",
        [
            AccountStore
        ]);
} 