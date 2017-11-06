module Danel {
    class AdvisorDetailsCtrl extends DanelCtrl {
        contactAdvisorInfo: ContactAdvisorInfo;
        selectedOption: any;
        content: string;
        executeSending: boolean;
        sendFail: boolean;
        characterCounter: number;
        sendSuccess: boolean;
        allowWebMessageToAdvisor: boolean;
        constructor($scope: ng.IScope) {


            super('AdvisorDetailsCtrl', $scope);
            var me = this;
            me.eventService.getEvent("ProfileIndex", "UpdateProfile").addEventHandler(me, me.updateUserDetails);
            me.eventService.getEvent("DanelTopMenu", "Contact").addEventHandler(me, me.openWindow);
            me.eventService.getEvent("DanelFooter", "Contact").addEventHandler(me, me.openWindow);
            me.characterCounter = 0;
            if (me.authService && me.authService.userDetails) {
                me.reloadData();
                me.watchData();
            }

          
            me.allowWebMessageToAdvisor = me.parametersService.GetDanelParameter(WebParameter.AllowWebMessageToAdvisor).toLowerCase() == 'true' && me.authService.isLoggedIn()


        }

        public onDispose() {
            var me = this;
            me.contactAdvisorInfo = null;

        }
        private watchData(): void {
            var me = this;
            me.$scope.$watch(
                function () {
                    return me.selectedOption;
                },
                function (newValue, oldValue) {
                    if (newValue != undefined)
                        me.content = newValue;
                    me.selectedOption = undefined;
                });
            me.$scope.$watch(
                function () {
                    return me.content;
                },
                function (newValue, oldValue) {
                    if (newValue != undefined)
                        me.characterCounter = newValue.length;
                    else
                        me.characterCounter = 0;
                });

        }

        public openWindow(): void {
            var me = this;
            $("html, body").animate({ scrollTop: 0 }, "slow");
            me.applyChanges(() => {
                //var isVisible = $(".advisor-window").css('visibility')==''
                var vis: string = $(".advisor-window").css('visibility');
                if (vis != 'visible') {
                    $(".advisor-window").css('visibility', 'visible').hide().slideDown(400);

                }
            });
        }

        public updateUserDetails(): void {
            var me = this;

            me.applyChanges(() => {
                //var isVisible = $(".advisor-window").css('visibility')==''
                var vis: string = $(".advisor-window").css('visibility');
                if (vis != 'visible') {
                    $(".advisor-window").css('visibility', 'visible').hide().slideDown(400);
                    $(".message-window").slideToggle();
                    me.content = 'נא ליצור קשר כדי לשנות את פרטי המשתמש';
                }
            });



        }

        public sendToAdvisor(): void {
            var me = this;
            me.executeSending = true;
            var messageRequest: MessageRequest = <MessageRequest>{

                // Init UiRequestBase
                name: "ResetPassword",

                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],

                // Set MessageRequest
                senderName: me.authService.userDetails.name,
                email: me.authService.userDetails.email,
                phone: me.authService.userDetails.phone,
                subject: "הודעה עבור היועץ",
                content: me.content,
                userID: me.authService.loginDetails.userId,
                danelUserName: me.contactAdvisorInfo.advisorName
            };
            me.handleRequest("/api/Contact/SendToInbox", messageRequest, true).then((res: boolean) => {
                me.applyChanges(() => {
                    if (res) {
                        me.$scope.sendSuccess = true;
                        $("#status-label-success").css('visibility', 'visible')
                        $(".message-window").slideToggle();
                        me.content = "";
                    }
                    else {
                        me.$scope.sendFail = true;
                        $("#status-label-fail").css('visibility', 'visible')
                    }
                });
            }).fail((err) => {

                me.$log.log("Error in AdvisorDetailsCtrl in sendToAdvisor - Error Message:" + err.InternalMessage);

            });
            me.executeSending = false;
            me.applyChanges(() => { me.$scope.sendFail = false; me.$scope.sendSuccess = false; });

            //me.timeout(
            //    () => {
            //        me.applyChanges(() => { me.$scope.sendFail = false; me.$scope.sendSuccess = false; });

            //    }, 2000);           
        }
        public handleSendSection(): void {

            var me = this;

            me.applyChanges(() => {
                //var isVisible = $(".advisor-window").css('visibility')==''
                //var dis: string = $(".message-window").css('display');
                //if (dis == 'none')
                //    $(".message-window").slideToggle();
                //else
                $(".message-window").slideToggle();
                $(".status-label").css('visibility', 'hidden');
            });

        }

        public handleWindow(): void {

            var me = this;

            me.applyChanges(() => {
                //var isVisible = $(".advisor-window").css('visibility')==''
                var vis: string = $(".advisor-window").css('visibility');
                if (vis == 'visible') {
                    me.content = null;
                    me.characterCounter = 0;
                    $(".message-window").css('display', 'none');
                    $(".advisor-window").css('visibility', 'hidden');
                    $(".status-label").css('visibility', 'hidden');

                }
                else {
                    $(".advisor-window").css('visibility', 'visible').hide().slideDown(400);

                }


            });

        }
        private reloadData() {
            var me = this;

            var advisorDetailsCtrl: ContactAdvisorInfoRequest = <ContactAdvisorInfoRequest>{

                // Init UiRequestBase
                name: "get Advisor Details",
                // Set AccountsRequest
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                userId: me.authService.getUserId()
            };
            me.handleRequest("/api/Dashboard/LoadContactAdvisorInfo", advisorDetailsCtrl).then((advisorDetails: ContactAdvisorInfo) => {
                me.applyChanges(() => {
                    me.contactAdvisorInfo = advisorDetails;

                });
            }).fail((err) => {
                me.$log.log("Error in HoldingsDetailedComponentCtrl in DetaliedPortfolio - Error Message:" + err.InternalMessage);

            });

        }
    }
    angular.module('Danel').controller('AdvisorDetailsCtrl', ['$scope', AdvisorDetailsCtrl]).directive("advisorDetails", function () {
        return {
            restrict: "E",
            scope: {},
            replace: true,
            templateUrl: HttpService.fixUrl("/views/Directive/AdvisorDetails"),
            controller: "AdvisorDetailsCtrl as ctrl",
        };
    });

} 