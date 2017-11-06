/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var ResetPasswordCtrl = (function (_super) {
        __extends(ResetPasswordCtrl, _super);
        function ResetPasswordCtrl($scope) {
            var _this = _super.call(this, "ResetPasswordCtrl", $scope) || this;
            var me = _this;
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
        ResetPasswordCtrl.prototype.watchData = function () {
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
        };
        ResetPasswordCtrl.prototype.update = function () {
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
            var changePasswordRequest = {
                // Init UiRequestBase
                name: "handlePassword",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                // Set MessageRequest
                current_password: "ResetPassword",
                new_password: me.new_password,
                userId: me.authService.getUserId()
            };
            me.handleRequest("/api/Profile/UpdatePassword", changePasswordRequest).then(function (res) {
                me.applyChanges(function () {
                    me.saveResult = res;
                    me.saveStatusWindow.data("kendoWindow").center().open();
                });
            }).fail(function (err) { me.$log.log("Error in ProfileIndexCtrl in handlePassword - Error Message:" + err.InternalMessage); });
        };
        ResetPasswordCtrl.prototype.closeStatusWindow = function () {
            var me = this;
            me.saveStatusWindow.data("kendoWindow").close();
            me.authService.logout();
        };
        return ResetPasswordCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("ResetPasswordCtrl", [
        "$scope",
        ResetPasswordCtrl,
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=ResetPasswordCtrl.js.map