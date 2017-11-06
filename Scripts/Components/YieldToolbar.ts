/// <reference path="../typings/angularjs/angular.d.ts" />

module Danel {
    class YieldToolbarCtrl extends DanelCtrl {
        private toolbarMap;
        private dateFromObject: Date;
        private dateToObject: Date;
        private resolution: any;
        private toolbarBtnClick: Event;
        private showDate: boolean;
        lblColor: string;
        constructor($scope) {
            super("YieldToolbarCtrl", $scope);
            var me = this;
            me.showDate = false;

            //Add Parameters Map to the Parameters Service
            me.toolbarMap = me.parametersService.getParametersMap("YieldToolbarCtrl", "PersistentMap");

            // Add Event to the events service
            me.toolbarBtnClick = me.eventService.addEvent("YieldToolbarCtrl", "BtnClick", me.toolbarMap);

            // initialize toolbar elements
            me.initToolBar();

            me.$scope.toolbarOptions = {
                id: 'toolbar',
                items: [
                    {
                        template: "<span style='color:{{ctrl.lblColor }}' class='toolbar-title main-fore-color'>תקופה</span>",
                        overflowTemplate: "<span></span>"
                    },
                    {
                        type: "buttonGroup",
                        buttons: [
                            {
                                attributes: { "class": "rButton", "id": "YearStart", "ng-click": 'ctrl.onClick("YearStart")' }, text: "מתחילת השנה", togglable: true, group: "param", selected: me.isSelected('YearStart')
                            },
                            {
                                attributes: { "class": "mButton", "id": "Yearly", "ng-click": 'ctrl.onClick("Yearly")' }, text: "12 חודשים אחרונים", togglable: true, group: "param", selected: me.isSelected('Yearly')
                            },
                            {
                                attributes: { "class": "lButton", "id": "Quarterly", "ng-click": 'ctrl.onClick("Quarterly")' }, text: "רבעוני", togglable: true, group: "param", selected: me.isSelected('Quarterly')
                            },
                        ]
                    },
                    //{
                    //    template: '<span class="dateLblEX" ng-show="ctrl.showDate">מתאריך</span>',
                    //    overflowTemplate: "<span></span>"
                    //},
                    //{
                    //    template: '<input kendo-date-picker ng-show="ctrl.showDate" k-ng-model="ctrl.dateFromObject" />',
                    //    enable: false,
                    //    overflowTemplate: "<span></span>"
                    //},
                    //{
                    //    template: '<span class="dateLblEX" ng-show="ctrl.showDate">עד תאריך</span>',
                    //    overflowTemplate: "<span></span>"
                    //},
                    //{
                    //    template: '<input kendo-date-picker ng-show="ctrl.showDate" k-ng-model="ctrl.dateToObject" />',
                    //    overflowTemplate: "<span></span>"
                    //},
                    //{ template: '<span class="dateLblEX" ng-show="ctrl.showDate">רזולוציה</span>' },
                    //{
                    //    template: '<div ng-show="ctrl.showDate" ><input kendo-drop-down-list class="tb-drop-down yield-drop-down" k-options="formatOptions" k-ng-model="ctrl.resolution" style="width: 150px;" /></div>',
                    //    overflow: "never"
                    //},
                ]
            };

            $scope.formatOptions = {
                optionLabel: "אנא בחר",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "חודשי", value: "ByMonth" },
                    { text: "רבעוני", value: "ByQuarter" },
                    { text: "תקופה", value: "ByPeriod" },
                ]
            };

            me.$scope.$watch(
                function () {
                    return me.dateFromObject;
                },
                function (newValue, oldValue) {

                    if (newValue == oldValue)
                        return;

                    me.toolbarMap.startDate = me.dateFromObject.toLocaleDateString();
                    me.toolbarBtnClick.fireWithParams();
                });

            me.$scope.$watch(
                function () {
                    return me.dateToObject;
                },
                function (newValue, oldValue) {

                    if (newValue == oldValue)
                        return;

                    me.toolbarMap.endDate = me.dateToObject.toLocaleDateString();
                    me.toolbarBtnClick.fireWithParams();
                });

            me.$scope.$watch(
                function () {
                    return me.resolution;
                },
                function (newValue, oldValue) {

                    if (newValue == oldValue)
                        return;

                    me.toolbarMap.periodDate = me.resolution.value;
                    me.toolbarBtnClick.fireWithParams();
                });

            var buttons: Array<Object> = me.$scope.toolbarOptions.items[1].buttons;
            buttons.forEach(function (item) {
                if (item["selected"])
                    me.toolbarMap.period = item["attributes"]["id"];
            });

            me.lblColor = me.mainColor;           
        }



        private initToolBar() {
            var me = this;

            if (me.toolbarMap.startDate == null) {
                me.dateFromObject = new Date();
                me.toolbarMap.startDate = me.dateFromObject.toLocaleDateString();
            }
            else {
                me.dateFromObject = new Date(me.toolbarMap.startDate);
            }

            if (me.toolbarMap.endDate == null) {
                me.dateToObject = new Date();
                me.toolbarMap.endDate = me.dateToObject.toLocaleDateString();
            }
            else {
                me.dateToObject = new Date(me.toolbarMap.endDate);
            }
        }


        private isSelected(buttonId: string): boolean {
            var me = this;

            if (me.toolbarMap == null || me.toolbarMap.buttonId == null) {
                if (buttonId == "Yearly")
                    return true;
                return false;
            }

            if (me.toolbarMap.buttonId == buttonId)
                return true;

            return false;
        }

        private onClick(buttonId: string) {
            var me = this;
            var lShowDate: boolean;

            if (buttonId == null || buttonId == "Yearly") {
                me.toolbarMap.period = "Yearly";
                me.toolbarBtnClick.fireWithParams();
            }


            if (buttonId == "YearStart") {
                me.toolbarMap.period = "YearStart";
                me.toolbarBtnClick.fireWithParams();
            }



            if (buttonId == "Quarterly") {
                me.toolbarMap.period = "Quarterly";
                me.toolbarBtnClick.fireWithParams();
            }

            //if (buttonId == "ByDate") {
            //    me.parameterMap.period = "ByDate";
            //    me.toolbarBtnClick.fireWithParams();
            //    lShowDate = true;
            //}

            me.applyChanges(() => {
                //me.showDate = lShowDate;
                me.toolbarMap.buttonId = buttonId;
            });
        }
    }

    angular.module('Danel')
        .controller("YieldToolbarCtrl",
        [
            "$scope",
            "ParametersService",
            "EventsService",
            YieldToolbarCtrl
        ])
        .directive("danelYieldToolbar", function () {
            return {
                restrict: "E",
                scope: {},
                replace: true,
                templateUrl: HttpService.fixUrl("/views/Directive/YieldToolbar"),
                controller: "YieldToolbarCtrl as ctrl",
            };
        });
}
