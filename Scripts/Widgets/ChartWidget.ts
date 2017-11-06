/// <reference path="../typings/kendo/kendo.all.d.ts" />

module Danel {
    angular.module("Danel").directive("danelChart", ["$parse", "ParametersService", function ($parse, parametersService) {

        //
        //  requiredAttrs & optionalAttrs are not part of angular
        //  They exist for documentation purpose only
        //

        var ddo = {
            restrict: "A",
            scope: {
                danelModel: "=",
                danelChartSet: "=",
                danelChartCategoryLabelTemplate: "=",
            },
            requiredAttrs: {
                danelModel: "=",
                danelChartType: "pie",
                danelValueField: "",
                danelTextField: "",
                height: "",

            },
            optionalAttrs: {
                danelChartSet: "=",
                danelColor: "blue",
                danelTitle: "",
                danelChartCategoryLabelTemplate: "",
                danelChartAreaMargin: "",
                danelChartSeriesLabelTemplate: "",
                legendVisible: "true",
                labelsVisible: ""

            },
            link: function (scope, element, attrs) {
                new ChartWidget(scope, element, attrs, ddo, parametersService);
            },
        };

        return ddo;
    }]);

    export class ChartWidget {
        scope;
        element: JQuery;
        attrs;
        kendoChart: kendo.dataviz.ui.Chart;
        map: {};
        ddo: any;

        constructor(scope, element, attrs, ddo, parameterService: ParametersService) {
            var me = this;

            me.scope = scope;
            me.element = element;
            me.attrs = attrs;
            me.ddo = ddo;

            me.validateAttrs(me.attrs);
            //var seriesArr: Array<String> = new Array<String>();
            var seriesArr = new Array();

            //seriesArr.push();
            var definitions = parameterService.GetDanelParameter(WebParameter.ColorsPlate).split('^');
            for (var i = 0; i < definitions.length; i++) {
                if (!definitions[i]) continue;
                var colorDefinition = definitions[i];
                seriesArr.push(colorDefinition);
            }
            //me.kendoChart.setOptions({ seriesColors: seriesArr });


            var options: kendo.dataviz.ui.ChartOptions = {

                transitions: false,
                title: attrs.danelTitle,
                legend: {
                    position: "left",
                    visible: !attrs.legendVisible
                },
                dataSource: {
                    data: scope.danelModel,
                },
                seriesDefaults: {
                    labels: {
                        visible: attrs.labelsVisible,
                        template: "#= category # - #= kendo.format('{0:n}%', value)#",
                        position: "outsideEnd",
                        background: "transparent"
                    }
                },
                series: [
                    {

                        field: attrs.danelValueField,
                        categoryField: attrs.danelTextField,
                        type: attrs.danelChartType,
                        highlight: {
                            visible: false
                        },
                        gap: 0,
                        spacing: 0,

                    }
                ],
                chartArea: {
                    background: "transparent",
                    height: +attrs.height,
                },

                seriesColors: seriesArr,

                categoryAxis: [

                    {

                        majorGridLines: {

                            visible: false,
                        },

                    }],

                valueAxis: [
                    {
                        labels: {
                            format: "{0}%"
                        },

                        line: false,
                    }
                ],

            };

            if (me.attrs.danelChartAreaMargin) {
                var str: string = me.attrs.danelChartAreaMargin;
                var parts = str.split(",");
                if (parts.length == 1) {
                    options.chartArea.margin = parseFloat(parts[0]);
                }
                else {
                    options.chartArea.margin = {
                        top: parseFloat(parts[0]),
                        right: parseFloat(parts[1]),
                        bottom: parseFloat(parts[2]),
                        left: parseFloat(parts[3]),
                    };
                }
            }

            me.element.kendoChart(options);

            me.kendoChart = element.data("kendoChart");

            scope.$watch("danelModel", function (newValue, oldValue) {
                if (newValue == oldValue) {
                    return;
                }

                if (newValue === undefined) {
                    newValue = [];
                }

                var dataSource = new kendo.data.DataSource({ data: newValue });
                me.kendoChart.setDataSource(dataSource);
            });

            if (scope.danelChartSet != null)
                scope.danelChartSet(me);
        }

        setChartOptions(options: kendo.dataviz.ui.ChartOptions) {
            var me = this;

            me.kendoChart.setOptions(options);
        }

        validateAttrs(attrs) {
            var me = this;

            for (var attrName in me.ddo.requiredAttrs) {
                if (!attrs[attrName]) {
                    throw new Error("ChartWidget directive: " + attrName + " attribute is missing");
                }
            }
        }
    }
}


//if (me.attrs.hasOwnProperty("danelChartSeriesLabel")) {
//    options.series[0].labels = {
//        position: "below",
//        visible: false,
//        background: "transparent",
//    };

//    if (me.attrs.danelChartSeriesLabelTemplate) {
//        options.series[0].labels.template = me.attrs.danelChartSeriesLabelTemplate;
//    }
//}

//if (me.attrs.danelChartCategoryLabelTemplate) {
//    options.categoryAxis[0].labels = options.categoryAxis[0].labels || {};
//    options.categoryAxis[0].labels.template = me.attrs.danelChartCategoryLabelTemplate;
//}

//scope.$watch("danelChartCategoryLabelTemplate", function (newValue, oldValue) {
//    if (newValue == oldValue) {
//        return;
//    }

//    if (newValue === undefined)
//        return;

//    me.kendoChart.setOptions({
//        categoryAxis: [{
//            labels: {
//                template: newValue,
//                margin: { top: 70 },
//            },
//            majorGridLines: { visible: false }
//        }],
//    });
//});
