
module Danel {
   
   


    class DanelContactCtrl extends BaseCtrl {
        public userLoggedIn: boolean;
        authService: AuthService;
        loginDetails: LoginDetails;
        private parametersService: ParametersService;
        private contactTypeMap;
        public selectedSubjectID: number;
        private state;
        public message: Message;
        public subjects: Subject[];
        public contactStore: ContactStore;
        public scope;
        private pagesNameMap;
        private error: string;
        public submitted: boolean;
        public disable: boolean;
        constructor($scope, $state, authService: AuthService, parametersService: ParametersService, contactStore: ContactStore) {
            var me = this;
            super("DanelContactCtrl", $scope);
            me.parametersService = parametersService;
            //me.contactTypeMap = me.parametersService.getParametersMap("ContactTypeMap");
            me.pagesNameMap = me.parametersService.getParametersMap("PagesNameMap", "PersistentMap");
            //var typeObj = me.contactTypeMap["m_subject"];
            me.message = new Message();
            me.authService = authService;
            me.contactStore = contactStore;
            me.userLoggedIn = me.authService.isLoggedIn();
            me.message.status = "שליחה";
            me.disable = false;
            me.setSubjects();

            me.message.senderName = me.authService.userDetails.name;
            me.message.email = me.authService.userDetails.email;
            me.message.phone = me.authService.userDetails.phone;
            me.selectedSubjectID = me.subjects[0].SubjectID;
            me.$scope.$watch(
                function () {
                    return me.selectedSubjectID;
                },
                function (newValue, oldValue) {
                    me.selectedSubjectID = newValue;
                    me.message.subject = $.grep(me.subjects, function (e) { return e.SubjectID == me.selectedSubjectID; })[0].SubjectName;
                });
            //}
            me.state = $state;
            $("textarea").keypress(function () {
                me.message.status = "שליחה";
            });
        }


        public cancel(): void {
            var me = this;
            me.pagesNameMap["pageName"] = "מסך ראשי";
            me.state.go("home.dashboard");
        }

        private setSubjects(): void {
            var me = this;
            me.subjects = [];
            if (me.userLoggedIn) {
                var general = { SubjectID: 1, SubjectName: "כללי" };
                var financial = { SubjectID: 2, SubjectName: "מידע פיננסי" };
                var commisions = { SubjectID: 3, SubjectName: "עמלות" };
                var financialproducts = { SubjectID: 4, SubjectName: "מוצרים פיננסיים" };
                me.subjects.push(general);
                me.subjects.push(financial);
                me.subjects.push(commisions);
                me.subjects.push(financialproducts);
            }
        }

        public send(): void {

            var me = this;
            var error = false;
            me.$scope.contactForm.$setDirty();
            if (me.message.content == undefined || me.message.content == '') {
                error = true;
                if (!me.$scope.contactForm.content.$dirty) {
                    var obj = jQuery('.contact-form').find('textarea[name=content]');
                    $(obj).addClass("ng-dirty");
                }
            }

            if (error) {
                me.message.status = "יש למלא את כל הפרטים!";
                return;
            }

            me.disable = true;

            me.message.status = "שולח...";
            //me.contactStore.sendMessage(me.message.senderName, me.message.email, me.message.phone, me.message.content, me.message.subject).then((res) => {
            //    me.$log.debug("mail sent: " + res);
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

        onDispose() {
            var me = this;

            me.disable = false;
            me.$scope.contactForm.$setPristine(true);
            me.$scope.contactForm.$dirty = false;

            me.message.status = "שליחה";
            super.onDispose();
        }
    }

    angular.module("Danel").controller("DanelContactCtrl",
        [
            "$scope",
            "$state",
            "AuthService",
            "ParametersService",
            "ContactStore",
            DanelContactCtrl
        ]);

    angular.module("Danel").directive("danelContact", ["$log", function ($log) {
        return {
            restrict: "E",
            templateUrl: HttpService.fixUrl("/views/Directive/DanelContact"),
            replace: true,
            controller: "DanelContactCtrl as ctrl",
        };
    }]);
}