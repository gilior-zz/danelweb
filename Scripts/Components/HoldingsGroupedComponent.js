var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var DanelHoldingsGroupedCtrl = (function (_super) {
        __extends(DanelHoldingsGroupedCtrl, _super);
        function DanelHoldingsGroupedCtrl($scope, holdingsStore) {
            var _this = _super.call(this, "DanelHoldingsGroupedCtrl", $scope) || this;
            var me = _this;
            me.holdingsStore = holdingsStore;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            //me.reloadData();
            me.totalPortfolioAmount = 0;
            me.currentID = 1;
            me.initialGroups();
            me.watchData();
            me.selectedWebSiteGroupingItems = _this.parametersService.GetDanelParameter(Danel.WebParameter.WebSiteGroupingItems, "AssetClass,Currency,Industry,Geography").split(',');
            return _this;
        }
        DanelHoldingsGroupedCtrl.prototype.onDispose = function () {
            var me = this;
            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            _super.prototype.onDispose.call(this);
        };
        DanelHoldingsGroupedCtrl.prototype.linkToFunds = function () {
            var me = this;
            if (me.homePageLink == undefined) {
                me.linkToHomePageForFunds = me.parametersService.GetDanelParameter(Danel.WebParameter.LinkToHomePageForFunds).toLowerCase() == 'true';
                if (!me.linkToHomePageForFunds)
                    return;
                me.homePageLink = me.parametersService.GetDanelParameter(Danel.WebParameter.CompanyWebsiteLink);
                var win = window.open(me.homePageLink, '_blank');
                win.focus();
            }
            else {
                if (me.linkToHomePageForFunds) {
                    var win = window.open(me.homePageLink, '_blank');
                    win.focus();
                }
            }
        };
        DanelHoldingsGroupedCtrl.prototype.watchData = function () {
            var me = this;
            me.$scope.$watch(function () {
                return me.currentID;
            }, function (newValue, oldValue) {
                me.reloadData().then(function (portfolioDash) {
                    me.applyChanges(function () {
                        me.holdings = portfolioDash;
                        me.totalPortfolioAmount = 0;
                        me.holdings.Categories.forEach(function (item) { me.totalPortfolioAmount += item.Amount; });
                        me.groupName = $.grep(me.groups, function (e) { return e.GroupID == me.currentID; })[0].GroupName;
                        $(".portfolio-grid-wrapper thead [data-field=Name] .k-link").html(me.groupName);
                    });
                });
                ;
            });
        };
        DanelHoldingsGroupedCtrl.prototype.onAccountChanged = function (accountNumber) {
            var me = this;
            me.reloadData().then(function (portfolioDash) {
                me.applyChanges(function () {
                    me.holdings = portfolioDash;
                    me.totalPortfolioAmount = 0;
                    me.holdings.Categories.forEach(function (item) { me.totalPortfolioAmount += item.Amount; });
                    me.groupName = $.grep(me.groups, function (e) { return e.GroupID == me.currentID; })[0].GroupName;
                    $(".portfolio-grid-wrapper thead [data-field=Name] .k-link").html(me.groupName);
                });
            }).fail(function (err) { me.$log.log("Error in DanelHoldingsGroupedCtrl in reloadData - Error Message:" + err.InternalMessage); });
        };
        DanelHoldingsGroupedCtrl.prototype.initialGroups = function () {
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
        };
        DanelHoldingsGroupedCtrl.prototype.reloadData = function () {
            var me = this;
            var holdingsGroupedRequest = {
                groupID: me.currentID,
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
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
        };
        return DanelHoldingsGroupedCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("DanelHoldingsGroupedCtrl", [
        "$scope", "AccountStore",
        "HoldingsStore",
        DanelHoldingsGroupedCtrl
    ]);
    angular.module("Danel").directive("danelHoldingsGrouped", ["$log", function ($log) {
            return {
                restrict: "E",
                scope: {},
                templateUrl: Danel.HttpService.fixUrl("/views/Directive/HoldingsGrouped"),
                replace: true,
                controller: "DanelHoldingsGroupedCtrl as ctrl",
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=HoldingsGroupedComponent.js.map