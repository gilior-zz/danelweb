var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var AdvisorDetailsCtrl = (function (_super) {
        __extends(AdvisorDetailsCtrl, _super);
        function AdvisorDetailsCtrl($scope) {
            _super.call(this, 'AdvisorDetailsCtrl', $scope);
            var me = this;
            me.eventService.getEvent("ProfileIndex", "UpdateProfile").addEventHandler(me, me.updateUserDetails);
            me.eventService.getEvent("DanelTopMenu", "Contact").addEventHandler(me, me.openWindow);
            me.eventService.getEvent("DanelFooter", "Contact").addEventHandler(me, me.openWindow);
            if (me.authService && me.authService.userDetails) {
                me.reloadData();
                me.watchData();
            }
            var req = { webParameter: (Danel.WebParameter.AllowWebMessageToAdvisor) };
            me.httpService.POST('/api/Parameters/GetParameter', req).then(function (res) {
                me.allowWebMessageToAdvisor = res.ParameterItems[0].Value.toLowerCase() == 'true' && me.authService.isLoggedIn();
            }).fail(function (err) {
                me.$log.log("Error in constructor in AdvisorDetailsCtrl - Error Message:" + err.InternalMessage);
            });
        }
        AdvisorDetailsCtrl.prototype.onDispose = function () {
            var me = this;
            me.contactAdvisorInfo = null;
        };
        AdvisorDetailsCtrl.prototype.watchData = function () {
            var me = this;
            me.$scope.$watch(function () {
                return me.selectedOption;
            }, function (newValue, oldValue) {
                if (newValue != undefined)
                    me.content = newValue;
                me.selectedOption = undefined;
            });
        };
        AdvisorDetailsCtrl.prototype.openWindow = function () {
            var me = this;
            $("html, body").animate({ scrollTop: 0 }, "slow");
            me.applyChanges(function () {
                //var isVisible = $(".advisor-window").css('visibility')==''
                var vis = $(".advisor-window").css('visibility');
                if (vis != 'visible') {
                    $(".advisor-window").css('visibility', 'visible').hide().slideDown(400);
                }
            });
        };
        AdvisorDetailsCtrl.prototype.updateUserDetails = function () {
            var me = this;
            me.applyChanges(function () {
                //var isVisible = $(".advisor-window").css('visibility')==''
                var vis = $(".advisor-window").css('visibility');
                if (vis != 'visible') {
                    $(".advisor-window").css('visibility', 'visible').hide().slideDown(400);
                    $(".message-window").slideToggle();
                    me.content = 'נא ליצור קשר כדי לשנות את פרטי המשתמש';
                }
            });
        };
        AdvisorDetailsCtrl.prototype.sendToAdvisor = function () {
            var me = this;
            me.executeSending = true;
            var messageRequest = {
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
            me.handleRequest("/api/Contact/SendToInbox", messageRequest, true).then(function (res) {
                me.applyChanges(function () {
                    if (res) {
                        me.$scope.sendSuccess = true;
                        $("#status-label-success").css('visibility', 'visible');
                        $(".message-window").slideToggle();
                        me.content = "";
                    }
                    else {
                        me.$scope.sendFail = true;
                        $("#status-label-fail").css('visibility', 'visible');
                    }
                });
            }).fail(function (err) {
                me.$log.log("Error in AdvisorDetailsCtrl in sendToAdvisor - Error Message:" + err.InternalMessage);
            });
            me.executeSending = false;
            me.applyChanges(function () { me.$scope.sendFail = false; me.$scope.sendSuccess = false; });
            //me.timeout(
            //    () => {
            //        me.applyChanges(() => { me.$scope.sendFail = false; me.$scope.sendSuccess = false; });
            //    }, 2000);           
        };
        AdvisorDetailsCtrl.prototype.handleSendSection = function () {
            var me = this;
            me.applyChanges(function () {
                //var isVisible = $(".advisor-window").css('visibility')==''
                //var dis: string = $(".message-window").css('display');
                //if (dis == 'none')
                //    $(".message-window").slideToggle();
                //else
                $(".message-window").slideToggle();
                $(".status-label").css('visibility', 'hidden');
            });
        };
        AdvisorDetailsCtrl.prototype.handleWindow = function () {
            var me = this;
            me.applyChanges(function () {
                //var isVisible = $(".advisor-window").css('visibility')==''
                var vis = $(".advisor-window").css('visibility');
                if (vis == 'visible') {
                    me.content = null;
                    $(".message-window").css('display', 'none');
                    $(".advisor-window").css('visibility', 'hidden');
                    $(".status-label").css('visibility', 'hidden');
                }
                else {
                    $(".advisor-window").css('visibility', 'visible').hide().slideDown(400);
                }
            });
        };
        AdvisorDetailsCtrl.prototype.reloadData = function () {
            var me = this;
            var advisorDetailsCtrl = {
                // Init UiRequestBase
                name: "get Advisor Details",
                // Set AccountsRequest
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                userId: me.authService.getUserId()
            };
            me.handleRequest("/api/Dashboard/LoadContactAdvisorInfo", advisorDetailsCtrl).then(function (advisorDetails) {
                me.applyChanges(function () {
                    me.contactAdvisorInfo = advisorDetails;
                });
            }).fail(function (err) {
                me.$log.log("Error in HoldingsDetailedComponentCtrl in DetaliedPortfolio - Error Message:" + err.InternalMessage);
            });
        };
        return AdvisorDetailsCtrl;
    }(Danel.DanelCtrl));
    angular.module('Danel').controller('AdvisorDetailsCtrl', ['$scope', AdvisorDetailsCtrl]).directive("advisorDetails", function () {
        return {
            restrict: "E",
            scope: {},
            replace: true,
            templateUrl: Danel.HttpService.fixUrl("/views/Directive/AdvisorDetails"),
            controller: "AdvisorDetailsCtrl as ctrl",
        };
    });
})(Danel || (Danel = {}));
//# sourceMappingURL=AdvisorDetailsComponent.js.map