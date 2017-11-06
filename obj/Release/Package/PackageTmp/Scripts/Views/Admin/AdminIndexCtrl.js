/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var AdminIndexCtrl = (function (_super) {
        __extends(AdminIndexCtrl, _super);
        function AdminIndexCtrl($scope, $state) {
            var _this = _super.call(this, "AdminIndexCtrl", $scope) || this;
            var me = _this;
            me.userNameFilter = '';
            me.firstNameFilter = '';
            me.lastNameFilter = '';
            me.idNumberFilter = '';
            me.state = $state;
            //me.adminStore = adminStore;
            var emptyRequest = {
                // Init UiRequestBase
                name: "GetAllUsers",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }]
            };
            me.handleRequest("/api/Admin/GetAllUsers", emptyRequest).then(function (model) {
                me.applyChanges(function () {
                    me.filterResultsCount = model.Users.length;
                    me.model = model;
                });
            }).fail(function (err) { me.$log.log("Error in AdminIndexCtrl in GetAllUsers - Error Message:" + err.InternalMessage); });
            //me.adminStore.getAllUsers()
            //    .then((model) => {
            //        me.applyChanges(() => {
            //            me.filterResultsCount = model.Users.length;
            //            me.model = model;
            //        });
            //    });
            me.setGrid = function (gridtwidget) {
                me.gridWidget = gridtwidget;
            };
            me.$scope.$watch(function () {
                return me.gridWidget;
            }, function (newValue, oldValue) {
                me.gridWidget = newValue;
                me.gridWidget.setGridOptions({
                    selectable: "single", change: function () {
                        var selectedItem = me.gridWidget.kendoGrid.dataItem(me.gridWidget.kendoGrid.select());
                        var userID = selectedItem["UserID"];
                        var userPhone = selectedItem["UserPhone"];
                        var userAddress = selectedItem["UserAddress"];
                        var userEmail = selectedItem["UserEmail"];
                        var userName = selectedItem["UserName"];
                        var dt = selectedItem["LastLoginDate"];
                        var m = dt.getMonth() + 1;
                        var da = dt.getDay();
                        var y = dt.getFullYear();
                        var lastLoginDate = da + '/' + m + '/' + y;
                        me.authService.impersonateAs(userID, userPhone, userAddress, userEmail, userName, lastLoginDate).then(function (res) {
                            switch (res) {
                                case true:
                                    me.redirect("/dashboard");
                                    //me.state.go("home.dashboard");
                                    break;
                            }
                        }).fail(function (err) {
                            me.$log.log("Error in AdminIndexCtrl in impersonateAs - Error Message:" + err.InternalMessage);
                        });
                        ;
                    }
                });
            });
            return _this;
        }
        AdminIndexCtrl.prototype.filter = function () {
            var me = this;
            me.modelIsFiltered = true;
            me.gridWidget.kendoGrid.dataSource.filter({});
            var currentFilters = [];
            currentFilters.push({
                field: 'UserName',
                operator: 'contains',
                value: me.userNameFilter
            });
            currentFilters.push({
                field: 'UserFirstName',
                operator: 'contains',
                value: me.firstNameFilter
            });
            currentFilters.push({
                field: 'UserLastName',
                operator: 'contains',
                value: me.lastNameFilter
            });
            currentFilters.push({
                field: 'UserID',
                operator: 'contains',
                value: me.idNumberFilter
            });
            me.gridWidget.kendoGrid.dataSource.filter({
                logic: "and",
                filters: currentFilters
            });
            me.filterResultsCount = me.gridWidget.kendoGrid.dataSource.total();
        };
        AdminIndexCtrl.prototype.resetFilter = function () {
            var me = this;
            me.userNameFilter = '';
            me.firstNameFilter = '';
            me.lastNameFilter = '';
            me.idNumberFilter = '';
            me.gridWidget.kendoGrid.dataSource.filter({});
            me.modelIsFiltered = false;
            me.filterResultsCount = me.model.Users.length;
        };
        return AdminIndexCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("AdminIndexCtrl", [
        "$scope",
        "$state",
        //"AdminStore",
        AdminIndexCtrl
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=AdminIndexCtrl.js.map