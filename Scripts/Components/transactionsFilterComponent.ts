/// <reference path="../typings/angularjs/angular.d.ts" />
module Danel {
    class TransactionsFilterCtrl extends DanelCtrl {
        private transactionsParametersMap;
        private dateFromObject: Date;
        private dateToObject: Date;
        private toolbarBtnClick: Event;
        private showDate: boolean;
        lblColor: string;
        constructor($scope) {
            super("TransactionsFilterCtrl", $scope);
            var me = this;
            me.dateFromObject = new Date();
            me.dateToObject = new Date();
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);
            me.showDate = false;

            //Add Parameters Map to the Parameters Service
            me.transactionsParametersMap = me.parametersService.getParametersMap("transactionsParametersMap", "PersistentMap");

            // Add Event to the events service
            me.toolbarBtnClick = me.eventService.addEvent("TransactionsFilter", "transactionRangeChanged", me.transactionsParametersMap);

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
                                attributes: { "class": "rButton", "ng-click": 'ctrl.onClick("lastM")' }, text: "מתחילת החודש", togglable: true, group: "param", selected: me.isSelected('lastM')
                            },
                            {
                                attributes: { "class": "mButton", "ng-click": 'ctrl.onClick("lastQ")' }, text: "מתחילת הרבעון", togglable: true, group: "param", selected: me.isSelected('lastQ')
                            },
                            {
                                attributes: { "class": "mButton", "ng-click": 'ctrl.onClick("beginningOfYear")' }, text: "מתחילת השנה", togglable: true, group: "param", selected: me.isSelected('beginningOfYear')
                            },
                            {
                                attributes: { "class": "mButton", "ng-click": 'ctrl.onClick("lastY")' }, text: "שנה אחרונה", togglable: true, group: "param", selected: me.isSelected('lastY')
                            },
                            {
                                attributes: { "class": "lButton", "ng-click": 'ctrl.onClick("range")' }, text: "בין תאריכים", togglable: true, group: "param", selected: me.isSelected('range')
                            },
                        ]
                    },
                    {
                        template: '<span class="dateLblEX" ng-show="ctrl.showDate">מתאריך</span>',
                        overflowTemplate: "<span></span>"
                    },
                    {
                        template: '<input kendo-date-picker ng-show="ctrl.showDate" k-ng-model="ctrl.dateFromObject" />',
                        enable: false,
                        overflowTemplate: "<span></span>"
                    },
                    {
                        template: '<span class="dateLblEX" ng-show="ctrl.showDate">עד תאריך</span>',
                        overflowTemplate: "<span></span>"
                    },
                    {
                        template: '<input kendo-date-picker ng-show="ctrl.showDate" k-ng-model="ctrl.dateToObject" />',
                        overflowTemplate: "<span></span>"
                    },
                    //{
                    //    type: "button",
                    //    attributes: { "class": "filter-button", "ng-click": 'ctrl.onClick("activate")', ng-show="ctrl.showDate"' }, text: "הצגה", togglable: false
                    //},

                ]
            };

            me.watchData();
            me.lblColor = me.mainColor; 
            //me.fireEvent(me.transactionsParametersMap.period, me.dateFromObject, me.dateToObject);
        }

        private onAccountChanged(accountNumber) {
            var me = this;
            me.fireEvent(me.transactionsParametersMap.period, me.dateFromObject, me.dateToObject);
        }

        watchData(): void {
            var me = this;
            me.$scope.$watch(function () {
                return me.dateFromObject;
            },
                function (newValue: Date, oldValue: Date) {
                    if (me.isSelected('range'))
                        me.fireEvent("range", newValue, me.dateToObject);
                });
            me.$scope.$watch(function () {
                return me.dateToObject;
            },
                function (newValue: Date, oldValue: Date) {
                    if (me.isSelected('range'))
                        me.fireEvent("range", me.dateFromObject, newValue);
                });

        }


        private fireEvent(period: string= "lastM", from: Date= null, to: Date= null): void {
            var me = this;
            me.transactionsParametersMap.period = period;

            if (from != null)
                me.transactionsParametersMap.from = from;

            if (to != null)
                me.transactionsParametersMap.to = to;

            me.toolbarBtnClick.fireWithParams();
        }

        private isSelected(buttonId: string): boolean {
            var me = this;

            if (me.transactionsParametersMap == null || me.transactionsParametersMap.buttonId == null) {
                if (buttonId == "lastM")
                    return true;
                return false;
            }

            if (me.transactionsParametersMap.buttonId == buttonId) {

                if (buttonId == "range") {
                    me.applyChanges(() => {
                        me.showDate = true;
                    });
                }

                return true;
            }

            return false;
        }

        private onClick(buttonId: string) {
            var me = this;
            var lShowDate: boolean;

            if (buttonId == null || buttonId == "lastM") {
                me.transactionsParametersMap.period = "lastM";
                me.fireEvent("lastM");

            }

            if (buttonId == "lastQ") {
                me.transactionsParametersMap.period = "lastQ";
                me.fireEvent("lastQ");

            }

            if (buttonId == "lastY") {
                me.fireEvent("lastY");
                me.transactionsParametersMap.period = "lastY";
            }
            if (buttonId == "beginningOfYear") {
                me.fireEvent("beginningOfYear");
                me.transactionsParametersMap.period = "beginningOfYear";
            }

            if (buttonId == "range") {
                me.transactionsParametersMap.period = "range";
                lShowDate = true;
                me.fireEvent("range", me.dateFromObject, me.dateToObject);
            }


            me.applyChanges(() => {
                me.showDate = lShowDate;
                me.transactionsParametersMap.buttonId = buttonId;
            });
        }
    }

    angular.module('Danel')
        .controller("TransactionsFilterCtrl",
        [
            "$scope",
            "ParametersService",
            "EventsService",
            "AccountStore",
            TransactionsFilterCtrl
        ])
        .directive("danelTransactionsFilter", function () {
            return {
                restrict: "E",
                scope: {},
                replace: true,
                templateUrl: HttpService.fixUrl("/views/Directive/TransactionsFilter"),
                controller: "TransactionsFilterCtrl as ctrl",
            };
        });
}





//module Danel {
//    class TransactionsFilterCtrl extends BaseCtrl {              
//        private parameterMap;
//        private parametersService: ParametersService;
//        private eventsService: EventsService;     
//        public dateFromObject: Date;
//        public dateToObject: Date;
//        private rangeChangedEvent: Event;
//        constructor($scope, parametersService: ParametersService, eventsService: EventsService) {
//            var me = this;
//            super("TransactionsFilterCtrl", $scope);
//            me.eventsService = eventsService;
//            me.dateFromObject = new Date();
//            me.dateToObject = new Date();
//            me.eventsService = eventsService;
//            me.parametersService = parametersService;
//            me.parameterMap = me.parametersService.getParametersMap("transactionsRangeMap", "PersistentMap");
//            me.rangeChangedEvent = me.eventsService.addEvent("TransactionsFilter", "transactionRangeChanged", me.parameterMap);
//            me.$scope.toolbarOptions = {
//                id: 'toolbar',
//                items: [
//                    {
//                        template: "<span id='period'>תקופה</span>",
//                        overflowTemplate: "<span></span>"
//                    },
//                    {
//                        type: "buttonGroup",
//                        buttons: [
//                            {
//                                id: "lastM", text: "חודש אחרון", togglable: true, group: "param", toggle:
//                                function (e) {
//                                    me.disableRanges();
//                                    me.fireEvent("lastM");
//                                }
//                            },
//                            {
//                                id: "lastQ", text: "רבעון אחרון", togglable: true, group: "param", toggle:
//                                function (e) {
//                                    me.disableRanges();
//                                    me.fireEvent("lastQ");
//                                }
//                            },
//                            {
//                                id: "lastY", text: "שנה אחרונה", togglable: true, group: "param", toggle:
//                                function (e) {
//                                    me.disableRanges();
//                                    me.fireEvent("lastY");
//                                }
//                            },

//                            {
//                                id: "range", text: "בין תאריכים", togglable: true, group: "param", toggle:
//                                function (e) {
//                                    me.enableRanges();
//                                    me.fireEvent("range", me.dateFromObject, me.dateToObject);
//                                }
//                            },
//                        ]
//                    },
//                    {
//                        template: "<span id='dateLblEX'>מתאריך</span>",
//                        overflowTemplate: "<span></span>"

//                    },
//                    {
//                        template: " <input kendo-date-picker k-ng-model='ctrl.dateFromObject' id='dateFromObject' disabled  / >",
//                        enable: false,
//                        overflowTemplate: "<span></span>"
//                    },
//                    {
//                        template: "<span id='dateLblEX'>עד תאריך</span>",
//                        overflowTemplate: "<span></span>"
//                    },
//                    {
//                        template: " <input kendo-date-picker  k-ng-model='ctrl.dateToObject' id='dateToObject' disabled / >",
//                        overflowTemplate: "<span></span>"
//                    },
//                    {
//                        type: "button",
//                        id: "refresh", text: "הצגה", togglable: false, enable: false, click: function (e) {
//                            me.enableRanges();
//                            me.fireEvent("range", me.dateFromObject, me.dateToObject);
//                        }
//                    },

//                ]
//            };
//        }

//        public fireEvent(period: string, from: Date= null, to: Date= null): void {
//            var me = this;
//            me.parameterMap.period = period;
//            if (from != null)
//                me.parameterMap.from = from;
//            if (to != null)
//                me.parameterMap.to = to;
//            me.rangeChangedEvent.fireWithParams();
//        }

//        public refresh(): void {
//            var me = this;
//            me.fireEvent("range", me.dateFromObject, me.dateToObject);
//        }

//        public lastMClick(): void {
//            var me = this;

//            //me.disableRanges();
//        }


//        public lastQClick(): void {
//            var me = this;
//            //me.disableRanges();
//        }
//        public lastYClick(): void {
//            var me = this;
//            //me.disableRanges();
//        }

//        public rangeClick(): void {
//            var me = this;
//            //me.enableRanges();
//        }

//        public enableRanges(): void {
//            $('#dateFromObject').removeAttr('disabled');
//            $('#dateToObject').removeAttr('disabled');
//            var toolbar = $("#toolbar").data("kendoToolBar");
//            toolbar.enable("#refresh");
//            $('#dateLblEX').css('font-weight', 'bolder');
//            $('#refresh').css('background', '#8db83f');
//        }

//        public disableRanges(): void {
//            var me = this;
//            $('#dateToObject').attr('disabled', 'disabled');
//            $('#dateFromObject').attr('disabled', 'disabled');
//            var toolbar = $("#toolbar").data("kendoToolBar");
//            toolbar.enable("#refresh", false);
//            $('#dateLblEX').css('font-weight', 'lighter');
//            $('#refresh').css('background', '#f7f7f8');
//        }
//    }

//    angular.module('Danel')
//        .controller("TransactionsFilterCtrl",
//        [
//            "$scope",
//            "ParametersService",
//            "EventsService",
//            TransactionsFilterCtrl
//        ])
//        .directive("danelTransactionsFilter", function () {
//            return {
//                restrict: "E",
//                scope: {},
//                replace: true,
//                templateUrl: HttpService.fixUrl("/views/Directive/TransactionsFilter"),
//                controller: "TransactionsFilterCtrl as ctrl",
//            };
//        });
//}

