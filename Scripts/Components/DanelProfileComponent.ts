
module Danel {

    class DanelProfileCtrl extends BaseCtrl {
        public userLoggedIn: boolean;
        authService: AuthService;
        loginDetails: LoginDetails;
        private parametersService: ParametersService;
        private state;
        public message: Message;
        public profileStore: ProfileStore;
        public scope;
        public disable: Boolean;
        public passwordStatus: string;
        private window;
        
        constructor($scope, $state, authService: AuthService, parametersService: ParametersService, profileStore: ProfileStore) {
            var me = this;
            super("DanelProfileCtrl", $scope);
            me.parametersService = parametersService;
            me.message = new Message();
            me.authService = authService;
            me.profileStore = profileStore;
            me.userLoggedIn = me.authService.isLoggedIn();
            me.message.status = "שמירת שינויים";
            me.message.senderName = me.authService.userDetails.name;
            me.message.email = me.authService.userDetails.email;
            me.message.phone = me.authService.userDetails.phone;
            me.message.address = me.authService.userDetails.address;
            me.state = $state;
            me.passwordStatus = "עדכון סיסמא";
            me.window = $("#window");
            //if (!me.window.data("kendoWindow")) {
            //    me.window.kendoWindow({
            //        draggable: false,
            //        modal: true,
            //        //width: "600px",
            //        title: "עדכון סיסמא",
            //        actions: [
            //            "Close"
            //        ],
            //        visible: false,
            //        close: function () {
            //            me.disable = false;
            //            //me.$scope.contactForm.$setPristine(true);
            //            //me.$scope.contactForm.$dirty = false;
            //            me.message.reset();
            //            me.message.status = "שליחה";

            //        }
            //    });
            //}
            $("textarea").keypress(function () {
                me.message.status = "שליחה";
            });
            me.watchData();
        }

        private watchData(): void {
            var me = this;
            me.$scope.$watch(function () {
                return me.message.phone;
            },
                function (newValue: number, oldValue: number) {
                    if (me.message.phone == undefined || me.message.phone == '') {
                        me.message.status = "יש למלא את כל הפרטים!";
                        return;
                    }
                    if (me.message.address == undefined || me.message.address == '') {
                        me.message.status = "יש למלא את כל הפרטים!";
                        return;
                    }
                    if (me.message.email == undefined || me.message.email == '') {
                        me.message.status = "יש למלא את כל הפרטים!";
                        return;
                    }
                    me.message.status = "שמירת שינויים";

                });
            me.$scope.$watch(function () {
                return me.message.email;
            },
                function (newValue: number, oldValue: number) {

                });
            me.$scope.$watch(function () {
                return me.message.address;
            },
                function (newValue: number, oldValue: number) {

                });

        }

        public handlePassword(): void {

        }

        public openPasswordWindow(): void {
            var me = this;
            me.window.data("kendoWindow").center().open();
        }

        public send(): void {

            var me = this;
            var error = false;
            me.$scope.profileForm.$setDirty(true);

            if (me.message.address == undefined || me.message.address == '') {
                error = true;
                if (!me.$scope.profileForm.address.$dirty) {
                    var obj = jQuery('.profile-form').find('input[name=address]');
                    $(obj).addClass("ng-dirty");
                }
            }

            if (me.message.email == undefined || me.message.email == '') {
                error = true;
                if (!me.$scope.profileForm.email.$dirty) {
                    var obj = jQuery('.profile-form').find('input[name=email]');
                    $(obj).addClass("ng-dirty");
                }

            }
            if (me.message.phone == undefined || me.message.phone == '') {
                error = true;
                if (!me.$scope.profileForm.phone.$dirty) {
                    var obj = jQuery('.profile-form').find('input[name=phone]');
                    $(obj).addClass("ng-dirty");
                }
            }
            if (error) {
                me.message.status = "יש למלא את כל הפרטים!";
                return;
            }
            me.disable = true;

            me.message.status = "מעדכן...";

            //me.profileStore.updateProfile(me.message.email, me.message.phone, me.message.address).then((res) => {
            //    me.applyChanges(() => {
            //        if (res) {
            //            me.message.status = "עדכון בוצע בהצלחה";
            //        }
            //        else {
            //            me.message.status = "עדכון נכשל";
            //        }
            //    });

            //});
        }

        onDispose() {
            var me = this;
            me.$scope.contactForm.$setPristine(true);
            me.$scope.contactForm.$dirty = false;
           
            me.message.status = "שליחה";
            super.onDispose();
        }
    }

    angular.module("Danel").controller("DanelProfileCtrl",
        [
            "$scope",
            "$state",
            "AuthService",
            "ParametersService",
            "ProfileStore",
            DanelProfileCtrl
        ]);

    angular.module("Danel").directive("danelProfile", ["$log", function ($log) {
        return {
            restrict: "E",
            templateUrl: HttpService.fixUrl("/views/Directive/DanelProfile"),
            replace: true,
            controller: "DanelProfileCtrl as ctrl",
        };
    }]);
}