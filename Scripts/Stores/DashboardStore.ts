/// <reference path="../Services/app.ts" />

module Danel {
    export class DashboardStore {
        private httpService: HttpService;

        constructor(httpService: HttpService) {
            var me = this;

            me.httpService = httpService;
        }

        //getAccountDash(accountNumber: string): Q.Promise<AccountDash> {
        //    var me = this;

        //    return me.httpService.GET("/api/Dashboard/Account/" + accountNumber);
        //}

        //getPortfolioDash(accountNumber: string): Q.Promise<PortfolioDash> {
        //    var me = this;

        //    return me.httpService.GET("/api/Dashboard/Portfolio/" + accountNumber);
        //}

        ////getYieldDash(accountNumber: string): Q.Promise<YieldDash> {
        ////    var me = this;

        ////    return me.httpService.GET("/api/Dashboard/Yield/" + accountNumber);
        ////}

        //getYieldDash(accountNumber: string, period: string, periodDate: string, startDate:string, endDate:string, index1Id: string, index2Id: string): Q.Promise<YieldDash> {
        //    var me = this;

        //    return me.httpService.POST("/api/Dashboard/Yield", { accountNumber: accountNumber, period: period, periodDate: periodDate, startDate: startDate, endDate: endDate, index1Id: index1Id, index2Id: index2Id });
        //}

        //getTransactionDash(accountNumber: string): Q.Promise<TransactionDash> {
        //    var me = this;

        //    return me.httpService.GET("/api/Dashboard/Transaction/" + accountNumber);
        //}
    }

   

    angular.module("Danel").service("DashboardStore",
        [
            "HttpService",
            DashboardStore
        ]);
} 