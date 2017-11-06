var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var AccountDashComponentCtrl = (function (_super) {
        __extends(AccountDashComponentCtrl, _super);
        function AccountDashComponentCtrl($scope) {
            var _this = _super.call(this, "AccountDashComponentCtrl", $scope) || this;
            var me = _this;
            //me.accountStore = accountStore;
            //me.dashboardStore = dashboardStore;
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.reloadData();
            me.WebSiteCustomYieldInMonths = me.parametersService.GetDanelParameter(Danel.WebParameter.WebSiteCustomYieldInMonths);
            return _this;
        }
        AccountDashComponentCtrl.prototype.getClass = function (value) {
            console.log(value);
        };
        AccountDashComponentCtrl.prototype.setToolTip = function () {
            var me = this;
            return me.accountDash.Account.InvestmentPolicy;
        };
        AccountDashComponentCtrl.prototype.onDispose = function () {
            var me = this;
            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);
            _super.prototype.onDispose.call(this);
        };
        AccountDashComponentCtrl.prototype.onAccountChanged = function (accountNumber) {
            var me = this;
            me.reloadData();
        };
        AccountDashComponentCtrl.prototype.reloadData = function () {
            var me = this;
            var emptyRequest = {
                // Init UiRequestBase
                name: "getCurrentAccount",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
            };
            me.handleRequest("/api/Dashboard/Account", emptyRequest).then(function (accountDash) {
                accountDash.Account = me.accountStore.getCurrentAccount();
                me.applyChanges(function () {
                    me.accountDash = accountDash;
                });
                var res = '';
                if (!me.accountDash || !me.accountDash.Account || me.accountDash.Account.InvestmentPolicy)
                    return;
                var policy = me.accountDash.Account.InvestmentPolicy;
                var splitedPolicy = policy.split(' ');
                for (var i = 0; i < splitedPolicy.length; i++) {
                    var currentLength = res.length;
                    var newItemLength = splitedPolicy[i].length;
                    if (currentLength + newItemLength > 22) {
                        res += '...';
                        me.InvestmentPolicy = res;
                        continue;
                    }
                    res += splitedPolicy[i];
                }
            }).fail(function (err) { me.$log.log("Error in AccountDashComponentCtrl in Account - Error Message:" + err.InternalMessage); });
            //me.dashboardStore.getAccountDash(me.accountStore.currentAccountNumber)
            //    .then((accountDash: AccountDash) => {
            //        accountDash.Account = me.accountStore.getCurrentAccount();
            //        me.applyChanges(() => {
            //            me.accountDash = accountDash;
            //        });
            //    });
        };
        return AccountDashComponentCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("AccountDashComponentCtrl", [
        "$scope",
        //"AccountStore",
        //"DashboardStore",
        AccountDashComponentCtrl
    ]);
    angular.module("Danel").directive("danelAccountDash", ["$log", function ($log) {
            return {
                restrict: "E",
                scope: {},
                templateUrl: Danel.HttpService.fixUrl("/views/Directive/AccountDash"),
                replace: true,
                controller: "AccountDashComponentCtrl as ctrl",
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=AccountDashComponent.js.map