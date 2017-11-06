/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var ContactIndexCtrl = (function (_super) {
        __extends(ContactIndexCtrl, _super);
        function ContactIndexCtrl($scope) {
            var _this = _super.call(this, "ContactIndexCtrl", $scope) || this;
            var me = _this;
            //me.authService = authService;
            //me.contactStore = contactStore;
            me.message = new Danel.MessageRequest();
            me.message.senderName = me.authService.userDetails.name;
            me.message.phone = me.authService.userDetails.phone;
            me.message.email = me.authService.userDetails.email;
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
                        me.isSendBtnDisabled = false;
                    },
                    visible: false
                });
            }
            me.setSubjects();
            me.selectedSubjectID = me.subjects[0].SubjectID;
            me.watchData();
            me.invalidContent = false;
            return _this;
        }
        ContactIndexCtrl.prototype.watchData = function () {
            var me = this;
            me.$scope.$watch(function () {
                return me.message.content;
            }, function (newValue, oldValue) {
                if (newValue)
                    me.invalidContent = false;
                else
                    me.invalidContent = true;
            });
            me.$scope.$watch(function () {
                return me.selectedSubjectID;
            }, function (newValue, oldValue) {
                me.selectedSubjectID = newValue;
                me.message.subject = $.grep(me.subjects, function (e) { return e.SubjectID == me.selectedSubjectID; })[0].SubjectName;
            });
        };
        ContactIndexCtrl.prototype.setSubjects = function () {
            var me = this;
            me.subjects = [];
            var general = { SubjectID: 1, SubjectName: "כללי" };
            var financial = { SubjectID: 2, SubjectName: "מידע פיננסי" };
            var commisions = { SubjectID: 3, SubjectName: "עמלות" };
            var financialproducts = { SubjectID: 4, SubjectName: "מוצרים פיננסיים" };
            me.subjects.push(general);
            me.subjects.push(financial);
            me.subjects.push(commisions);
            me.subjects.push(financialproducts);
        };
        ContactIndexCtrl.prototype.Send = function () {
            var me = this;
            if (!me.message.content)
                me.invalidContent = true;
            if (me.invalidContent)
                return;
            me.isSendBtnDisabled = true;
            var messageRequest = {
                // Init UiRequestBase
                name: "send Message",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                // Set MessageRequest
                senderName: me.message.senderName,
                email: me.message.email,
                phone: me.message.phone,
                subject: me.message.subject,
                content: me.message.content
            };
            me.handleRequest("/api/Contact/sendMessage", messageRequest).then(function (res) {
                me.applyChanges(function () {
                    if (res) {
                        me.saveResult = "הודעה נשלחה בהצלחה";
                        me.saveStatusWindow.data("kendoWindow").center().open();
                    }
                    else {
                        me.saveResult = "שליחת הודעה נכשלה";
                        me.saveStatusWindow.data("kendoWindow").center().open();
                    }
                });
            }).fail(function (err) { me.$log.log("Error in ContactIndexCtrl in sendMessage - Error Message:" + err.InternalMessage); });
            //me.contactStore.sendMessage(me.message).then((res) => {
            //    me.applyChanges(() => {
            //        if (res) {
            //            me.saveResult = "הודעה נשלחה בהצלחה";
            //            me.saveStatusWindow.data("kendoWindow").open();
            //        }
            //        else {
            //            me.saveResult = "שליחת הודעה נכשלה";
            //            me.saveStatusWindow.data("kendoWindow").open();
            //        }
            //    });
            //});
        };
        ContactIndexCtrl.prototype.closeStatusWindow = function () {
            var me = this;
            me.saveStatusWindow.data("kendoWindow").close();
        };
        return ContactIndexCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("ContactIndexCtrl", [
        "$scope",
        //"AuthService",
        //"ContactStore",
        ContactIndexCtrl,
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=ContactIndexCtrl.js.map