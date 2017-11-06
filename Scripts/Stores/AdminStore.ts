/// <reference path="../Services/app.ts" />

module Danel {
    export class AdminStore {
        private httpService: HttpService;

        constructor(httpService: HttpService) {
            var me = this;
            me.httpService = httpService;
        }

        //getAllUsers(): Q.Promise<UsersDash> {
        //    var me = this;
        //    return me.httpService.GET("/api/Admin/GetAllUsers/");
        //}
    }

    export interface UsersDash {
        Users: WebUser[];
    }

    export interface WebUser {
        UserID: number;
        UserName: string;
        UserPassword: string;
        UserType: string;
        UserBlocked: boolean;
        UserDeleted: boolean;
        UserIdentification: string;
        UserEmail: string;
        UserPhone: string;
        UserAddress: string;
        LastLoginDate: Date;
        UserFirstName: string;
        UserLastName: string;
    }

    angular.module("Danel").service("AdminStore",
        [
            "HttpService",
            AdminStore
        ]);
} 