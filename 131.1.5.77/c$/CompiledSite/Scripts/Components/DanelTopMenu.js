/// <reference path="../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var DanelTopMenuCtrl = (function (_super) {
        __extends(DanelTopMenuCtrl, _super);
        function DanelTopMenuCtrl($scope) {
            _super.call(this, "DanelTopMenuCtrl", $scope);
            var me = this;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.setDataDate();
            me.contactEvent = me.eventService.addEvent("DanelTopMenu", "Contact");
            me.dateFromObject = new Date();
            me.dateToObject = new Date();
            me.pagesNameMap = me.parametersService.addParameterMap("PagesNameMap", "PersistentMap");
            me.transactionsParametersMap = me.parametersService.addParameterMap("transactionsParametersMap", "PersistentMap");
            var req = { webParameter: (Danel.WebParameter.AllowWebMessageToAdvisor) };
            me.httpService.POST('/api/Parameters/GetParameter', req).then(function (res) {
                me.allowWebMessageToAdvisor = res.ParameterItems[0].Value.toLowerCase() == 'true';
            }).fail(function (err) {
                me.$log.log("Error in constructor in DanelTopMenuCtrl - Error Message:" + err.InternalMessage);
            });
            var greetings = "";
            if (me.authService.isLoggedIn())
                greetings = "שלום " + me.authService.userDetails.name;
            me.$scope.toolbarOptions = {
                id: 'toolbar',
                items: [
                    {
                        type: "buttonGroup",
                        buttons: [
                            {
                                id: "page_main", text: "מסך ראשי", togglable: true, group: "param", spriteCssClass: "k-icon page_main", toggle: function (e) {
                                    me.goToPage("dashboard", "home-icon", e.target.text());
                                }
                            },
                            {
                                id: "page_holdings", text: "הרכב תיק", togglable: true, group: "param", spriteCssClass: "k-icon page_holdings", toggle: function (e) {
                                    me.goToPage("portfolio", "holdings-page-icon", e.target.text());
                                }
                            },
                            {
                                id: "page_yield", text: "תשואות", togglable: true, group: "param", spriteCssClass: "k-icon page_yield", toggle: function (e) {
                                    me.goToPage("yield", "yield-page-icon", e.target.text());
                                }
                            },
                            {
                                id: "page_transaction", text: "תנועות", togglable: true, group: "param", spriteCssClass: "k-icon page_transaction", toggle: function (e) {
                                    me.goToPage("transaction", "transaction-page-icon", e.target.text());
                                }
                            }
                        ]
                    },
                    {
                        id: "profile",
                        type: "splitButton",
                        text: greetings,
                        //imageUrl: "../Content/customer_data/current_customer/menu_icons/hello.png",
                        menuButtons: [
                            {
                                text: "הפרופיל שלי", imageUrl: "./Content/customer_data/current_customer/User.png", click: function (e) {
                                    me.goToPage("profile", "User", e.target.text());
                                }
                            },
                            {
                                text: "צור קשר", imageUrl: "./Content/customer_data/current_customer/contact.png", click: function (e) {
                                    if (!me.allowWebMessageToAdvisor) {
                                        me.pagesNameMap["pageName"] = "צור קשר";
                                        me.state.go("home.contact");
                                    }
                                    else
                                        me.contactEvent.fireWithParams();
                                }
                            },
                            {
                                text: "יציאה", imageUrl: "./Content/customer_data/current_customer/Logout.png", click: function (e) {
                                    if (me.authService.adminDetails.userId && me.authService.userDetails.userId) {
                                        me.authService.removeImpersonateAs().then(function (res) {
                                            switch (res) {
                                                case true:
                                                    me.redirect("/admin");
                                                    //me.state.go("home.dashboard");
                                                    break;
                                            }
                                        }).fail(function (err) {
                                            me.$log.log("Error in AdminIndexCtrl in impersonateAs - Error Message:" + err.InternalMessage);
                                        });
                                        ;
                                    }
                                    else {
                                        me.authService.logout().then(function () { me.redirect("/"); });
                                    }
                                }
                            }
                        ]
                    }
                ]
            };
            me.setDataDate();
        }
        DanelTopMenuCtrl.prototype.onAccountChanged = function (accountNumber) {
            var me = this;
            me.setDataDate();
        };
        DanelTopMenuCtrl.prototype.setDataDate = function () {
            var me = this;
            var currentAccount = me.accountStore.currentAccountNumber;
            me.dataDate = null;
            if (currentAccount == "-1")
                return;
            var emptyRequest = {
                // Init UiRequestBase
                name: "getCurrentAccount",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
            };
            me.handleRequest("/api/Account/GetLastPositionDate", emptyRequest).then(function (res) {
                me.applyChanges(function () {
                    me.dataDate = res;
                });
            }).fail(function (err) { me.$log.log("Error in AccountDashComponentCtrl in Account - Error Message:" + err.InternalMessage); });
        };
        DanelTopMenuCtrl.prototype.goToPage = function (name, image, display) {
            var me = this;
            image = "./Content/customer_data/current_customer/" + image + ".png";
            name = "home." + name;
            me.pagesNameMap.pageNameImage = image;
            me.pagesNameMap.pageName = display;
            me.state.go(name);
        };
        DanelTopMenuCtrl.prototype.onDispose = function () {
            var me = this;
            _super.prototype.onDispose.call(this);
        };
        return DanelTopMenuCtrl;
    }(Danel.DanelCtrl));
    angular.module('Danel')
        .controller("DanelTopMenuCtrl", [
        "$scope",
        DanelTopMenuCtrl
    ])
        .directive("danelTopMenu", function () {
        return {
            restrict: "E",
            scope: {},
            replace: true,
            templateUrl: Danel.HttpService.fixUrl("/views/Directive/DanelTopMenu"),
            controller: "DanelTopMenuCtrl as ctrl",
        };
    });
})(Danel || (Danel = {}));
//# sourceMappingURL=DanelTopMenu.js.map