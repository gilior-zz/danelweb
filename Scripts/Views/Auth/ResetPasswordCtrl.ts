/// <reference path="../../typings/angularjs/angular.d.ts" />

module Danel {
    class ResetPasswordCtrl extends DanelCtrl {
        public new_password: string;
        public new_password_2: string;
        public invalidNewPassword1: boolean;
        public invalidNewPassword2: boolean;
        public invalidNewPassword1Reason: string;
        public saveResult: string;
        private saveStatusWindow;
        public saveBtnDisabled: Boolean;
        constructor($scope) {
            super("ResetPasswordCtrl", $scope);
            var me = this;
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
        }


        private watchData(): void {
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
        }
        public update(): void {
            var me = this;
            if (!me.new_password) {
                me.invalidNewPassword1Reason = "נתון חובה";
                me.invalidNewPassword1 = true;
                return;
            }
            var newPassword1Length = me.new_password.length;
            if (newPassword1Length < 6) {
                me.invalidNewPassword1Reason = "חובה לפחות 6 תווים";
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
         
            var changePasswordRequest: ChangePasswordRequest = <ChangePasswordRequest>{

                // Init UiRequestBase
                name: "handlePassword",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],

                // Set MessageRequest
                current_password: "ResetPassword",
                new_password: me.new_password,
                userId: me.authService.getUserId()
            };
            me.handleRequest("/api/Profile/UpdatePassword", changePasswordRequest).then((res) => {
                me.applyChanges(() => {
                    me.saveResult = res;
                    me.saveStatusWindow.data("kendoWindow").center().open();
                });
            }).fail((err) => { me.$log.log("Error in ProfileIndexCtrl in handlePassword - Error Message:" + err.InternalMessage); });

        }
        public closeStatusWindow(): void {
            var me = this;
            me.saveStatusWindow.data("kendoWindow").close();
            me.authService.logout();
        }
    }

    angular.module("Danel").controller("ResetPasswordCtrl",
        [
            "$scope",
            ResetPasswordCtrl,
        ]);
}