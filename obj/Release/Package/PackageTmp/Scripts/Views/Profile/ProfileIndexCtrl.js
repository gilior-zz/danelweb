/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var ProfileIndexCtrl = (function (_super) {
        __extends(ProfileIndexCtrl, _super);
        function ProfileIndexCtrl($scope) {
            var _this = _super.call(this, "ProfileIndexCtrl", $scope) || this;
            var me = _this;
            //me.parametersService = parametersService;
            me.message = new Danel.MessageRequest();
            me.changePassword = new Danel.ChangePassword();
            //me.authService = authService;
            //me.profileStore = profileStore;
            me.userLoggedIn = me.authService.isLoggedIn();
            me.updateProfileEvent = me.eventService.addEvent("ProfileIndex", "UpdateProfile");
            me.message.senderName = me.authService.userDetails.name;
            me.message.email = me.authService.userDetails.email;
            me.message.phone = me.authService.userDetails.phone;
            me.message.address = me.authService.userDetails.address;
            me.passwordStatus = "אישור";
            me.passwordWindow = $("#window");
            if (!me.passwordWindow.data("kendoWindow")) {
                me.passwordWindow.kendoWindow({
                    draggable: false,
                    modal: true,
                    width: 620,
                    title: "עדכון סיסמא",
                    actions: [
                        "Close"
                    ],
                    visible: false
                });
            }
            me.passwordStatus = "אישור";
            me.saveStatusWindow = $("#statusWindow");
            if (!me.saveStatusWindow.data("kendoWindow")) {
                me.saveStatusWindow.kendoWindow({
                    draggable: false,
                    modal: true,
                    width: "200px",
                    title: "הודעת מערכת",
                    actions: [
                        "Close"
                    ],
                    close: function () {
                        me.saveBtnDisabled = false;
                    },
                    visible: false
                });
            }
            me.watchData();
            return _this;
        }
        ProfileIndexCtrl.prototype.watchData = function () {
            var me = this;
            me.$scope.$watch(function () {
                return me.message.email;
            }, function (newValue, oldValue) {
                if (newValue)
                    me.invalidEmail = false;
                else
                    me.invalidEmail = true;
            });
            me.$scope.$watch(function () {
                return me.message.address;
            }, function (newValue, oldValue) {
                if (newValue)
                    me.invalidAddress = false;
                else
                    me.invalidAddress = true;
            });
            me.$scope.$watch(function () {
                return me.message.phone;
            }, function (newValue, oldValue) {
                if (newValue)
                    me.invalidPhone = false;
                else
                    me.invalidPhone = true;
            });
            me.$scope.$watch(function () {
                return me.changePassword.current_password;
            }, function (newValue, oldValue) {
                me.invalidCurrentPassword = false;
                if (newValue) {
                }
                else
                    me.invalidCurrentPassword = true;
            });
            me.$scope.$watch(function () {
                return me.changePassword.new_password;
            }, function (newValue, oldValue) {
                me.changePassword.new_password_2 = undefined;
                me.invalidNewPassword1 = false;
                me.invalidNewPassword2 = false;
                if (!me.changePassword.new_password) {
                    me.invalidNewPassword1Reason = "נתון חובה";
                    me.invalidNewPassword1 = true;
                }
                else if (me.changePassword.current_password === me.changePassword.new_password) {
                    me.invalidNewPassword1 = true;
                    me.invalidNewPassword1Reason = "סיסמא חדשה חייבת להיות שונה מסיסמא נוכחית";
                }
                //if (newValue) {
                //    if (newValue === me.changePassword.current_password) {
                //        me.identicalPasswords = true;
                //        me.changePassword.new_password_2 = undefined;
                //    }
                //    else {
                //        me.invalidNewPassword1 = false;
                //        me.changePassword.new_password_2 = undefined;
                //    }
                //}
                //else
                //    me.invalidNewPassword1 = true;
            });
            me.$scope.$watch(function () {
                return me.changePassword.new_password_2;
            }, function (newValue, oldValue) {
                me.invalidNewPassword2 = false;
                if (me.changePassword.new_password != me.changePassword.new_password_2) {
                    me.invalidNewPassword2 = true;
                }
                //    if (newValue != me.changePassword.new_password) {
                //        me.invalidNewPassword2 = true;
                //    }
                //    else {
                //        me.invalidNewPassword2 = false;
                //    }
            });
        };
        ProfileIndexCtrl.prototype.openAdvisorWindow = function () {
            var me = this;
            me.updateProfileEvent.fireWithParams();
        };
        ProfileIndexCtrl.prototype.handlePassword = function () {
            var me = this;
            if (!me.changePassword.current_password) {
                me.invalidCurrentPassword = true;
                return;
            }
            if (!me.changePassword.new_password) {
                me.invalidNewPassword1Reason = "נתון חובה";
                me.invalidNewPassword1 = true;
                return;
            }
            if (me.changePassword.current_password == me.changePassword.new_password) {
                me.invalidNewPassword1 = true;
                me.invalidNewPassword1Reason = "סיסמא חדשה חייבת להיות שונה מסיסמא נוכחית";
                return;
            }
            var newPassword1Length = me.changePassword.new_password.length;
            if (newPassword1Length < 7) {
                me.invalidNewPassword1Reason = "חובה לפחות 7 תווים";
                me.invalidNewPassword1 = true;
                return;
            }
            var isOnlyNumeric = /^\d+$/.test(me.changePassword.new_password);
            if (isOnlyNumeric) {
                me.invalidNewPassword1Reason = "חובה לפחות אות אחת";
                me.invalidNewPassword1 = true;
                return;
            }
            var isOnlyAlpha = /^[A-Za-z]+$/.test(me.changePassword.new_password);
            if (isOnlyAlpha) {
                me.invalidNewPassword1Reason = "חובה לפחות ספרה אחת";
                me.invalidNewPassword1 = true;
                return;
            }
            if (me.changePassword.new_password != me.changePassword.new_password_2) {
                me.invalidNewPassword2 = true;
                return;
            }
            var changePasswordRequest = {
                // Init UiRequestBase
                name: "handlePassword",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                // Set MessageRequest
                current_password: me.changePassword.current_password,
                new_password: me.changePassword.new_password,
                isResetPasswordMode: false,
                userId: me.authService.getUserId()
            };
            me.handleRequest("/api/Profile/UpdatePassword", changePasswordRequest).then(function (res) {
                me.applyChanges(function () {
                    me.saveResult = "סיסמה שונתה בהצלחה";
                    me.passwordWindow.data("kendoWindow").close();
                });
            }).fail(function (err) {
                me.applyChanges(function () {
                    switch (err.errorCode) {
                        case Danel.ErrorCode.PasswordAlreadyInHistory:
                            me.saveResult = "יש לבחור סיסמה שונה מסיסמאות קודמות";
                            break;
                        case Danel.ErrorCode.InternalServerError:
                            me.saveResult = "תקלה - אנא נסו שנית";
                            break;
                        case Danel.ErrorCode.PreviousPasswordIncncorrect:
                            me.saveResult = "סיסמה קודמת אינה תקנית";
                            break;
                    }
                });
                me.$log.log("Error in ProfileIndexCtrl in handlePassword - Error Message:" + err.internalMessage);
            });
            me.saveStatusWindow.data("kendoWindow").center().open();
            //me.profileStore.updatePassword(me.changePassword).then((res) => {
            //    me.applyChanges(() => {
            //        me.saveResult = res;
            //        me.saveStatusWindow.data("kendoWindow").open();
            //    });
        };
        ProfileIndexCtrl.prototype.openPasswordWindow = function () {
            var me = this;
            me.passwordWindow.data("kendoWindow").center().open();
            me.changePassword = new Danel.ChangePassword();
            me.invalidCurrentPassword = false;
            me.invalidNewPassword2 = false;
            me.invalidNewPassword1 = false;
            me.noCharsPassword1 = false;
            me.noDigitsPassword1 = false;
            me.invalidNewPassword1Reason = undefined;
        };
        ProfileIndexCtrl.prototype.cancelPass = function () {
            var me = this;
            me.passwordWindow.data("kendoWindow").close();
        };
        ProfileIndexCtrl.prototype.save = function () {
            var me = this;
            if (!me.message.email)
                me.invalidEmail = true;
            if (!me.message.address)
                me.invalidAddress = true;
            if (!me.message.phone)
                me.invalidPhone = true;
            if (me.invalidEmail || me.invalidAddress || me.invalidPhone)
                return;
            me.saveBtnDisabled = true;
            //me.message.status = "מעדכן...";
            var messageRequest = {
                // Init UiRequestBase
                name: "Update Profile",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                // Set MessageRequest
                address: me.message.address,
                email: me.message.email,
                phone: me.message.phone,
                userID: me.authService.getUserId()
            };
            me.handleRequest("/api/Profile/UpdateProfile", messageRequest).then(function (res) {
                me.applyChanges(function () {
                    me.saveResult = res;
                    me.saveStatusWindow.data("kendoWindow").center().open();
                });
            }).fail(function (err) { me.$log.log("Error in ProfileIndexCtrl in save - Error Message:" + err.InternalMessage); });
            //me.profileStore.updateProfile(me.message).then((res) => {
            //    me.applyChanges(() => {
            //        me.saveResult = res;
            //        me.saveStatusWindow.data("kendoWindow").open();
            //    });
            //});
        };
        ProfileIndexCtrl.prototype.onDispose = function () {
            var me = this;
            _super.prototype.onDispose.call(this);
        };
        ProfileIndexCtrl.prototype.closeStatusWindow = function () {
            var me = this;
            me.saveStatusWindow.data("kendoWindow").close();
            //location.reload();
        };
        return ProfileIndexCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("ProfileIndexCtrl", [
        "$scope",
        ProfileIndexCtrl,
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=ProfileIndexCtrl.js.map