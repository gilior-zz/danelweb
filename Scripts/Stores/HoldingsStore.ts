/// <reference path="../Services/app.ts" />

module Danel {
    export class HoldingsStore {
        private httpService: HttpService;

        constructor(httpService: HttpService) {
            var me = this;
            me.httpService = httpService;
        }

        //getGroupedPortfolio(accountNumber: string, groupingID: number): Q.Promise<PortfolioDash> {
        //    var me = this;
        //    return me.httpService.GET("/api/Holdings/GroupedHoldings/" + accountNumber + ";" + groupingID);
        //}

        //getDetailedPortfolio(accountNumber: string): Q.Promise<PortfolioDash> {
        //    var me = this;
        //    return me.httpService.GET("/api/Holdings/DetaliedPortfolio/" + accountNumber);
        //}
    }

    angular.module("Danel").service("HoldingsStore",
        [
            "HttpService",
            HoldingsStore
        ]);
} 