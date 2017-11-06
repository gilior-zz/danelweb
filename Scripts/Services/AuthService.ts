/// <reference path="httpservice.ts" />

module Danel {
    export class AuthService {
        private httpService: HttpService;

        private loginResponse: LoginResponse;
        public userDetails: UserDetails;
        public adminDetails: UserDetails;
        public loginDetails: LoginDetails;

        constructor(httpService: HttpService) {
            var me = this;

            me.httpService = httpService;

            //Add Parameters Map to the Parameters Service
            me.initLoginData();
        }

        private initLoginData() {
            var me = this;
            me.userDetails = null;
            me.adminDetails = null;
            me.loginDetails = null;
            //
            //  Danel.loginDetails is set by the main HTML and copy to here
            //  All code should use this service and not Danel.loginDetails
            //
           
            me.loginResponse = (<any>Danel).loginResponse;

            if (me.loginResponse == null)
                return;

            if (me.loginResponse.loginDetails != null) {
                me.loginDetails = me.loginResponse.loginDetails;
            }

            if (me.loginResponse.userDetails != null) {
                me.userDetails = me.loginResponse.userDetails;

            }

            if (me.loginResponse.adminDetails != null) {
                me.adminDetails = me.loginResponse.adminDetails;
            }
        }

        public getUserDetails() {
            var me = this;
            return me.userDetails;
        }

        public getAdminDetails() {
            var me = this;
            return me.adminDetails;
        }
        public getCurrentUserName(): string {
            var me = this;
            if (!me.userDetails) return "";
            return me.userDetails.name;
        }

        login(userName: string, password: string, rememberMe: boolean): Q.Promise<LoginResponse> {
            var me = this;
            //var retVal = { loginResult: "", role: "" };

            return me.httpService.POST("/api/Auth/Login", {
                userName: userName,
                password: password,
                rememberMe: rememberMe,
            })
                .then((loginResponse: LoginResponse) => {

                    me.loginResponse = loginResponse;
                    if (me.loginResponse.loginDetails) {
                        if (me.loginResponse.loginDetails.role === "WebAdmin") {
                            me.adminDetails = loginResponse.userDetails;
                            me.userDetails = null;
                        }
                        else {
                            me.userDetails = loginResponse.userDetails;

                            me.adminDetails = null;
                        }
                    }


                    //me.userDetails = loginResponse.userDetails;

                    if (me.loginResponse.loginDetails.role != "WebAdmin" &&
                        me.loginResponse.loginDetails.role != "AccountOwner" &&
                        me.loginResponse.loginDetails.role != "ExternalUser"
                    ) {
                        //retVal.loginResult = "ErrorUnknownRole";
                        //retVal.loginResult = loginResponse.loginDetails.role;
                        //return retVal;
                        return loginResponse;
                    }

                    //retVal.loginResult = loginResponse.loginDetails.loginResult;
                    //retVal.role = loginResponse.loginDetails.role;

                    //return retVal;
                    return loginResponse;
                })

                .fail(err => {
                    throw err;
                });
        }

        impersonateAs(entityId, phone, address, email, name, lastLoginDate): Q.Promise<boolean> {
            var me = this;
            var impersonateRequest = new ImpersonateRequest();
            impersonateRequest.name = "impersonateAs";
            impersonateRequest.entityList = [{ Id: "-1", EntityType: 50 }];
            impersonateRequest.userId = entityId;
            impersonateRequest.name = name;
            impersonateRequest.userAddress = address;
            impersonateRequest.userEmail = email;
            impersonateRequest.userName = name;
            impersonateRequest.userPhone = phone;
            impersonateRequest.lastLoginDate = lastLoginDate;
            impersonateRequest.token = me.loginResponse.loginDetails.id;
            impersonateRequest.role = me.loginResponse.loginDetails.role;

            return me.httpService.POST("/api/Admin/ImpersonateAs", impersonateRequest
            )
                .then((res) => {

                    return true;
                })
                .fail(err => {
                    console.log("Error in AuthService in impersonateAs - Error Message:" + err.InternalMessage);
                    return false;
                });
        }

        removeImpersonateAs(): Q.Promise<boolean> {
            var me = this;
            var emptyRequest: EmptyRequest = <EmptyRequest>{
                name: "removeImpersonateAs",
                entityList: [{ Id: "-1", EntityType: 50 }],
                role: me.loginResponse.loginDetails.role,
                token: me.loginResponse.loginDetails.id
            };
            return me.httpService.POST("/api/Admin/RemoveImpersonateAs", emptyRequest
            )
                .then((res) => {
                    return true;
                })
                .fail(err => {
                    console.log("Error in AuthService in removeImpersonateAs - Error Message:" + err.InternalMessage);
                    return false;
                });
        }

        logout(): Q.Promise<any> {
            var me = this;

            me.loginResponse = null;
            me.userDetails = null;
            me.adminDetails = null;

            return me.httpService.POST("/api/Auth/Logout");
        }

        public isAuthorized(roles: string[]): boolean {
            var me = this;

            return me.verifyAuthorized(roles);
        }

        private verifyAuthorized(roles: string[]): boolean {
            var me = this;
            var res = roles.some(role => me.isInRole(role));
            return res;
        }

        public isInRole(role: string): boolean {
            var me = this;

            if (!me.isLoggedIn()) {
                return false;
            }

            role = role.toLowerCase();
            var myRole = me.loginResponse.loginDetails.role.toLowerCase();
            if (myRole == role) {
                return true;
            }

            return false;
        }

        public isLoggedIn(): boolean {
            var me = this;

            if (!!me.loginResponse && me.loginResponse.loginDetails.loginResult === "Ok")
                return true;

            return false;
        }

        public authRequest(request: UiRequestBase): boolean {
            var me = this;

            var retVal = false;
            // Set request role
            request.role = me.loginDetails.role;
            request.token = me.loginDetails.id;
            if (request.entityList[0].Id === "-1") { // All Accounts should be considered
                request.entityList = me.userDetails.authorizedEntityList;

                retVal = true;
            }
            else {
                me.userDetails.authorizedEntityList.forEach((entity: DanelEntity) => {
                    if (entity.Id === request.entityList[0].Id) {
                        retVal = true;
                    }
                });
            }

            return retVal;
        }

        public getUserId(): string {
            var me = this;
            return me.loginResponse.userDetails.userId;
        }
    }

    export class LoginResponse {
        loginDetails: LoginDetails;
        userDetails: UserDetails;
        adminDetails: UserDetails;
    }

    export class LoginDetails {
        loginResult: string;
        userId: string;
        id: string;
        role: string;
        authorizedEntityList: DanelEntity[];
        changePassword: string;

    }

    export class UserDetails {
        userId: string;
        name: string;
        email: string;
        address: string;
        phone: string;
        authorizedEntityList: DanelEntity[];
        lastLoginDate: string;
    }

    angular.module("Danel").service("AuthService",
        [
            "HttpService",

            AuthService
        ]);
} 