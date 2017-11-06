/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var AuthLoginCtrl = (function (_super) {
        __extends(AuthLoginCtrl, _super);
        function AuthLoginCtrl($scope, $state, $timeout) {
            var _this = _super.call(this, "AuthLoginCtrl", $scope) || this;
            _this.isActiveWebSite = Danel.ActiveWebSiteState.pending;
            var me = _this;
            var v = me.parametersService.GetDanelParameter(Danel.WebParameter.IsActiveWebSite).toLowerCase();
            if (v == 'true')
                _this.isActiveWebSite = Danel.ActiveWebSiteState.activated;
            else
                _this.isActiveWebSite = Danel.ActiveWebSiteState.disabled;
            me.information = me.sce.trustAsHtml('');
            //var req: parameterRequest = <parameterRequest>{ webParameter: WebParameter.WebsiteMainColor };
            //me.httpService.POST('/api/Parameters/GetParameter', req).then((res: Parameters) => {
            //    me.applyChanges(() => {
            //        $(".main-back-color").css("background-color",res.ParameterItems[0].Value)
            //        $(".main-fore-color").css("color",res.ParameterItems[0].Value)
            //    });
            //}).fail((err) => {
            //    me.$log.log("Error in getsiteTitle in DanelTopHeaderCtrl - Error Message:" + err.InternalMessage);
            //})
            //me.parametersService = parametersService;
            //me.contactTypeMap = me.parametersService.getParametersMap("ContactTypeMap", "PersistentMap");
            //me.contactTypeMap["m_subject"] = "בקשת הצטרפות לשירות";
            //me.authService = authService;
            me.$state = $state;
            me.isSendBtnDisabled = false;
            //me.contactStore = contactStore;
            me.message = new Danel.Message();
            me.message.status = "שליחה";
            me.datePicker = $("#datepicker");
            me.contactWindow = $("#contactWindow");
            me.forgotPasswordWindow = $("#forgot-password-window");
            me.resetPasswordWindow = $("#reset-password-window");
            me.newRegisterWindow = $("#new-register-window");
            me.saveStatusWindow = $("#statusWindow");
            me.codeInjectionWindow = $("#codeInjectionWindow");
            if (!me.forgotPasswordWindow.data("kendoWindow")) {
                me.forgotPasswordWindow.kendoWindow({
                    draggable: false,
                    modal: true,
                    width: 550,
                    actions: [
                        "Close"
                    ],
                    visible: false,
                });
            }
            if (!me.forgotPasswordWindow.data("kendoWindow")) {
                me.forgotPasswordWindow.kendoWindow({
                    draggable: false,
                    modal: true,
                    width: 550,
                    actions: [
                        "Close"
                    ],
                    visible: false,
                });
            }
            if (!me.newRegisterWindow.data("kendoWindow")) {
                me.newRegisterWindow.kendoWindow({
                    draggable: false,
                    modal: true,
                    width: 550,
                    actions: [
                        "Close"
                    ],
                    visible: false
                });
            }
            if (!me.resetPasswordWindow.data("kendoWindow")) {
                me.resetPasswordWindow.kendoWindow({
                    draggable: false,
                    modal: true,
                    width: 750,
                    actions: [
                        "Close"
                    ],
                    visible: false,
                    title: "שינוי סיסמה"
                });
            }
            if (!me.contactWindow.data("kendoWindow")) {
                me.contactWindow.kendoWindow({
                    draggable: false,
                    modal: true,
                    minWidth: 250,
                    actions: [
                        "Close"
                    ],
                    visible: false
                });
            }
            if (!me.datePicker.data("kendoDatePicker")) {
                me.datePicker.kendoDatePicker();
            }
            //if (!me.datePicker.data("datePicker")) {
            //    me.datePicker.kendoDatePicker({
            //    });
            //}
            if (!me.saveStatusWindow.data("kendoWindow")) {
                me.saveStatusWindow.kendoWindow({
                    draggable: false,
                    modal: true,
                    minWidth: 160,
                    //width: 200,
                    title: "הודעת מערכת",
                    actions: [
                        "Close"
                    ],
                    visible: false
                });
            }
            if (!me.codeInjectionWindow.data("kendoWindow")) {
                me.codeInjectionWindow.kendoWindow({
                    draggable: false,
                    modal: true,
                    //width: 200,
                    title: "הודעת מערכת",
                    actions: [
                        "Close"
                    ],
                    visible: false
                });
            }
            me.watchData();
            me.CompanyDisplayName = me.parametersService.GetDanelParameter(Danel.WebParameter.CompanyDisplayName);
            me.WebSiteRegistrationType = +me.parametersService.GetDanelParameter(Danel.WebParameter.WebSiteRegistrationType);
            me.WebSiteSendingType = +me.parametersService.GetDanelParameter(Danel.WebParameter.WebSiteSendingType);
            me.displaySigninOptions = me.WebSiteSendingType == (Danel.WebSiteCommunicationOption.Email | Danel.WebSiteCommunicationOption.Phone);
            me.webSiteUrl = me.parametersService.GetDanelParameter(Danel.WebParameter.CompanyWebsiteLink);
            me.device = me.WebSiteSendingType == Danel.WebSiteCommunicationOption.Email ? 'אימייל' : 'טלפון נייד';
            if (me.authService.loginDetails && me.authService.loginDetails.role == "ResetPassword") {
                me.resetPasswordWindow.data("kendoWindow").center().open();
                me.clearInvalids();
                me.enableAllButtons();
            }
            return _this;
        }
        AuthLoginCtrl.prototype.watchData = function () {
            var me = this;
            me.$scope.$watch(function () {
                return me.new_password;
            }, function (newValue, oldValue) {
                if (newValue) {
                    me.invalidNewPassword1 = false;
                    me.new_password_2 = undefined;
                }
                else
                    me.invalidNewPassword1 = true;
            });
            me.$scope.$watch(function () {
                return me.new_password_2;
            }, function (newValue, oldValue) {
                if (newValue != me.new_password) {
                    me.invalidNewPassword2 = true;
                }
                else {
                    me.invalidNewPassword2 = false;
                }
            });
            me.$scope.$watch(function () {
                return me.message.email;
            }, function (newValue, oldValue) {
                if (newValue || newValue == null)
                    me.invalidEmail = false;
                else
                    me.invalidEmail = true;
            });
            me.$scope.$watch(function () {
                return me.message.identityNumber;
            }, function (newValue, oldValue) {
                if (newValue || newValue == null)
                    me.invalidIdentityNumber = false;
                else
                    me.invalidIdentityNumber = true;
            });
            me.$scope.$watch(function () {
                return me.message.senderName;
            }, function (newValue, oldValue) {
                if (newValue || newValue == null)
                    me.invalidSenderName = false;
                else
                    me.invalidSenderName = true;
            });
            me.$scope.$watch(function () {
                return me.codeInjection;
            }, function (newValue, oldValue) {
                if (newValue || newValue == null)
                    me.invalidCodeInjection = false;
                else
                    me.invalidCodeInjection = true;
            });
            me.$scope.$watch(function () {
                return me.message.phone;
            }, function (newValue, oldValue) {
                if (newValue || newValue == null)
                    me.invalidPhone = false;
                else
                    me.invalidPhone = true;
            });
            me.$scope.$watch(function () {
                return me.userCaptcha;
            }, function (newValue, oldValue) {
                if (newValue || newValue == null)
                    me.invalidCaptcha = false;
                else
                    me.invalidCaptcha = true;
            });
            //me.$scope.$watch(function () {
            //    return me.message.content;
            //},
            //    function (newValue: string, oldValue: string) {
            //        if (newValue)
            //            me.invalidContent = false;
            //        else
            //            me.invalidContent = true;
            //    });
        };
        AuthLoginCtrl.prototype.openDatePicker = function () {
            var me = this;
            var win = me.datePicker.data("kendoDatePicker");
            win.open();
        };
        AuthLoginCtrl.prototype.openForgotPasswordWindow = function () {
            var me = this;
            me.message = new Danel.Message();
            me.message.subject = "איפוס סיסמא";
            me.forgotPasswordWindow.data("kendoWindow").center().open();
            me.applyChanges(function () {
                $(".k-window-title").html("שחזור סיסמא");
            });
            me.enableAllButtons();
            me.loadCaptcha();
            me.userCaptcha = null;
            me.clearInvalids();
        };
        AuthLoginCtrl.prototype.openNewRegisterWindow = function () {
            var me = this;
            me.message = new Danel.Message();
            me.message.subject = "הצטרפות לשירות";
            me.newRegisterWindow.data("kendoWindow").center().open();
            me.applyChanges(function () {
                $(".k-window-title").html("הצטרפות לשירות");
            });
            me.enableAllButtons();
            var win = me.datePicker.data("kendoDatePicker");
            win.value(null);
            me.message.birthDate = null;
            me.loadCaptcha();
            me.clearInvalids();
        };
        AuthLoginCtrl.prototype.loadCaptcha = function () {
            var me = this;
            var a = Math.ceil(Math.random() * 9) + '';
            var b = Math.ceil(Math.random() * 9) + '';
            var c = Math.ceil(Math.random() * 9) + '';
            var d = Math.ceil(Math.random() * 9) + '';
            var e = Math.ceil(Math.random() * 9) + '';
            var code = a + b + c + d + e;
            me.txtCaptcha = code;
            me.txtCaptchaDiv = code;
            me.userCaptcha = null;
        };
        AuthLoginCtrl.prototype.openForgotUserNameWindow = function () {
            var me = this;
            me.message.subject = "שחזור שם משתמש";
            me.contactWindow.data("kendoWindow").center().open();
            me.applyChanges(function () {
                $(".k-window-title").html("שחזור שם משתמש");
            });
            me.enableAllButtons();
            me.applyChanges(function () { me.forgotIDMsg = me.parametersService.GetDanelParameter(Danel.WebParameter.ForgotIDMsg); });
        };
        AuthLoginCtrl.prototype.closeStatusWindow = function () {
            var me = this;
            me.saveStatusWindow.data("kendoWindow").close();
            if (me.closeAllWindows) {
                me.closeAllWindows = false;
                me.closeWindows();
            }
        };
        AuthLoginCtrl.prototype.closeWindows = function () {
            var me = this;
            me.saveStatusWindow.data("kendoWindow").close();
            //  me.contactWindow.data("kendoWindow").close();
            me.forgotPasswordWindow.data("kendoWindow").close();
            me.resetPasswordWindow.data("kendoWindow").close();
            me.newRegisterWindow.data("kendoWindow").close();
        };
        AuthLoginCtrl.prototype.enableAllButtons = function () {
            var me = this;
            me.isResetPasswordBtnDisabled = false;
            me.isSendBtnDisabled = false;
            me.isSendForgotPasswordBtnDisabled = false;
        };
        AuthLoginCtrl.prototype.onKeyPress = function (key) {
            var me = this;
            if (key.keyCode == 13) {
                me.login();
            }
        };
        AuthLoginCtrl.prototype.onCodeInjectionKeyPress = function (key) {
            var me = this;
            if (key.keyCode == 13) {
                me.checkCodeInjection();
            }
        };
        AuthLoginCtrl.prototype.onForgotPasswordKeyPress = function (key) {
            var me = this;
            if (key.keyCode == 13) {
                me.sendForgotPassword();
            }
        };
        AuthLoginCtrl.prototype.checkCodeInjection = function () {
            var me = this;
            if (!me.codeInjection) {
                me.invalidCodeInjection = true;
                return;
            }
            //var url = me.webSiteUrl + "/api/Auth/ResetPassword/" + me.codeInjection;
            //window.location.href = url;
            var req = { token: me.codeInjection, entityList: null, name: '', role: '' };
            me.handleRequest("/api/Auth/CheckCodeInjection", req, false).then(function (res) {
                me.applyChanges(function () {
                    window.location.reload();
                });
            }).fail(function (err) {
                me.$log.log("Error in ProfileIndexCtrl in handlePassword - Error Message:" + err.internalMessage);
                me.applyChanges(function () {
                    switch (err.errorCode) {
                        case Danel.ErrorCode.DuplicatedPassword:
                            me.$scope.saveResult = "סיסמא נוכחית זהה לסיסמא חדשה";
                            break;
                        case Danel.ErrorCode.PreviousPasswordIncncorrect:
                            me.$scope.saveResult = "סיסמא קודמת אינה תקנית";
                            break;
                        case Danel.ErrorCode.InternalServerError:
                            me.$scope.saveResult = "בעיה בעדכון נתונים - אנא נסו  שנית";
                            break;
                        case Danel.ErrorCode.PasswordAlreadyInHistory:
                            me.$scope.saveResult = "יש לבחור סיסמא שונה מסיסמאות קודמות";
                            break;
                        case Danel.ErrorCode.InvalidTempPassword:
                            me.$scope.saveResult = "סיסמה זמנית אינה תקינה";
                            break;
                    }
                });
                me.saveStatusWindow.data("kendoWindow").center().open();
                me.enableAllButtons();
                me.clearInvalids();
                //me.authService.logout();
            });
        };
        AuthLoginCtrl.prototype.clearInvalids = function () {
            var me = this;
            me.invalidContent = false;
            me.invalidEmail = false;
            me.invalidIdentityNumber = false;
            me.invalidSenderName = false;
            me.invalidPhone = false;
            me.invalidNewPassword1 = false;
            me.invalidNewPassword2 = false;
            me.invalidCaptcha = false;
            me.invalidCaptcha = false;
        };
        AuthLoginCtrl.prototype.resetPassword = function () {
            var me = this;
            if (!me.new_password) {
                me.invalidNewPassword1Reason = "נתון חובה";
                me.invalidNewPassword1 = true;
                return;
            }
            var newPassword1Length = me.new_password.length;
            if (newPassword1Length < 7) {
                me.invalidNewPassword1Reason = "חובה לפחות 7 תווים";
                me.invalidNewPassword1 = true;
                return;
            }
            var isOnlyNumeric = /^\d+$/.test(me.new_password);
            if (isOnlyNumeric) {
                me.invalidNewPassword1Reason = "חובה לפחות אות אחת";
                me.invalidNewPassword1 = true;
                return;
            }
            var isOnlyAlpha = /^[A-Za-z]+$/.test(me.new_password);
            if (isOnlyAlpha) {
                me.invalidNewPassword1Reason = "חובה לפחות ספרה אחת";
                me.invalidNewPassword1 = true;
                return;
            }
            if (me.new_password != me.new_password_2) {
                me.invalidNewPassword2 = true;
                return;
            }
            me.isResetPasswordBtnDisabled = true;
            var changePasswordRequest = {
                // Init UiRequestBase
                name: "handlePassword",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                // Set MessageRequest
                current_password: "blabla",
                new_password: me.new_password,
                isResetPasswordMode: true,
                userId: me.authService.getUserId()
            };
            me.handleRequest("/api/Profile/UpdatePassword", changePasswordRequest).then(function (res) {
                me.applyChanges(function () {
                    me.$scope.saveResult = "סיסמא שונתה בהצלחה";
                    me.saveStatusWindow.data("kendoWindow").center().open();
                    me.enableAllButtons();
                    me.clearInvalids();
                    me.authService.logout();
                    me.closeAllWindows = true;
                });
            }).fail(function (err) {
                me.$log.log("Error in ProfileIndexCtrl in handlePassword - Error Message:" + err.internalMessage);
                me.applyChanges(function () {
                    switch (err.errorCode) {
                        case Danel.ErrorCode.DuplicatedPassword:
                            me.$scope.saveResult = "סיסמא נוכחית זהה לסיסמא חדשה";
                            break;
                        case Danel.ErrorCode.PreviousPasswordIncncorrect:
                            me.$scope.saveResult = "סיסמא קודמת אינה תקנית";
                            break;
                        case Danel.ErrorCode.InternalServerError:
                            me.$scope.saveResult = "בעיה בעדכון נתונים - אנא נסו  שנית";
                            break;
                        case Danel.ErrorCode.PasswordAlreadyInHistory:
                            me.$scope.saveResult = "יש לבחור סיסמא שונה מסיסמאות קודמות";
                            break;
                        case Danel.ErrorCode.MailSendFailure:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case Danel.ErrorCode.NoValidSMSProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case Danel.ErrorCode.EmptyProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        default:
                            me.$scope.saveResult = "תקלה - אנא נסה שנית מאוחר יותר";
                            break;
                    }
                });
                me.saveStatusWindow.data("kendoWindow").center().open();
                me.enableAllButtons();
                me.clearInvalids();
                //me.authService.logout();
            });
        };
        AuthLoginCtrl.prototype.sendForgotPassword = function () {
            var me = this;
            if (!me.message.senderName)
                me.invalidSenderName = true;
            if (me.userCaptcha != me.txtCaptcha)
                me.invalidCaptcha = true;
            if (me.invalidSenderName || me.invalidCaptcha)
                return;
            me.isSendForgotPasswordBtnDisabled = true;
            var messageRequest = {
                // Init UiRequestBase
                name: "ResetPassword",
                // Set MessageRequest
                senderName: me.message.senderName,
                webSiteSigningOptions: me.WebSiteSendingType
            };
            me.handleRequest("/api/Contact/ResetPassword", messageRequest, false).then(function (res) {
                me.applyChanges(function () {
                    switch (me.WebSiteSendingType) {
                        case Danel.WebSiteCommunicationOption.Email:
                            me.$scope.saveResult = 'הודעה נשלחה בהצלחה למייל ' + res.email;
                            me.saveStatusWindow.data("kendoWindow").center().open();
                            break;
                        case Danel.WebSiteCommunicationOption.Phone:
                            me.last3Digits = res.last3Digits;
                            me.currentCode = res.currentCode;
                            me.currenPhone = res.currenPhone;
                            me.codeInjectionWindow.data("kendoWindow").center().open();
                            break;
                    }
                });
            }).fail(function (err) {
                me.$log.log("Error in AuthLoginCtrl in ResetPassword - Error Message:" + err.InternalMessage);
                var error = err.errorCode;
                me.applyChanges(function () {
                    switch (error) {
                        case Danel.ErrorCode.AlreadyRegisteredIdentityNumber:
                            me.$scope.saveResult = "\u05E7\u05D9\u05D9\u05DD \u05DE\u05E0\u05D5\u05D9 \u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8 \u05D1\u05E2\u05DC \u05DE\u05E1\u05E4\u05E8 \u05EA.\u05D6 \u05D6\u05D4\u05D4 \u05E0\u05D0 \u05DC\u05D1\u05E6\u05E2 \u05EA\u05D4\u05DC\u05D9\u05DA \u05E9\u05D7\u05D6\u05D5\u05E8 \u05E1\u05D9\u05E1\u05DE\u05D0 \u05D0\u05D5 \u05DC\u05D9\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8 \u05E2\u05DD " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.NoSuchIdentityNumber:
                            me.$scope.saveResult = "תעודת הזהות שהוקשה לא זוהתה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.NoSuchPhone:
                            me.$scope.saveResult = "מספר הטלפון לא זוהה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.AlreadyRegisteredPhone:
                            me.$scope.saveResult = "\u05E7\u05D9\u05D9\u05DD \u05DE\u05E0\u05D5\u05D9 \u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8 \u05D1\u05E2\u05DC \u05DE\u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05DF \u05D6\u05D4\u05D4 \u05E0\u05D0 \u05DC\u05D1\u05E6\u05E2 \u05EA\u05D4\u05DC\u05D9\u05DA \u05E9\u05D7\u05D6\u05D5\u05E8 \u05E1\u05D9\u05E1\u05DE\u05D0 \u05D0\u05D5 \u05DC\u05D9\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8 \u05E2\u05DD " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.invalidUserName:
                            me.$scope.saveResult = "שם משתמש אינו תקין";
                            break;
                        case Danel.ErrorCode.UnRecongnisedEmail:
                            me.$scope.saveResult = "אי מייל אינו תקין";
                            break;
                        case Danel.ErrorCode.MailSendFailure:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case Danel.ErrorCode.NoValidSMSProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case Danel.ErrorCode.EmptyProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        default:
                            me.$scope.saveResult = "תקלה - אנא נסה שנית מאוחר יותר";
                            break;
                    }
                    me.saveStatusWindow.data("kendoWindow").center().open();
                });
            });
            me.enableAllButtons();
            me.clearInvalids();
        };
        AuthLoginCtrl.prototype.resendCode = function () {
            var me = this;
            var resendCodeRequest = { currenPhone: me.currenPhone, currentCode: me.currentCode, entityList: null, name: '', role: '', token: '' };
            me.handleRequest("/api/Contact/ResendCodeToUser", resendCodeRequest, false).then(function () {
                me.applyChanges(function () {
                    //me.codeInjectionWindow.data("kendoWindow").center().open();
                    me.saveStatusWindow.data("kendoWindow").width = 150;
                    me.$scope.saveResult = 'נשלח בהצלחה';
                    me.saveStatusWindow.data("kendoWindow").center().open();
                });
            }).fail(function (err) {
                me.$log.log("Error in AuthLoginCtrl in resendCode - Error Message:" + err.internalMessage);
                me.applyChanges(function () {
                    var error = err.errorCode;
                    switch (error) {
                        case Danel.ErrorCode.AlreadyRegisteredIdentityNumber:
                            me.$scope.saveResult = "\u05E7\u05D9\u05D9\u05DD \u05DE\u05E0\u05D5\u05D9 \u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8 \u05D1\u05E2\u05DC \u05DE\u05E1\u05E4\u05E8 \u05EA.\u05D6 \u05D6\u05D4\u05D4 \u05E0\u05D0 \u05DC\u05D1\u05E6\u05E2 \u05EA\u05D4\u05DC\u05D9\u05DA \u05E9\u05D7\u05D6\u05D5\u05E8 \u05E1\u05D9\u05E1\u05DE\u05D0 \u05D0\u05D5 \u05DC\u05D9\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8 \u05E2\u05DD " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.NoSuchIdentityNumber:
                            me.$scope.saveResult = "תעודת הזהות שהוקשה לא זוהתה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.NoSuchPhone:
                            me.$scope.saveResult = "מספר הטלפון לא זוהה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.AlreadyRegisteredPhone:
                            me.$scope.saveResult = "\u05E7\u05D9\u05D9\u05DD \u05DE\u05E0\u05D5\u05D9 \u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8 \u05D1\u05E2\u05DC \u05DE\u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05DF \u05D6\u05D4\u05D4 \u05E0\u05D0 \u05DC\u05D1\u05E6\u05E2 \u05EA\u05D4\u05DC\u05D9\u05DA \u05E9\u05D7\u05D6\u05D5\u05E8 \u05E1\u05D9\u05E1\u05DE\u05D0 \u05D0\u05D5 \u05DC\u05D9\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8 \u05E2\u05DD " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.MailSendFailure:
                            me.$scope.saveResult = "שליחת מייל נכשלה";
                            break;
                        case Danel.ErrorCode.invalidUserName:
                            me.$scope.saveResult = "שם משתמש אינו תקין";
                            break;
                        case Danel.ErrorCode.UnRecongnisedEmail:
                            me.$scope.saveResult = "אי מייל אינו תקין";
                            break;
                        case Danel.ErrorCode.NoValidSMSProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case Danel.ErrorCode.EmptyProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        default:
                            me.$scope.saveResult = "תקלה - אנא נסה שנית מאוחר יותר";
                            break;
                    }
                    me.saveStatusWindow.data("kendoWindow").center().open();
                });
            });
            me.enableAllButtons();
            me.clearInvalids();
        };
        AuthLoginCtrl.prototype.send = function () {
            var me = this;
            var error = false;
            if (!me.message.email)
                me.invalidEmail = true;
            if (!me.message.senderName)
                me.invalidSenderName = true;
            if (!me.message.phone)
                me.invalidPhone = true;
            //if (!me.message.content)
            //    me.invalidContent = true;
            if (me.invalidEmail || me.invalidSenderName || me.invalidPhone)
                return;
            me.isSendBtnDisabled = true;
            var messageRequest = {
                // Init UiRequestBase
                name: "ResetPassword",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                // Set MessageRequest
                senderName: me.message.senderName,
                email: me.message.email,
                phone: me.message.phone,
                subject: me.message.subject,
                content: me.message.content
            };
            me.handleRequest("/api/Contact/sendMessage", messageRequest, false).then(function (res) {
                me.applyChanges(function () {
                    if (res) {
                        me.$scope.saveResult = "הודעה נשלחה בהצלחה";
                        me.saveStatusWindow.data("kendoWindow").center().open();
                        me.enableAllButtons();
                        me.clearInvalids();
                    }
                    else {
                        me.$scope.saveResult = "שליחת הודעה נכשלה";
                        me.saveStatusWindow.data("kendoWindow").center().open();
                        me.enableAllButtons();
                        me.clearInvalids();
                    }
                });
            }).fail(function (err) { me.$log.log("Error in AuthLoginCtrl in send - Error Message:" + err.InternalMessage); });
            //me.contactStore.sendMessage(me.message).then((res) => {
            //    me.applyChanges(() => {
            //        if (res) {
            //            me.message.status = "הודעה נשלחה בהצלחה";
            //        }
            //        else {
            //            me.message.status = "שליחת הודעה נכשלה";
            //        }
            //    });
            //});
        };
        AuthLoginCtrl.prototype.isDangerousCharacter = function (keyCode) {
            console.warn(keyCode);
            return keyCode == 40 || keyCode == 41 || keyCode == 123 || keyCode == 125 || keyCode == 91 || keyCode == 93 || keyCode == 60 || keyCode == 62;
        };
        AuthLoginCtrl.prototype.isSpace = function (keyCode) {
            return keyCode == 32;
        };
        AuthLoginCtrl.prototype.isLetter = function (keyCode) {
            return isNaN(keyCode);
        };
        AuthLoginCtrl.prototype.bla = function ($event) {
            console.warn($event);
        };
        AuthLoginCtrl.prototype.sendNewRegister = function () {
            var me = this;
            var error = false;
            if (!me.message.email)
                me.invalidEmail = true;
            if (!me.message.identityNumber)
                me.invalidIdentityNumber = true;
            if (!me.message.senderName)
                me.invalidSenderName = true;
            if (!me.message.phone)
                me.invalidPhone = true;
            if (me.userCaptcha != me.txtCaptcha)
                me.invalidCaptcha = true;
            //if (!me.message.content)
            //    me.invalidContent = true;
            if (me.invalidEmail || me.invalidIdentityNumber || me.invalidSenderName || me.invalidPhone || me.invalidCaptcha)
                return;
            me.isSendBtnDisabled = true;
            var lowerCaseEmail = me.message.email ? me.message.email.toLowerCase() : '';
            var messageRequest = {
                // Init UiRequestBase
                name: "ResetPassword",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                // Set MessageRequest
                senderName: me.message.senderName,
                email: lowerCaseEmail,
                phone: me.message.phone,
                subject: me.message.subject,
                content: me.message.content,
                identityNumber: me.message.identityNumber,
                webSiteSigningOptions: me.WebSiteSendingType
            };
            me.handleRequest("/api/Contact/SendNewRegister", messageRequest, false).then(function (res) {
                me.applyChanges(function () {
                    //if (res) {
                    var notificationDevice = me.WebSiteSendingType == Danel.WebSiteCommunicationOption.Email ? me.message.email : me.message.phone;
                    me.$scope.saveResult = " סיסמה זמנית נשלחה ל " + notificationDevice;
                    //if (me.WebSiteSendingType == WebSiteCommunicationOption.Phone)
                    //    me.$scope.saveResult += " סיסמתך היא " + res;
                    me.saveStatusWindow.data("kendoWindow").center().open();
                    me.enableAllButtons();
                    me.clearInvalids();
                    me.closeAllWindows = true;
                });
            }).fail(function (err) {
                me.applyChanges(function () {
                    me.$log.log("Error in AuthLoginCtrl in send - Error Message:" + err.internalMessage);
                    var error = err.errorCode;
                    switch (error) {
                        case Danel.ErrorCode.AlreadyRegisteredIdentityNumber:
                            me.$scope.saveResult = "\u05E7\u05D9\u05D9\u05DD \u05DE\u05E0\u05D5\u05D9 \u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8 \u05D1\u05E2\u05DC \u05DE\u05E1\u05E4\u05E8 \u05EA.\u05D6 \u05D6\u05D4\u05D4 \u05E0\u05D0 \u05DC\u05D1\u05E6\u05E2 \u05EA\u05D4\u05DC\u05D9\u05DA \u05E9\u05D7\u05D6\u05D5\u05E8 \u05E1\u05D9\u05E1\u05DE\u05D0 \u05D0\u05D5 \u05DC\u05D9\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8 \u05E2\u05DD " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.AlreadyRegisteredPhone:
                            me.$scope.saveResult = "\u05E7\u05D9\u05D9\u05DD \u05DE\u05E0\u05D5\u05D9 \u05D0\u05D9\u05E0\u05D8\u05E8\u05E0\u05D8 \u05D1\u05E2\u05DC \u05DE\u05E1\u05E4\u05E8 \u05D8\u05DC\u05E4\u05D5\u05DF \u05D6\u05D4\u05D4 \u05E0\u05D0 \u05DC\u05D1\u05E6\u05E2 \u05EA\u05D4\u05DC\u05D9\u05DA \u05E9\u05D7\u05D6\u05D5\u05E8 \u05E1\u05D9\u05E1\u05DE\u05D0 \u05D0\u05D5 \u05DC\u05D9\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8 \u05E2\u05DD " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.NoSuchIdentityNumber:
                            me.$scope.saveResult = "תעודת הזהות שהוקשה לא זוהתה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.NoSuchAccountOwner:
                            me.$scope.saveResult = "אחד הפרטים אינו תואם לרישומים יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.NoSuchPhone:
                            me.$scope.saveResult = "מספר הטלפון לא זוהה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case Danel.ErrorCode.MailSendFailure:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case Danel.ErrorCode.NoValidSMSProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case Danel.ErrorCode.EmptyProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        default:
                            me.$scope.saveResult = "תקלה - אנא נסה שנית מאוחר יותר";
                            break;
                    }
                    me.saveStatusWindow.data("kendoWindow").center().open();
                    me.enableAllButtons();
                    me.clearInvalids();
                });
            });
            //me.contactStore.sendMessage(me.message).then((res) => {
            //    me.applyChanges(() => {
            //        if (res) {
            //            me.message.status = "הודעה נשלחה בהצלחה";
            //        }
            //        else {
            //            me.message.status = "שליחת הודעה נכשלה";
            //        }
            //    });
            //});
        };
        AuthLoginCtrl.prototype.newRegister = function () {
            var me = this;
            //me.recoverName = true;
            me.message.subject = "הצטרפות לשירות";
            me.contactWindow.data("kendoWindow").center().open();
            me.enableAllButtons();
            me.applyChanges(function () {
                $(".k-window-title").html("הצטרפות לשירות");
            });
            me.clearInvalids();
        };
        AuthLoginCtrl.prototype.login = function () {
            var me = this;
            if (!me.validation.isValid()) {
                return;
            }
            me.authService.login(me.userName, me.password, false)
                .then(function (loginRetVal) {
                me.applyChanges(function () {
                    if (loginRetVal.loginDetails.loginResult == "Ok") {
                        if (loginRetVal.loginDetails.role == "ResetPassword") {
                            //me.redirect("/reset_password");                                
                            //me.resetPasswordWindow.data("kendoWindow").center().open();
                            //me.clearInvalids();
                            //me.enableAllButtons();
                            me.redirect("/");
                            return;
                        }
                        if (loginRetVal.loginDetails.role == "WebAdmin") {
                            me.redirect("/admin");
                            return;
                        }
                        if (loginRetVal.loginDetails.role == "AccountOwner" || loginRetVal.loginDetails.role == "ExternalUser") {
                            me.redirect("/dashboard");
                            return;
                        }
                    }
                });
            })
                .fail(function (err) {
                //MessageBox.showError(err);
                me.applyChanges(function () {
                    me.$log.log("Error in AuthLoginCtrl in login - Error Message:" + err.internalMessage);
                    me.$scope.saveResult = err.internalMessage;
                    me.saveStatusWindow.data("kendoWindow").center().open();
                    me.enableAllButtons();
                    me.clearInvalids();
                });
            });
        };
        return AuthLoginCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("AuthLoginCtrl", [
        "$scope",
        "$state",
        "$timeout",
        //"AuthService",
        //"ParametersService",
        //"ContactStore",
        AuthLoginCtrl
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=AuthLoginCtrl.js.map