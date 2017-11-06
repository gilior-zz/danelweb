/// <reference path="../../typings/angularjs/angular.d.ts" />

module Danel {
    class AdminIndexCtrl extends DanelCtrl {
        //private adminStore: AdminStore;
        public model: UsersDash;
        public gridWidget: GridWidget;
        public setGrid: Function;
        public userNameFilter: String;
        public firstNameFilter: String;
        public lastNameFilter: String;
        public idNumberFilter: String;
        public filterResultsCount: number;
        public modelIsFiltered: Boolean;
        state;
        constructor($scope, $state) {
            super("AdminIndexCtrl", $scope);
            var me = this;
            me.userNameFilter = '';
            me.firstNameFilter = '';
            me.lastNameFilter = '';
            me.idNumberFilter = '';
            me.state = $state;
            //me.adminStore = adminStore;
            var emptyRequest: EmptyRequest = <EmptyRequest>{

                // Init UiRequestBase
                name: "GetAllUsers",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }]

                // Set AccountsRequest

            };

            me.handleRequest("/api/Admin/GetAllUsers", emptyRequest).then((model) => {
                me.applyChanges(() => {
                    me.filterResultsCount = model.Users.length;
                    me.model = model;
                });
            }).fail((err) => { me.$log.log("Error in AdminIndexCtrl in GetAllUsers - Error Message:" + err.InternalMessage); });
            //me.adminStore.getAllUsers()
            //    .then((model) => {
            //        me.applyChanges(() => {
            //            me.filterResultsCount = model.Users.length;
            //            me.model = model;
            //        });
            //    });
            me.setGrid = (gridtwidget: GridWidget) => {
                me.gridWidget = gridtwidget;
            }
            me.$scope.$watch(
                function () {
                    return me.gridWidget;
                },
                function (newValue, oldValue) {
                    me.gridWidget = newValue;
                    me.gridWidget.setGridOptions({
                        selectable: "single", change: function () {
                            var selectedItem = me.gridWidget.kendoGrid.dataItem(me.gridWidget.kendoGrid.select());
                            var userID = selectedItem["UserID"];
                            var userPhone = selectedItem["UserPhone"];
                            var userAddress = selectedItem["UserAddress"];
                            var userEmail = selectedItem["UserEmail"];
                            var userName = selectedItem["UserName"];
                            var dt = <Date>selectedItem["LastLoginDate"];
                            var m = dt.getMonth()+1;
                            var da = dt.getDay();
                            var y = dt.getFullYear();
                            var lastLoginDate = da + '/' + m + '/' + y;
                            me.authService.impersonateAs(userID, userPhone, userAddress, userEmail, userName, lastLoginDate).then((res: boolean) => {
                                switch (res) {
                                    case true:
                                        me.redirect("/dashboard");
                                        //me.state.go("home.dashboard");
                                        break;
                                }
                            }).fail(err => {
                                me.$log.log("Error in AdminIndexCtrl in impersonateAs - Error Message:" + err.InternalMessage);
                            });;
                        }
                    });
                });
        }


        public filter(): void {
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
        }

        public resetFilter(): void {
            var me = this;
            me.userNameFilter = '';
            me.firstNameFilter = '';
            me.lastNameFilter = '';
            me.idNumberFilter = '';
            me.gridWidget.kendoGrid.dataSource.filter({});
            me.modelIsFiltered = false;
            me.filterResultsCount = me.model.Users.length;
        }

    }

    angular.module("Danel").controller("AdminIndexCtrl",
        [
            "$scope",
            "$state",
            //"AdminStore",
            AdminIndexCtrl
        ]);
}
