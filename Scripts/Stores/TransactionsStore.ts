/// <reference path="../Services/app.ts" />

module Danel {
    export class TransactionsStore {
        private httpService: HttpService;

        constructor(httpService: HttpService) {
            var me = this;
            me.httpService = httpService;
        }

        //getTotalTransactions(accountNumber: string): Q.Promise<TransactionsSummary> {
        //    var me = this;
        //    return me.httpService.GET("/api/Transaction/TotalTransactions/" + accountNumber);
        //}

        //getTransactions(accountNumber: string, period: string, from: Date= null, to: Date= null): Q.Promise<TransactionDash> {
        //    var me = this;
        //    return me.httpService.POST("/api/Transaction/Transaction/", { accountNumber: accountNumber, period: period, from: from, to: to });
        //}
    }

    angular.module("Danel").service("TransactionsStore",
        [
            "HttpService",
            TransactionsStore
        ]);
} 