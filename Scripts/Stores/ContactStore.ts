/// <reference path="../Services/app.ts" />

module Danel {
    export class ContactStore {
        private httpService: HttpService;

        constructor(httpService: HttpService) {
            var me = this;
            me.httpService = httpService;
        }

        //sendMessage(message: Message): Q.Promise<Boolean> {
        //    var me = this;

        //    return me.httpService.POST("/api/Contact/SendMessage/", message);
        //}

        //resetPassword(message: Message): Q.Promise<string> {
        //    var me = this;

        //    return me.httpService.POST("/api/Contact/ResetPassword/", message);
        //}

    }

    angular.module("Danel").service("ContactStore",
        [
            "HttpService",
            ContactStore
        ]);
} 