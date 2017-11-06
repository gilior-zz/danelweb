/// <reference path="../typings/angularjs/angular.d.ts" />

module Danel {
    class DanelTopMenuCtrl extends DanelCtrl {
        private menuItems: string;
        private pagesNameMap;
        private transactionsParametersMap;
        public state;
        public dateFromObject: Date;
        public dateToObject: Date;
        private rangeChangedEvent: Event;
        public dataDate: Date;
        allowWebMessageToAdvisor: boolean;
        private contactEvent: Event;
        constructor($scope) {
            super("DanelTopMenuCtrl", $scope);
            var me = this;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.setDataDate();
            me.contactEvent = me.eventService.addEvent("DanelTopMenu", "Contact");
            me.dateFromObject = new Date();
            me.dateToObject = new Date();
            me.pagesNameMap = me.parametersService.addParameterMap("PagesNameMap", "PersistentMap");
            me.transactionsParametersMap = me.parametersService.addParameterMap("transactionsParametersMap", "PersistentMap");

            me.allowWebMessageToAdvisor = me.parametersService.GetDanelParameter(WebParameter.AllowWebMessageToAdvisor).toLowerCase() == 'true';

            var greetings: string = "";
            if (me.authService.isLoggedIn())
                greetings = "שלום " + me.authService.userDetails.name;
            let webSiteMenuItems = this.parametersService.GetDanelParameter(WebParameter.WebSiteMenuItems, "page_main,page_holdings,page_yield,page_transaction");
            let selectedWebSiteMenuItems = webSiteMenuItems.split(',');

            me.$scope.toolbarOptions = {
                id: 'toolbar',

                items: [
                    {
                        type: "buttonGroup",

                        buttons: [

                            //{
                            //    id: "page_main", text: "מסך ראשי", togglable: true, group: "param", spriteCssClass: "k-icon page_main", toggle:
                            //    function (e) {
                            //        me.goToPage("dashboard", "home-icon", e.target.text())
                            //    }
                            //},
                            //{

                            //    id: "page_holdings", text: "הרכב תיק", togglable: true, group: "param", spriteCssClass: "k-icon page_holdings", toggle:
                            //    function (e) {
                            //        me.goToPage("portfolio", "holdings-page-icon", e.target.text());
                            //    }
                            //},
                            //{
                            //    id: "page_yield", text: "תשואות", togglable: true, group: "param", spriteCssClass: "k-icon page_yield", toggle:
                            //    function (e) {
                            //        me.goToPage("yield", "yield-page-icon", e.target.text())
                            //    }
                            //},

                            //{
                            //    id: "page_transaction", "ng-show": "false", text: "תנועות", togglable: true, group: "param", spriteCssClass: "k-icon page_transaction ", toggle:
                            //    function (e) {
                            //        me.goToPage("transaction", "transaction-page-icon", e.target.text())
                            //    }
                            //}
                        ]
                    },
                    {
                        id: "profile",
                        type: "splitButton",
                        text: greetings,
                        //imageUrl: "../Content/customer_data/current_customer/menu_icons/hello.png",


                        menuButtons: [
                            {
                                text: "הפרופיל שלי", imageUrl: "./Content/customer_data/current_customer/User.png", click:
                                function (e) {
                                    me.goToPage("profile", "User", e.target.text());
                                }
                            },
                            {
                                text: "צור קשר", imageUrl: "./Content/customer_data/current_customer/contact.png", click:
                                function (e) {
                                    if (!me.allowWebMessageToAdvisor) {
                                        me.pagesNameMap["pageName"] = "צור קשר";
                                        me.state.go("home.contact");
                                    }
                                    else
                                        me.contactEvent.fireWithParams();
                                }
                            },
                            {
                                text: "יציאה", imageUrl: "./Content/customer_data/current_customer/Logout.png", click:
                                function (e) {
                                    if (me.authService.adminDetails.userId && me.authService.userDetails.userId) {
                                        me.authService.removeImpersonateAs().then((res: boolean) => {
                                            switch (res) {
                                                case true:
                                                    me.redirect("/admin");
                                                    //me.state.go("home.dashboard");
                                                    break;
                                            }
                                        }).fail(err => {
                                            me.$log.log("Error in AdminIndexCtrl in impersonateAs - Error Message:" + err.InternalMessage);
                                        });;
                                    }


                                    else {
                                        me.authService.logout().then(() => { me.redirect("/"); });
                                    }

                                }
                            }
                        ]
                    }
                ]
            };

            selectedWebSiteMenuItems.forEach((i) => {
                switch (i) {
                    case "page_main":
                        (<Array<any>>me.$scope.toolbarOptions.items[0].buttons).push(

                            {
                                id: "page_main", text: "מסך ראשי", togglable: true, group: "param", spriteCssClass: "k-icon page_main",
                                toggle:
                                function (e) {
                                    me.goToPage("dashboard", "home-icon", e.target.text())
                                }
                            }
                        )
                        break;
                    case "page_holdings":
                        (<Array<any>>me.$scope.toolbarOptions.items[0].buttons).push(
                            {

                                id: "page_holdings", text: "הרכב תיק", togglable: true, group: "param", spriteCssClass: "k-icon page_holdings", toggle:
                                function (e) {
                                    me.goToPage("portfolio", "holdings-page-icon", e.target.text());
                                }
                            }

                        )
                        break;
                    case "page_yield":
                        (<Array<any>>me.$scope.toolbarOptions.items[0].buttons).push(
                            {
                                id: "page_yield", text: "תשואות", togglable: true, group: "param", spriteCssClass: "k-icon page_yield", toggle:
                                function (e) {
                                    me.goToPage("yield", "yield-page-icon", e.target.text())
                                }
                            }

                        )
                        break;
                    case "page_transaction":
                        (<Array<any>>me.$scope.toolbarOptions.items[0].buttons).push(
                            {
                                id: "page_transaction", "ng-show": "false", text: "תנועות", togglable: true, group: "param", spriteCssClass: "k-icon page_transaction ", toggle:
                                function (e) {
                                    me.goToPage("transaction", "transaction-page-icon", e.target.text())
                                }
                            }
                        )
                        break;

                }

            })
            console.log((<Array<any>>me.$scope.toolbarOptions.items[0].buttons));

            me.setDataDate();


        }

        private onAccountChanged(accountNumber) {
            var me = this;
            me.setDataDate();
        }

        public setDataDate(): void {

            var me = this;
            if (me.authService.loginDetails == null) return;
            var currentAccount = me.accountStore.currentAccountNumber;
            me.dataDate = null;
            //if (currentAccount == "-1")
            //    return;
            var emptyRequest: EmptyRequest = <EmptyRequest>{
                // Init UiRequestBase
                name: "getCurrentAccount",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
            };
            me.handleRequest("/api/Account/GetLastPositionDate", emptyRequest).then((res: Date) => {
                me.applyChanges(() => {
                    me.dataDate = res;
                });
            }).fail((err) => { me.$log.log("Error in AccountDashComponentCtrl in Account - Error Message:" + err.InternalMessage); });



        }

        public goToPage(name: string, image: string, display: string): void {
            var me = this;

            image = "./Content/customer_data/current_customer/" + image + ".png";
            name = "home." + name;
            me.pagesNameMap.pageNameImage = image;
            me.pagesNameMap.pageName = display;
            me.state.go(name);
        }

        onDispose() {
            var me = this;


            super.onDispose();
        }



    }

    angular.module('Danel')
        .controller("DanelTopMenuCtrl",
        [
            "$scope",
            DanelTopMenuCtrl
        ])
        .directive("danelTopMenu", function () {
            return {
                restrict: "E",
                scope: {},
                replace: true,
                templateUrl: HttpService.fixUrl("/views/Directive/DanelTopMenu"),
                controller: "DanelTopMenuCtrl as ctrl",
            };
        });
}

