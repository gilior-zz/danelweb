/// <reference path="../../typings/angularjs/angular.d.ts" />

module Danel {
    class ContactIndexCtrl extends DanelCtrl {
        public message: MessageRequest;
        public isSendBtnDisabled: boolean;
        private saveStatusWindow;
        public saveResult: string;
        public invalidContent: boolean;
        public subjects: Subject[];
        public selectedSubjectID: number;

        constructor($scope) {
            super("ContactIndexCtrl", $scope);
            var me = this;
            //me.authService = authService;
            //me.contactStore = contactStore;
            me.message = new MessageRequest();
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
        }

        private watchData(): void {
            var me = this;
            me.$scope.$watch(
                function () {
                    return me.message.content;
                },
                function (newValue, oldValue) {
                    if (newValue)
                        me.invalidContent = false;
                    else
                        me.invalidContent = true;
                });
            me.$scope.$watch(
                function () {
                    return me.selectedSubjectID;
                },
                function (newValue, oldValue) {
                    me.selectedSubjectID = newValue;
                    me.message.subject = $.grep(me.subjects, function (e) { return e.SubjectID == me.selectedSubjectID; })[0].SubjectName;
                });
        }

        private setSubjects(): void {
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

        }

        public Send(): void {
            var me = this;
            if (!me.message.content)
                me.invalidContent = true;
            if (me.invalidContent)
                return;
            me.isSendBtnDisabled = true;

            var messageRequest: MessageRequest = <MessageRequest>{

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
            me.handleRequest("/api/Contact/sendMessage", messageRequest).then((res) => {
                me.applyChanges(() => {
                    if (res) {
                        me.saveResult = "הודעה נשלחה בהצלחה";
                        me.saveStatusWindow.data("kendoWindow").center().open();
                    }
                    else {
                        me.saveResult = "שליחת הודעה נכשלה";
                        me.saveStatusWindow.data("kendoWindow").center().open();
                    }
                });
            }).fail((err) => { me.$log.log("Error in ContactIndexCtrl in sendMessage - Error Message:" + err.InternalMessage); });
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
        }
        public closeStatusWindow(): void {
            var me = this;
            me.saveStatusWindow.data("kendoWindow").close();
        }
    }

    angular.module("Danel").controller("ContactIndexCtrl",
        [
            "$scope",
        //"AuthService",
        //"ContactStore",
            ContactIndexCtrl,
        ]);
}
