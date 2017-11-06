/// <reference path="../Services/app.ts" />

module Danel {
    export class ProfileStore {
        private httpService: HttpService;

        constructor(httpService: HttpService) {
            var me = this;
            me.httpService = httpService;
        }




        //updateProfile(message: MessageRequest): Q.Promise<string> {
        //    var me = this;
        //    return me.httpService.POST("/api/Profile/UpdateProfile/", message);
        //}


        //updatePassword(changePassword: ChangePassword): Q.Promise<string> {
        //    var me = this;
        //    return me.httpService.POST("/api/Profile/UpdatePassword/", changePassword);
        //}
    }

    angular.module("Danel").service("ProfileStore",
        [
            "HttpService",
            ProfileStore
        ]);
} 