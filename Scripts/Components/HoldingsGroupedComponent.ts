module Danel {
    export interface Group {
        GroupID: number;
        GroupName: string;
    }
    class DanelHoldingsGroupedCtrl extends DanelCtrl {
        public homePageLink: string;
        public linkToHomePageForFunds: boolean;
        public group: Group;
        private groups: Group[];
        public currentID: number;
        private holdingsStore: HoldingsStore;
        public holdings: PortfolioDash;
        public totalPortfolioAmount: number;
        public groupName: string;
        public selectedWebSiteGroupingItems: Array<string>;
        constructor($scope, holdingsStore: HoldingsStore) {
            super("DanelHoldingsGroupedCtrl", $scope);
            var me = this;
            me.holdingsStore = holdingsStore;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            //me.reloadData();
            me.totalPortfolioAmount = 0;
            me.currentID = 1;
            me.initialGroups();
            me.watchData();
            me.selectedWebSiteGroupingItems = this.parametersService.GetDanelParameter(WebParameter.WebSiteGroupingItems, "AssetClass,Currency,Industry,Geography").split(',');
        }

        onDispose() {
            var me = this;
            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            super.onDispose();
        }
        private linkToFunds(): void {
            var me = this;
            if (me.homePageLink == undefined) {
                me.linkToHomePageForFunds = me.parametersService.GetDanelParameter(WebParameter.LinkToHomePageForFunds).toLowerCase() == 'true';
                if (!me.linkToHomePageForFunds)
                    return;
                me.homePageLink = me.parametersService.GetDanelParameter(WebParameter.CompanyWebsiteLink);
                var win = window.open(me.homePageLink, '_blank');
                win.focus();

            }
            else {
                if (me.linkToHomePageForFunds) {
                    var win = window.open(me.homePageLink, '_blank');
                    win.focus();
                }
            }


        }
        watchData(): void {
            var me = this;
            me.$scope.$watch(function () {
                return me.currentID;
            },
                function (newValue: number, oldValue: number) {

                    me.reloadData().then((portfolioDash) => {
                        me.applyChanges(() => {
                            me.holdings = portfolioDash;
                            me.totalPortfolioAmount = 0;
                            me.holdings.Categories.forEach(function (item) { me.totalPortfolioAmount += item.Amount });
                            me.groupName = $.grep(me.groups, function (e) { return e.GroupID == me.currentID; })[0].GroupName;
                            $(".portfolio-grid-wrapper thead [data-field=Name] .k-link").html(me.groupName)
                        });
                    });;
                });
        }
        private onAccountChanged(accountNumber) {
            var me = this;
            me.reloadData().then((portfolioDash) => {
                me.applyChanges(() => {
                    me.holdings = portfolioDash;
                    me.totalPortfolioAmount = 0;
                    me.holdings.Categories.forEach(function (item) { me.totalPortfolioAmount += item.Amount });
                    me.groupName = $.grep(me.groups, function (e) { return e.GroupID == me.currentID; })[0].GroupName;
                    $(".portfolio-grid-wrapper thead [data-field=Name] .k-link").html(me.groupName)
                });
            }).fail((err) => { me.$log.log("Error in DanelHoldingsGroupedCtrl in reloadData - Error Message:" + err.InternalMessage); });

        }

        initialGroups(): void {
            var me = this;
            me.groups = [];
            var channel = { GroupID: 1, GroupName: 'אפיק' };
            var industry = { GroupID: 8, GroupName: 'ענף' };
            var currency = { GroupID: 9, GroupName: 'מטבע' };
            var geography = { GroupID: 14, GroupName: 'מדינה' };

            me.groups.push(channel);
            me.groups.push(industry);
            me.groups.push(currency);
            me.groups.push(geography);
        }



        private reloadData(): Q.Promise<PortfolioDash> {
            var me = this;
            var holdingsGroupedRequest: HoldingsGroupedRequest = <HoldingsGroupedRequest>{
                groupID: me.currentID,
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
                //groupID=me.currentID,
                //entityList: [{ Id: "-1", EntityType: 50 }],               

            };
            return me.handleRequest("/api/Holdings/GroupedHoldings", holdingsGroupedRequest);


            //me.holdingsStore.getGroupedPortfolio(me.accountStore.currentAccountNumber, me.currentID)
            //    .then((portfolioDash) => {
            //        me.applyChanges(() => {
            //            me.holdings = portfolioDash;
            //            me.totalPortfolioAmount = 0;
            //            me.holdings.Categories.forEach(function (item) { me.totalPortfolioAmount += item.Amount });
            //            me.groupName = $.grep(me.groups, function (e) { return e.GroupID == me.currentID; })[0].GroupName;
            //            $(".portfolio-grid-wrapper thead [data-field=Name] .k-link").html(me.groupName)
            //        });
            //    });
        }
    }


    angular.module("Danel").controller("DanelHoldingsGroupedCtrl",
        [
            "$scope", "AccountStore",
            "HoldingsStore",
            DanelHoldingsGroupedCtrl
        ]);

    angular.module("Danel").directive("danelHoldingsGrouped", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/HoldingsGrouped"),
            replace: true,
            controller: "DanelHoldingsGroupedCtrl as ctrl",
        };
    }]);
}