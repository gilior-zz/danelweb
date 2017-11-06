/// <reference path="../../typings/angularjs/angular.d.ts" />


module Danel {
    class AuthLoginCtrl extends DanelCtrl {
        isActiveWebSite: ActiveWebSiteState = ActiveWebSiteState.pending;
        closeAllWindows: boolean;
        userName;
        password;
        showPassword: boolean;
        $state;
        public message: Message;
        //private parametersService: ParametersService;
        private contactTypeMap;
        private parameterMap;
        codeInjection: string;
        public recoverName: boolean;
        private contactWindow;
        private forgotPasswordWindow;
        private datePicker;
        private resetPasswordWindow;
        private newRegisterWindow;
        device: string;
        private adminMap;
        //public contactStore: ContactStore;
        public isSendBtnDisabled: boolean;
        public invalidSenderName: boolean;
        public invalidContent: boolean;
        public invalidEmail: boolean;
        public invalidIdentityNumber: boolean;
        public invalidForgottenIdentityNumber: boolean;
        public invalidPhone: boolean;
        public isSendForgotPasswordBtnDisabled: boolean;
        public saveResult: string;
        private saveStatusWindow;
        private codeInjectionWindow;
        private resetPasswordReason: string;
        public invalidNewPassword1Reason: string;
        public isResetPasswordBtnDisabled: boolean;
        public new_password: string;
        public invalidCodeInjection: boolean;
        public new_password_2: string;
        public invalidNewPassword1: boolean;
        public invalidNewPassword2: boolean;
        public WebSiteSendingType: WebSiteCommunicationOption;
        public WebSiteRegistrationType: WebSiteCommunicationOption;
        public last3Digits: string;
        currentCode: string;
        currenPhone: string;
        public displaySigninOptions: boolean;
        information: string;
        webSiteUrl: string;
        CompanyDisplayName: string;
        txtCaptcha: string;
        txtCaptchaDiv: string;
        userCaptcha: string;
        forgotIDMsg: string;

        invalidCaptcha: boolean;
        invalidForgottenCaptcha: boolean;
        constructor($scope, $state, $timeout) {
            super("AuthLoginCtrl", $scope);
            var me = this;
            var v = me.parametersService.GetDanelParameter(WebParameter.IsActiveWebSite).toLowerCase();
            if (v == 'true')
                this.isActiveWebSite = ActiveWebSiteState.activated;
            else
                this.isActiveWebSite = ActiveWebSiteState.disabled;


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
            me.message = new Message();
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

            me.CompanyDisplayName = me.parametersService.GetDanelParameter(WebParameter.CompanyDisplayName);
            me.WebSiteRegistrationType = <WebSiteCommunicationOption>+ me.parametersService.GetDanelParameter(WebParameter.WebSiteRegistrationType);
            me.WebSiteSendingType = <WebSiteCommunicationOption>+me.parametersService.GetDanelParameter(WebParameter.WebSiteSendingType);
            me.displaySigninOptions = me.WebSiteSendingType == (WebSiteCommunicationOption.Email | WebSiteCommunicationOption.Phone);
            me.webSiteUrl = me.parametersService.GetDanelParameter(WebParameter.CompanyWebsiteLink);
            me.device = me.WebSiteSendingType == WebSiteCommunicationOption.Email ? 'אימייל' : 'טלפון נייד';


            if (me.authService.loginDetails && me.authService.loginDetails.role == "ResetPassword") {
                me.resetPasswordWindow.data("kendoWindow").center().open();
                me.clearInvalids();
                me.enableAllButtons();
            }



        }




        public watchData(): void {
            var me = this;
            me.$scope.$watch(function () {
                return me.new_password;
            },
                function (newValue: string, oldValue: string) {
                    if (newValue) {
                        me.invalidNewPassword1 = false;
                        me.new_password_2 = undefined;
                    }
                    else
                        me.invalidNewPassword1 = true;
                });
            me.$scope.$watch(function () {
                return me.new_password_2;
            },
                function (newValue: string, oldValue: string) {
                    if (newValue != me.new_password) {
                        me.invalidNewPassword2 = true;
                    }
                    else {
                        me.invalidNewPassword2 = false;
                    }
                });
            me.$scope.$watch(function () {
                return me.message.email;
            },
                function (newValue: string, oldValue: string) {
                    if (newValue || newValue == null)
                        me.invalidEmail = false;
                    else
                        me.invalidEmail = true;

                });
            me.$scope.$watch(function () {
                return me.message.identityNumber;
            },
                function (newValue: string, oldValue: string) {
                    if (newValue || newValue == null)
                        me.invalidIdentityNumber = false;
                    else
                        me.invalidIdentityNumber = true;

                });
            me.$scope.$watch(function () {
                return me.message.senderName;
            },
                function (newValue: string, oldValue: string) {
                    if (newValue || newValue == null)
                        me.invalidSenderName = false;
                    else
                        me.invalidSenderName = true;

                });

            me.$scope.$watch(function () {
                return me.codeInjection;
            },
                function (newValue: string, oldValue: string) {
                    if (newValue || newValue == null)
                        me.invalidCodeInjection = false;
                    else
                        me.invalidCodeInjection = true;

                });
            me.$scope.$watch(function () {
                return me.message.phone;
            },
                function (newValue: string, oldValue: string) {
                    if (newValue || newValue == null)
                        me.invalidPhone = false;
                    else
                        me.invalidPhone = true;

                });

            me.$scope.$watch(function () {
                return me.userCaptcha;
            },
                function (newValue: string, oldValue: string) {
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

        }

        public openDatePicker(): void {
            var me = this;
            var win = <kendo.ui.DatePicker>me.datePicker.data("kendoDatePicker")
            win.open();
        }

        public openForgotPasswordWindow(): void {
            var me = this;
            me.message = new Message();
            me.message.subject = "איפוס סיסמא";
            me.forgotPasswordWindow.data("kendoWindow").center().open();
            me.applyChanges(() => {
                $(".k-window-title").html("שחזור סיסמא")
            });

            me.enableAllButtons();
            me.loadCaptcha();
            me.userCaptcha = null;
            me.clearInvalids();
        }

        public openNewRegisterWindow(): void {
            var me = this;
            me.message = new Message();
            me.message.subject = "הצטרפות לשירות";
            me.newRegisterWindow.data("kendoWindow").center().open();
            me.applyChanges(() => {
                $(".k-window-title").html("הצטרפות לשירות")
            });

            me.enableAllButtons();
            var win = <kendo.ui.DatePicker>me.datePicker.data("kendoDatePicker")
            win.value(null);
            me.message.birthDate = null;
            me.loadCaptcha();
            me.clearInvalids();
        }

        private loadCaptcha(): void {
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
        }

        public openForgotUserNameWindow(): void {
            var me = this;
            me.message.subject = "שחזור שם משתמש";
            me.contactWindow.data("kendoWindow").center().open();
            me.applyChanges(() => {
                $(".k-window-title").html("שחזור שם משתמש")
            });
            me.enableAllButtons();

            me.applyChanges(() => { me.forgotIDMsg = me.parametersService.GetDanelParameter(WebParameter.ForgotIDMsg); });




        }

        public closeStatusWindow(): void {
            var me = this;
            me.saveStatusWindow.data("kendoWindow").close();
            if (me.closeAllWindows) {
                me.closeAllWindows = false;
                me.closeWindows();
            }


        }

        public closeWindows(): void {
            var me = this;
            me.saveStatusWindow.data("kendoWindow").close();
            //  me.contactWindow.data("kendoWindow").close();
            me.forgotPasswordWindow.data("kendoWindow").close();
            me.resetPasswordWindow.data("kendoWindow").close();
            me.newRegisterWindow.data("kendoWindow").close();
        }

        private enableAllButtons(): void {
            var me = this;
            me.isResetPasswordBtnDisabled = false;
            me.isSendBtnDisabled = false;
            me.isSendForgotPasswordBtnDisabled = false;
        }

        onKeyPress(key: JQueryEventObject): void {
            var me = this;
            if (key.keyCode == 13) {
                me.login();
            }
        }

        onCodeInjectionKeyPress(key: JQueryEventObject): void {
            var me = this;
            if (key.keyCode == 13) {

                me.checkCodeInjection();
            }
        }

        onForgotPasswordKeyPress(key: JQueryEventObject): void {
            var me = this;
            if (key.keyCode == 13) {
                me.sendForgotPassword();
            }
        }





        public checkCodeInjection(): void {
            var me = this;
            if (!me.codeInjection) {
                me.invalidCodeInjection = true;
                return;
            }

            //var url = me.webSiteUrl + "/api/Auth/ResetPassword/" + me.codeInjection;
            //window.location.href = url;

            var req: EmptyRequest = { token: me.codeInjection, entityList: null, name: '', role: '' };
            me.handleRequest("/api/Auth/CheckCodeInjection", req, false).then((res) => {
                me.applyChanges(() => {
                    window.location.reload();
                });
            }).fail((err: DanelError) => {
                me.$log.log("Error in ProfileIndexCtrl in handlePassword - Error Message:" + err.internalMessage);
                me.applyChanges(() => {
                    switch (err.errorCode) {

                        case ErrorCode.DuplicatedPassword:
                            me.$scope.saveResult = "סיסמא נוכחית זהה לסיסמא חדשה";
                            break;
                        case ErrorCode.PreviousPasswordIncncorrect:
                            me.$scope.saveResult = "סיסמא קודמת אינה תקנית";
                            break;
                        case ErrorCode.InternalServerError:
                            me.$scope.saveResult = "בעיה בעדכון נתונים - אנא נסו  שנית";
                            break;
                        case ErrorCode.PasswordAlreadyInHistory:
                            me.$scope.saveResult = "יש לבחור סיסמא שונה מסיסמאות קודמות";
                            break;
                        case ErrorCode.InvalidTempPassword:
                            me.$scope.saveResult = "סיסמה זמנית אינה תקינה";
                            break;
                    }
                });
                me.saveStatusWindow.data("kendoWindow").center().open();
                me.enableAllButtons();
                me.clearInvalids();
                //me.authService.logout();

            });

        }



        private clearInvalids(): void {
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
        }

        public resetPassword(): void {
            var me = this;
            if (!me.new_password) {
                me.invalidNewPassword1Reason = "נתון חובה";
                me.invalidNewPassword1 = true;
                return
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
            var changePasswordRequest: ChangePasswordRequest = <ChangePasswordRequest>{

                // Init UiRequestBase
                name: "handlePassword",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],

                // Set MessageRequest
                current_password: "blabla",
                new_password: me.new_password,
                isResetPasswordMode: true,
                userId: me.authService.getUserId()
            };
            me.handleRequest("/api/Profile/UpdatePassword", changePasswordRequest).then((res: number) => {
                me.applyChanges(() => {
                    me.$scope.saveResult = "סיסמא שונתה בהצלחה";
                    me.saveStatusWindow.data("kendoWindow").center().open();
                    me.enableAllButtons();
                    me.clearInvalids();
                    me.authService.logout();
                    me.closeAllWindows = true;
                });
            }).fail((err: DanelError) => {
                me.$log.log("Error in ProfileIndexCtrl in handlePassword - Error Message:" + err.internalMessage);
                me.applyChanges(() => {
                    switch (err.errorCode) {

                        case ErrorCode.DuplicatedPassword:
                            me.$scope.saveResult = "סיסמא נוכחית זהה לסיסמא חדשה";
                            break;
                        case ErrorCode.PreviousPasswordIncncorrect:
                            me.$scope.saveResult = "סיסמא קודמת אינה תקנית";
                            break;
                        case ErrorCode.InternalServerError:
                            me.$scope.saveResult = "בעיה בעדכון נתונים - אנא נסו  שנית";
                            break;
                        case ErrorCode.PasswordAlreadyInHistory:
                            me.$scope.saveResult = "יש לבחור סיסמא שונה מסיסמאות קודמות";
                            break;
                        case ErrorCode.MailSendFailure:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case ErrorCode.NoValidSMSProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case ErrorCode.EmptyProvider:
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

        }

        public sendForgotPassword(): void {
            var me = this;
            if (!me.message.senderName)
                me.invalidSenderName = true;
            if (me.userCaptcha != me.txtCaptcha)
                me.invalidCaptcha = true;
            if (me.invalidSenderName || me.invalidCaptcha)
                return;
            me.isSendForgotPasswordBtnDisabled = true;

            var messageRequest: MessageRequest = <MessageRequest>{

                // Init UiRequestBase
                name: "ResetPassword",
                // Set MessageRequest
                senderName: me.message.senderName,
                webSiteSigningOptions: me.WebSiteSendingType

            };
            me.handleRequest("/api/Contact/ResetPassword", messageRequest, false).then((res: ResetPasswordReponse) => {
                me.applyChanges(() => {
                    switch (me.WebSiteSendingType) {
                        case WebSiteCommunicationOption.Email:
                            me.$scope.saveResult = 'הודעה נשלחה בהצלחה למייל ' + res.email;
                            me.saveStatusWindow.data("kendoWindow").center().open();
                            break;
                        case WebSiteCommunicationOption.Phone:
                            me.last3Digits = res.last3Digits;
                            me.currentCode = res.currentCode;
                            me.currenPhone = res.currenPhone;
                            me.codeInjectionWindow.data("kendoWindow").center().open();
                            break;
                    }

                });
            }).fail((err) => {
                me.$log.log("Error in AuthLoginCtrl in ResetPassword - Error Message:" + err.InternalMessage);
                var error = <ErrorCode>err.errorCode;
                me.applyChanges(() => {
                    switch (error) {
                        case ErrorCode.AlreadyRegisteredIdentityNumber:
                            me.$scope.saveResult = `קיים מנוי אינטרנט בעל מספר ת.ז זהה נא לבצע תהליך שחזור סיסמא או ליצור קשר עם ${me.CompanyDisplayName}`;
                            break;
                        case ErrorCode.NoSuchIdentityNumber:
                            me.$scope.saveResult = "תעודת הזהות שהוקשה לא זוהתה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case ErrorCode.NoSuchPhone:
                            me.$scope.saveResult = "מספר הטלפון לא זוהה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case ErrorCode.AlreadyRegisteredPhone:
                            me.$scope.saveResult = `קיים מנוי אינטרנט בעל מספר טלפון זהה נא לבצע תהליך שחזור סיסמא או ליצור קשר עם ${me.CompanyDisplayName}`;
                            break;
                        case ErrorCode.invalidUserName:
                            me.$scope.saveResult = "שם משתמש אינו תקין";
                            break;
                        case ErrorCode.UnRecongnisedEmail:
                            me.$scope.saveResult = "אי מייל אינו תקין";
                            break;
                        case ErrorCode.MailSendFailure:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case ErrorCode.NoValidSMSProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case ErrorCode.EmptyProvider:
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
        }

        public resendCode(): void {
            var me = this;
            var resendCodeRequest: ResendCodeRequest = { currenPhone: me.currenPhone, currentCode: me.currentCode, entityList: null, name: '', role: '', token: '' }
            me.handleRequest("/api/Contact/ResendCodeToUser", resendCodeRequest, false).then(() => {
                me.applyChanges(() => {
                    //me.codeInjectionWindow.data("kendoWindow").center().open();
                    me.saveStatusWindow.data("kendoWindow").width = 150;
                    me.$scope.saveResult = 'נשלח בהצלחה';
                    me.saveStatusWindow.data("kendoWindow").center().open();
                });
            }).fail((err: DanelError) => {
                me.$log.log("Error in AuthLoginCtrl in resendCode - Error Message:" + err.internalMessage);
                me.applyChanges(() => {
                    var error = err.errorCode;
                    switch (error) {
                        case ErrorCode.AlreadyRegisteredIdentityNumber:
                            me.$scope.saveResult = `קיים מנוי אינטרנט בעל מספר ת.ז זהה נא לבצע תהליך שחזור סיסמא או ליצור קשר עם ${me.CompanyDisplayName}`;
                            break;
                        case ErrorCode.NoSuchIdentityNumber:
                            me.$scope.saveResult = "תעודת הזהות שהוקשה לא זוהתה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case ErrorCode.NoSuchPhone:
                            me.$scope.saveResult = "מספר הטלפון לא זוהה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case ErrorCode.AlreadyRegisteredPhone:
                            me.$scope.saveResult = `קיים מנוי אינטרנט בעל מספר טלפון זהה נא לבצע תהליך שחזור סיסמא או ליצור קשר עם ${me.CompanyDisplayName}`;
                            break;
                        case ErrorCode.MailSendFailure:
                            me.$scope.saveResult = "שליחת מייל נכשלה";
                            break;
                        case ErrorCode.invalidUserName:
                            me.$scope.saveResult = "שם משתמש אינו תקין";
                            break;
                        case ErrorCode.UnRecongnisedEmail:
                            me.$scope.saveResult = "אי מייל אינו תקין";
                            break;
                        case ErrorCode.NoValidSMSProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case ErrorCode.EmptyProvider:
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
        }
        public send(): void {
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

            var messageRequest: MessageRequest = <MessageRequest>{

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
            me.handleRequest("/api/Contact/sendMessage", messageRequest, false).then((res) => {
                me.applyChanges(() => {
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
            }).fail((err) => { me.$log.log("Error in AuthLoginCtrl in send - Error Message:" + err.InternalMessage); });

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
        }

        public isDangerousCharacter(keyCode: number): boolean {
            console.warn(keyCode);
            return keyCode == 40 || keyCode == 41 || keyCode == 123 || keyCode == 125 || keyCode == 91 || keyCode == 93 || keyCode == 60 || keyCode == 62;
        }

        public isSpace(keyCode: number): boolean {
            return keyCode == 32;
        }
        public isLetter(keyCode: number): boolean {
            return isNaN(keyCode);
        }

        public bla($event): void {
            console.warn($event);
        }




        public sendNewRegister(): void {
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
            var messageRequest: MessageRequest = <MessageRequest>{

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
            me.handleRequest("/api/Contact/SendNewRegister", messageRequest, false).then((res: string) => {
                me.applyChanges(() => {
                    //if (res) {

                    var notificationDevice: string = me.WebSiteSendingType == WebSiteCommunicationOption.Email ? me.message.email : me.message.phone;
                    me.$scope.saveResult = " סיסמה זמנית נשלחה ל " + notificationDevice;
                    //if (me.WebSiteSendingType == WebSiteCommunicationOption.Phone)
                    //    me.$scope.saveResult += " סיסמתך היא " + res;
                    me.saveStatusWindow.data("kendoWindow").center().open();
                    me.enableAllButtons();
                    me.clearInvalids();
                    me.closeAllWindows = true;
                });
            }).fail((err: DanelError) => {
                me.applyChanges(() => {
                    me.$log.log("Error in AuthLoginCtrl in send - Error Message:" + err.internalMessage);
                    var error = <ErrorCode>err.errorCode;
                    switch (error) {

                        case ErrorCode.AlreadyRegisteredIdentityNumber:
                            me.$scope.saveResult = `קיים מנוי אינטרנט בעל מספר ת.ז זהה נא לבצע תהליך שחזור סיסמא או ליצור קשר עם ${me.CompanyDisplayName}`;
                            break;
                        case ErrorCode.AlreadyRegisteredPhone:
                            me.$scope.saveResult = `קיים מנוי אינטרנט בעל מספר טלפון זהה נא לבצע תהליך שחזור סיסמא או ליצור קשר עם ${me.CompanyDisplayName}`;
                            break;
                        case ErrorCode.NoSuchIdentityNumber:
                            me.$scope.saveResult = "תעודת הזהות שהוקשה לא זוהתה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case ErrorCode.NoSuchAccountOwner:
                            me.$scope.saveResult = "אחד הפרטים אינו תואם לרישומים יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case ErrorCode.NoSuchPhone:
                            me.$scope.saveResult = "מספר הטלפון לא זוהה על ידי המערכת יש ליצור קשר עם " + me.CompanyDisplayName;
                            break;
                        case ErrorCode.MailSendFailure:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case ErrorCode.NoValidSMSProvider:
                            me.$scope.saveResult = err.internalMessage;
                            break;
                        case ErrorCode.EmptyProvider:
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
        }


        public newRegister(): void {
            var me = this;
            //me.recoverName = true;
            me.message.subject = "הצטרפות לשירות";
            me.contactWindow.data("kendoWindow").center().open();
            me.enableAllButtons();

            me.applyChanges(() => {
                $(".k-window-title").html("הצטרפות לשירות")
            });
            me.clearInvalids();
        }

        login() {
            var me = this;

            if (!me.validation.isValid()) {
                return;
            }

            me.authService.login(me.userName, me.password, false)
                .then(function (loginRetVal: LoginResponse) {

                    me.applyChanges(() => {
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
                .fail(err => {
                    //MessageBox.showError(err);
                    me.applyChanges(() => {
                        me.$log.log("Error in AuthLoginCtrl in login - Error Message:" + err.internalMessage);
                        me.$scope.saveResult = err.internalMessage;
                        me.saveStatusWindow.data("kendoWindow").center().open();
                        me.enableAllButtons();
                        me.clearInvalids();
                    });

                });
        }
    }

    angular.module("Danel").controller("AuthLoginCtrl",
        [
            "$scope",
            "$state",
            "$timeout",
            //"AuthService",
            //"ParametersService",
            //"ContactStore",
            AuthLoginCtrl
        ]);
}
