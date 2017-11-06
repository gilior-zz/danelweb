var Danel;
(function (Danel) {
    var AuthService = (function () {
        function AuthService(httpService) {
            var me = this;
            me.httpService = httpService;
            //Add Parameters Map to the Parameters Service
            me.initLoginData();
        }
        AuthService.prototype.initLoginData = function () {
            var me = this;
            me.userDetails = null;
            me.adminDetails = null;
            me.loginDetails = null;
            //
            //  Danel.loginDetails is set by the main HTML and copy to here
            //  All code should use this service and not Danel.loginDetails
            //
            me.loginResponse = Danel.loginResponse;
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
        };
        AuthService.prototype.getUserDetails = function () {
            var me = this;
            return me.userDetails;
        };
        AuthService.prototype.getAdminDetails = function () {
            var me = this;
            return me.adminDetails;
        };
        AuthService.prototype.login = function (userName, password, rememberMe) {
            var me = this;
            //var retVal = { loginResult: "", role: "" };
            return me.httpService.POST("/api/Auth/Login", {
                userName: userName,
                password: password,
                rememberMe: rememberMe,
            })
                .then(function (loginResponse) {
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
                    me.loginResponse.loginDetails.role != "ExternalUser") {
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
                .fail(function (err) {
                throw err;
            });
        };
        AuthService.prototype.impersonateAs = function (entityId, phone, address, email, name, lastLoginDate) {
            var me = this;
            var impersonateRequest = new Danel.ImpersonateRequest();
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
            return me.httpService.POST("/api/Admin/ImpersonateAs", impersonateRequest)
                .then(function (res) {
                return true;
            })
                .fail(function (err) {
                console.log("Error in AuthService in impersonateAs - Error Message:" + err.InternalMessage);
                return false;
            });
        };
        AuthService.prototype.removeImpersonateAs = function () {
            var me = this;
            var emptyRequest = {
                name: "removeImpersonateAs",
                entityList: [{ Id: "-1", EntityType: 50 }],
                role: me.loginResponse.loginDetails.role,
                token: me.loginResponse.loginDetails.id
            };
            return me.httpService.POST("/api/Admin/RemoveImpersonateAs", emptyRequest)
                .then(function (res) {
                return true;
            })
                .fail(function (err) {
                console.log("Error in AuthService in removeImpersonateAs - Error Message:" + err.InternalMessage);
                return false;
            });
        };
        AuthService.prototype.logout = function () {
            var me = this;
            me.loginResponse = null;
            me.userDetails = null;
            me.adminDetails = null;
            return me.httpService.POST("/api/Auth/Logout");
        };
        AuthService.prototype.isAuthorized = function (roles) {
            var me = this;
            return me.verifyAuthorized(roles);
        };
        AuthService.prototype.verifyAuthorized = function (roles) {
            var me = this;
            var res = roles.some(function (role) { return me.isInRole(role); });
            return res;
        };
        AuthService.prototype.isInRole = function (role) {
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
        };
        AuthService.prototype.isLoggedIn = function () {
            var me = this;
            if (!!me.loginResponse && me.loginResponse.loginDetails.loginResult === "Ok")
                return true;
            return false;
        };
        AuthService.prototype.authRequest = function (request) {
            var me = this;
            var retVal = false;
            // Set request role
            request.role = me.loginDetails.role;
            request.token = me.loginDetails.id;
            if (request.entityList[0].Id === "-1") {
                request.entityList = me.userDetails.authorizedEntityList;
                retVal = true;
            }
            else {
                me.userDetails.authorizedEntityList.forEach(function (entity) {
                    if (entity.Id === request.entityList[0].Id) {
                        retVal = true;
                    }
                });
            }
            return retVal;
        };
        AuthService.prototype.getUserId = function () {
            var me = this;
            return me.loginResponse.userDetails.userId;
        };
        AuthService.prototype.getCurrentUserName = function () {
            var me = this;
            if (!me.userDetails)
                return "";
            return me.userDetails.name;
        };
        return AuthService;
    }());
    Danel.AuthService = AuthService;
    var LoginResponse = (function () {
        function LoginResponse() {
        }
        return LoginResponse;
    }());
    Danel.LoginResponse = LoginResponse;
    var LoginDetails = (function () {
        function LoginDetails() {
        }
        return LoginDetails;
    }());
    Danel.LoginDetails = LoginDetails;
    var UserDetails = (function () {
        function UserDetails() {
        }
        return UserDetails;
    }());
    Danel.UserDetails = UserDetails;
    angular.module("Danel").service("AuthService", [
        "HttpService",
        AuthService
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=AuthService.js.map