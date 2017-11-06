module Danel {
    class YieldDashComponentCtrl extends DanelCtrl {



        private yieldDataUpdateParameterMap;
        private toolbarMap;
        private yieldPeriod: string;

        private indexMap;
        private danelShowIndex: string;

        private showTitle: boolean;

        public setchart: Function;
        public chartwidget: ChartWidget;
        public yields: YieldDash;
        public categoryLabelTemplate: string;

        constructor($scope) {

            super("YieldDashComponentCtrl", $scope);

            var me = this;

           

            // Present the component Title
            me.showTitle = true;

            //Yield Data Update Event
            me.yieldDataUpdateParameterMap = me.parametersService.addParameterMap("YieldDataUpdate");
            me.eventService.addEvent("DataManager", "YieldDataUpdate", me.yieldDataUpdateParameterMap);

            // should come form Constants
            me.toolbarMap = me.parametersService.getParametersMap("YieldToolbarCtrl", "PersistentMap");
            me.eventService.getEvent("YieldToolbarCtrl", "BtnClick").addEventHandler(me, me.onTollbarBtnClick);


            // Add Index related Event & Data
            me.indexMap = me.parametersService.getParametersMap("IndexSelection", "PersistentMap");
            me.eventService.getEvent("IndexSelection", "IndexAdded").addEventHandler(me, me.getYieldData);
            me.eventService.getEvent("IndexSelection", "IndexChanged").addEventHandler(me, me.updateChartOptions);

            // Add Account Event & Data
            me.accountStore.accountChanged.addEventHandler(me, me.onAccountChanged);

            me.setchart = (chartWidget: ChartWidget) => {
                me.chartwidget = chartWidget;

            }

            me.$scope.initYieldDash = (danelShowIndex: string, danelShowTitle: boolean) => {
                me.danelShowIndex = danelShowIndex;
                me.updateChartOptions(me.indexMap);

                //if (me.danelShowIndex != "false")
                //    me.yieldPeriod = "YearStart";
                //else
                //    me.yieldPeriod = "Yearly";

                // Get Yield Data From Server
                me.getYieldData(me.indexMap);

                me.applyChanges(() => {
                    me.showTitle = danelShowTitle;
                    if (me.danelShowIndex == "true") {
                        me.chartwidget.setChartOptions({
                            chartArea: { margin: 40, height: 416 },
                            //plotArea: { margin: 0, padding: 0, height: 250},
                        });
                    }
                });
            }

        }



        onDispose() {
            var me = this;

            me.accountStore.accountChanged.removeEventHandler(me, me.onAccountChanged);

            me.eventService.getEvent("YieldToolbarCtrl", "BtnClick").removeEventHandler(me, me.onTollbarBtnClick);
            me.eventService.getEvent("IndexSelection", "IndexAdded").removeEventHandler(me, me.getYieldData);
            me.eventService.getEvent("IndexSelection", "IndexChanged").removeEventHandler(me, me.updateChartOptions);

            super.onDispose();
        }

        private goToPage() {
            var me = this;
            me.state.go("home.yield");
        }

        private updateChartOptions(params) {
            var me = this;

            me.indexMap = params;

            if (me.chartwidget == null)
                return;

            if (me.danelShowIndex != "false") {
                if (me.validIndex(params["Index1Id"]) && me.validIndex(params["Index2Id"])) {
                    me.chartwidget.setChartOptions({
                        series: [
                            {
                                field: "GrossAccumulated",
                                categoryField: "Month",
                                type: "column",
                                color: "#7C9897",
                            },
                            {
                                field: "Index1",
                                categoryField: "Month",
                                type: "column",
                                color: "#B35D75",

                            },
                            {
                                field: "Index2",
                                categoryField: "Month",
                                type: "column",
                                color: "#AEDB93",
                            }
                        ]
                    });
                    return;
                }

                if (me.validIndex(params["Index1Id"])) {
                    me.chartwidget.setChartOptions({
                        series: [
                            {
                                field: "GrossAccumulated",
                                categoryField: "Month",
                                type: "column",
                                color: "#7C9897",
                            },
                            {
                                field: "Index1",
                                categoryField: "Month",
                                type: "column",
                                color: "#B35D75",
                            }
                        ]
                    });
                    return;
                }

                if (me.validIndex(params["Index2Id"])) {
                    me.chartwidget.setChartOptions({
                        series: [
                            {
                                field: "GrossAccumulated",
                                categoryField: "Month",
                                type: "column",
                                color: "#7C9897",
                            },
                            {
                                field: "Index2",
                                categoryField: "Month",
                                type: "column",
                                color: "#AEDB93",
                            }
                        ]
                    });
                    return;
                }
            }


            me.chartwidget.setChartOptions({
                tooltip: {
                    format: "{0:N2}%",
                    visible: true,
                },
                series: [
                    {
                        field: "GrossAccumulated",
                        categoryField: "Dummy",
                        type: "line",
                        style:'smooth',
                        //color: "#cfc1a7",
                        name: "תשואה מצטברת"

                    }
                ]



            });
        }



        private getYieldData(params) {
            var me = this;

            me.indexMap = params;
            me.reloadData();

            me.updateChartOptions(params);
        }

        private validIndex(indexObject): boolean {
            if (indexObject == 'undefined' || indexObject == null || indexObject.Active == "0" || indexObject.Id == 'undefined' || indexObject.Id == null || indexObject.Id == "-1" || indexObject.Id == "")
                return false;

            return true;
        }

        private onTollbarBtnClick(params) {
            var me = this;

            if (params == null || params.period == null) {
                me.yieldPeriod = "Yearly";
                return;
            }

            // Save parameters in toolbarMap
            me.toolbarMap = params;

            me.yieldPeriod = <string>params.period;

            //if (me.yieldPeriod == "ByDate") {

            //    if (params.datePeriod == null || params.datePeriod == "") {
            //        //alert("אנא בחר רזולוציה");
            //        return;
            //    }
            //    else {
            //        if (params.startDate == null || params.startDate == "") {
            //            //alert("אנא בחר תאריך התחלה");
            //            return;
            //        }

            //        if (params.startDate == null || params.startDate == "") {
            //            //alert("אנא בחר תאריך סיום");
            //            return;
            //        }
            //    }

            //}

            me.reloadData();
        }

        private onAccountChanged(accountNumber) {
            var me = this;

            me.reloadData();
        }

        private getData(accountNumber: string, period: string, index1Id: string, index2Id: string): Q.Promise<YieldDash> {
            var me = this;

            var yieldRequest: YieldRequest = <YieldRequest>{

                // Init UiRequestBase
                name: "YieldRequest",
                entityList: [{ Id: accountNumber, EntityType: 50 }],

                // Set YieldRequest
                period: period,
                index1Id: index1Id,
                index2Id: index2Id
            };

            return me.handleRequest("/api/Dashboard/Yield", yieldRequest);
        }

        private reloadData() {
            var me = this;

            var startDate: string = "";
            var endDate: string = "";
            var index1Id: string = "";
            var index2Id: string = "";
            var period: string = "Yearly";


            if (me.indexMap != null) {

                if (me.indexMap["Index1Id"] != null)
                    index1Id = me.indexMap["Index1Id"].Id;

                if (me.indexMap["Index2Id"] != null)
                    index2Id = me.indexMap["Index2Id"].Id;
            }

            if (me.toolbarMap) {

                if (me.toolbarMap.period != null && me.state.current.name != "home.dashboard")
                    period = me.toolbarMap.period;
            }

            me.getData(me.accountStore.currentAccountNumber, period, index1Id, index2Id)
                .then((yieldDash) => {
                    me.applyChanges(() => {

                        if (yieldDash == null)
                            me.yields = { Months: [], GridMonths: [] };
                        else
                            me.yields = yieldDash;

                        //
                        //  Create field for Month+Year name
                        //
                        me.yields.Months.forEach((month) => {
                            month.MonthName = me.localeService.getMonthShortName(month.Month);
                        });

                        if (me.chartwidget != null) {
                            // Update the Period so the widgets will update the category Lable Template
                            if (period == "Yearly" || period == "YearStart")
                                //me.categoryLabelTemplate = "#: dataItem.MonthName #\n#: dataItem.Year #";
                                me.chartwidget.setChartOptions({
                                    categoryAxis: [
                                        {
                                            labels: {
                                                template: "#: dataItem.MonthName #\n#: dataItem.Year #",
                                            },
                                            majorGridLines: { visible: false },
                                        }
                                    ]
                                });
                            else
                                //me.categoryLabelTemplate = "Q#:dataItem.Month #";
                                me.chartwidget.setChartOptions({
                                    categoryAxis: [
                                        {
                                            labels: {
                                                template: "#: dataItem.MonthName #\n#: dataItem.Year #",

                                                //margin: { top: 144 },
                                            },
                                            majorGridLines: { visible: false },
                                        }
                                    ]
                                });
                        }
                    });

                    // Fire YieldDataUpdate Event
                    me.yieldDataUpdateParameterMap["YieldModel"] = me.yields;
                    me.eventService.getEvent("DataManager", "YieldDataUpdate").fireWithParams();
                }).fail(err => {
                    me.yields = null;
                    me.$log.log("Error in YieldDashComponent in reloadData - Error Message:" + err.InternalMessage);
                });
        }

    }


    angular.module("Danel").controller("YieldDashComponentCtrl",
        [
            "$scope",
            YieldDashComponentCtrl
        ]);

    angular.module("Danel").directive("danelYieldDash", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/YieldDash"),
            replace: true,
            link: function (scope, element, attrs) {
                scope.danelShowIndex = attrs.danelShowIndex;
                scope.danelShowTitle = attrs.danelShowTitle;
                scope.initYieldDash(attrs.danelShowIndex, !attrs.danelShowTitle);
            },
            controller: "YieldDashComponentCtrl as ctrl",
        };
    }]);
}





//private reloadData() {
//    var me = this;
//    var periodDate: string = "";
//    var startDate: string = "";
//    var endDate: string = "";
//    var index1Id: string = "";
//    var index2Id: string = "";

//    if (me.indexMap != null) {

//        if (me.indexMap["Index1Id"] != null)
//            index1Id = me.indexMap["Index1Id"].Id;

//        if (me.indexMap["Index2Id"] != null)
//            index2Id = me.indexMap["Index2Id"].Id;
//    }

//    if (me.toolbarMap) {

//        if (me.toolbarMap.periodDate != null)
//            periodDate = me.toolbarMap.periodDate;

//        if (me.toolbarMap.startDate != null)
//            startDate = me.toolbarMap.startDate;

//        if (me.toolbarMap.endDate != null)
//            endDate = me.toolbarMap.endDate;
//    }


//    me.applyChanges(() => {

//        me.yields = <YieldDash>{};

//        me.yields.Months = <YieldDashMonth[]>[
//            { Month: 1, Year: 2011, Yield: 1.3, Index1: 0.8, Index2: 0.3 },
//            { Month: 2, Year: 2011, Yield: 0.5, Index1: -0.9, Index2: 0.7 },
//            { Month: 3, Year: 2011, Yield: 1.3, Index1: 0.8, Index2: 0.9 },
//            { Month: 4, Year: 2011, Yield: 0.5, Index1: -0.9, Index2: 0.1 },
//            { Month: 5, Year: 2011, Yield: 1.3, Index1: 0.8, Index2: 0.5 },
//            { Month: 6, Year: 2011, Yield: 0.5, Index1: -0.9, Index2: 0.7 },
//            { Month: 7, Year: 2011, Yield: 1.3, Index1: 0.8, Index2: 0.8 },
//            { Month: 8, Year: 2011, Yield: 0.5, Index1: -0.9, Index2: 0.6 },
//            { Month: 9, Year: 2011, Yield: 1.3, Index1: 0.8, Index2: 0.4 },
//            { Month: 10, Year: 2011, Yield: 0.5, Index1: -0.9, Index2: 0.6 },
//            { Month: 11, Year: 2011, Yield: 0.2, Index1: 0.8, Index2: 0.3 },
//            { Month: 12, Year: 2011, Yield: 60, Index1: -0.9, Index2: 0.5 },
//        ];

//        //
//        //  Create field for Month+Year name
//        //
//        me.yields.Months.forEach((month) => {
//            month.MonthName = me.localeService.getMonthShortName(month.Month);
//        });

//        if (me.chartwidget != null) {
//            // Update the Period so the widgets will update the category Lable Template
//            if (me.yieldPeriod == "Yearly")
//                //me.categoryLabelTemplate = "#: dataItem.MonthName #\n#: dataItem.Year #";
//                me.chartwidget.setChartOptions({
//                    categoryAxis: [
//                        {
//                            labels: {
//                                template: "#: dataItem.MonthName #\n#: dataItem.Year #",
//                                //padding: { top: 144 }, // Need to be computed in Runtime
//                            },
//                            majorGridLines: { visible: false }
//                        }
//                    ]
//                });
//            else
//                //me.categoryLabelTemplate = "Q#:dataItem.Month #";
//                me.chartwidget.setChartOptions({
//                    categoryAxis: [
//                        {
//                            labels: {
//                                template: "Q#:dataItem.Month #",
//                                //margin: { top: 144 },
//                            },
//                            majorGridLines: { visible: false }
//                        }
//                    ]
//                });
//        }


//        // Fire YieldDataUpdate Event
//        me.yieldDataUpdateParameterMap["YieldModel"] = me.yields;
//        me.eventService.getEvent("DataManager", "YieldDataUpdate").fireWithParams();
//    });
//}
