
module Danel {
    var DEFAULT_PAGE_SIZE: number = 15;

    export class GridWidget {
        scope;
        element: JQuery;
        attrs;
        kendoGrid: kendo.ui.Grid;
        data;
        dataSource;
        gridOptions;
        $parse;
        source: any;

        constructor(scope, element, attrs, $parse) {
            var me = this;

            //console.log("GridDirective: link BEGIN, " + attrs.danelModel);
            me.source = attrs.danelModel;
            me.scope = scope;
            me.element = element;
            me.attrs = attrs;
            me.$parse = $parse;
            me.kendoGrid = null;
            me.gridOptions = {};           
            //
            //  parse HTML template into me.gridOptions
            //
            me.parse(me.element);

            me.buildDataSourceSchemaModel(me.gridOptions.columns);

            element.empty();

            //
            //  Create the grid
            //
            //console.log("    Calling kendoGrid");
            me.element.kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: me.gridOptions.dataSource
                    //  ,                    schema: {
                    //    model: {
                    //        fields: {
                    //            Quantity: { type: "number" }
                    //        }
                    //    }                        
                    //},
                    //aggregate: { field: "Quantity", aggregate: "sum" }
                },
                dataBound: function () {
                    me.DisplayNoResultsFound();
                },
                columns: me.gridOptions.columns,
                sortable: me.gridOptions.sortable,
                selectable: false,
                pageable: me.gridOptions.pageable,
                columnMenu: me.gridOptions.columnMenu,
                resizable: me.gridOptions.resizable,
                reorderable: me.gridOptions.reorderable,

            });




            $(".k-collapse").click()

            //if (me.gridOptions.groupable)
            //    me.element.kendoGrid({
            //        groupable: {
            //            messages: {
            //                empty: "Custom message text"
            //            }
            //        }
            //    })

            //if (me.attrs["height"])
            //    me.element.kendoGrid({
            //        height: 400
            //    })

            me.kendoGrid = element.data("kendoGrid");

            me.watchData();

            scope.$on("$destroy", function () {
                me.onScopeDestroy();
            });

            //console.log("    GridDirective: link END");
            if (scope.danelChartSet != null)
                scope.danelChartSet(me);

            if (scope.danelGridSet != null)
                scope.danelGridSet(me);


        }

        public DisplayNoResultsFound(): void {
            var me = this;
            //var data = me.kendoGrid.dataSource.view();
        }

        setGridOptions(options: kendo.ui.GridOptions) {
            var me = this;
            me.kendoGrid.setOptions(options);
        }

        public setGridAsGroupable(): void {
            var me = this;
            me.kendoGrid.setOptions({
                groupable: {
                    messages: {
                        empty: "גרור כותרת לכאן על מנת לקבץ על ידי העמודה"
                    }
                }
            });
        }

        public setGridAsFilterable(): void {
            var me = this;
            me.kendoGrid.setOptions({
                filterable: {
                    extra: false,
                    messages: {
                        info: "אפשרויות חיתוך:", // sets the text on top of the filter menu
                        filter: "בצע", // sets the text for the "Filter" button
                        clear: "מחק חיתוך", // sets the text for the "Clear" button

                        // when filtering boolean numbers
                        isTrue: "כן", // sets the text for "isTrue" radio button
                        isFalse: "לא", // sets the text for "isFalse" radio button

                        //changes the text of the "And" and "Or" of the filter menu
                        and: "וגם",
                        or: "או"
                    },
                    operators: {
                        //filter menu for "string" type columns
                        string: {
                            eq: "שווה ל",
                            neq: "שונה מ",
                            startswith: "מתחיל ב",
                            contains: "מכיל",
                            endswith: "מסתיים ב"
                        },
                        //filter menu for "number" type columns
                        number: {
                            eq: "שווה ל",
                            neq: "שונה מ",
                            gte: "גדול או שווה ל",
                            gt: "גדול מ",
                            lte: "קטן או שווה ל",
                            lt: "קטן מ",
                            format: "n0"
                        },
                        //filter menu for "date" type columns
                        date: {
                            eq: "שווה ל",
                            neq: "שונה מ",
                            gte: "גדול או שווה ל",
                            gt: "גדול מ",
                            lte: "קטן או שווה ל",
                            lt: "קטן מ"
                        },
                        //filter menu for foreign key values
                        enums: {
                            eq: "שווה ל",
                            neq: "שונה מ"
                        }
                    }
                }
            });
        }

        public selectElementGivenItsId(id) {
            var me = this;
            var item = me.kendoGrid.dataSource.get(id);
            var tr = $("[data-uid='" + item.uid + "']", me.kendoGrid.tbody);
            //me.kendoGrid.select(tr);
            tr.addClass("total-row-class");
        }




        CurrencyFilter(element) {

            var displayedData = $("#holdingsDetailedGrid").data().kendoGrid.dataSource.view();
            var unique = {};
            var distinct = [];
            displayedData.forEach(function (x) {
                if (!unique[x.Currency]) {
                    distinct.push(x.Currency);
                    unique[x.Currency] = true;
                }
            });

            element.kendoDropDownList({
                dataSource: distinct
            });
        }




        onScopeDestroy() {
            var me = this;
        }

        watchData() {
            var me = this;

            //
            //  $watch only monitors changes to the reference it self not to the data inside it
            //
            me.scope.$watch(
                function () {
                    return me.scope.danelModel;
                },
                function (newValue, oldValue) {
                    //
                    //  Listener might be invoked for the first time even when value is the same
                    //
                    if (newValue == oldValue) {
                        //console.log("GridDirective: DATAREF ignored, newValue and oldValue are the same");

                        return;
                    }

                    //console.log("GridDirective: DATAREF changed " + me.attrs["danelModel"]);

                    me.updateData(newValue);
                    var dataSource = me.kendoGrid.dataSource;
                    //var total = dataSource.data().length;
                    //dataSource.insert(total, {});
                });
        }

        buildDataSourceSchemaModel(columns) {
            var me = this;

            var schema = {
                id: "ID",
                fields: {
                }
            };

            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];

                schema.fields[column.field] = {
                    type: column.dataType,
                }
            }

            me.gridOptions.dataSourceModel = schema;

            //
            //  Create kendo dataSource
            //  pageSize must be specified here and in the kendoGrid below too !
            //
            me.gridOptions.dataSource = new kendo.data.DataSource({
                data: me.scope.danelModel || [],
                schema: {
                    model: me.gridOptions.dataSourceModel,
                },
                group: me.gridOptions.dataSourceGroupBy,
                aggregate: me.gridOptions.dataSourceAggregates,
                pageSize: DEFAULT_PAGE_SIZE,
            });
        }

        updateData(models: any[]) {
            var me = this;

            if (!$.isArray(models)) {
                throw new Error("Grid model must be of type Array");
            }

            //console.log("    updateData");

            for (var i = 0; i < models.length; i++) {
                var model = models[i];

                //
                //  Kendo automatically wraps model objects with kendo ObservableObject
                //  However, when interacting with controllers it is important to return the original models objects
                //  
                model._model = model;
            }

            var dataSourceOptions = {
                data: models,
                schema: {
                    model: me.gridOptions.dataSourceModel

                },
                pageSize: undefined,
                filter: undefined,
                sort: undefined,
            };

            if (me.kendoGrid.pager) {
                //
                //  For some reason pageSize() method returns a string
                //  When this string is passed to kendo dataSource the grid is paging is broken
                //  Must convert it to number
                //
                dataSourceOptions.pageSize = (me.kendoGrid.pager.pageSize() * 1);
            }

            me.dataSource = new kendo.data.DataSource(dataSourceOptions);

            //console.log("        data: " + dataSourceOptions.data.length);
            //console.log("        pageSize: " + dataSourceOptions.pageSize);

            me.kendoGrid.setDataSource(me.dataSource);

            var kendoModels: any[] = me.dataSource.data();
            kendoModels.forEach(function (kendoModel) {
                kendoModel._model._kendoModel = kendoModel;
            });

           
        }

        parse(element) {
            var me = this;

            me.parseColumns(element);

            me.parseSortable(element);

            me.parseSelectable(element);

            me.gridOptions.reorderable = DOMHelpers.getElementContentAsBoolean(element, "reorderable", false, false);
            //console.log("    reorderable: " + me.gridOptions.reorderable);

            me.gridOptions.resizable = DOMHelpers.getElementContentAsBoolean(element, "resizable", false, false);
            //console.log("    resizable: " + me.gridOptions.resizable);

            me.parsePageSize(element);

            me.parsePageable(element);
        }

        parseColumns(element) {
            var me = this;

            var columns = [];

            element.find("columns column").each(function () {
                var column = me.parseColumn($(this));

                if (column) {
                    columns.push(column);
                }
            });

            //console.log("    columns: " + columns.length);
            $.each(columns, function (index, column: IColumnConfig) {
                //console.log("        " + (column.field || column.title || column.template));
                if (column.filterable) {
                    //console.log("            filterable");
                }

                if (column.width) {
                    //console.log("            width: " + column.width);
                }
            });

            me.gridOptions.columns = columns;
        }

        parseColumn(columnTemplate) {
            var me = this;


            var column: any = {};
            //var attributes = {
            //    "class": "lior-gishry"
            //};
            //column.attributes = attributes;
            var field: any = columnTemplate.find("field");
            if (field.length) {
                column.field = field.text();
            }

            var columnclass = columnTemplate.find("class");
            if (columnclass.length) {
                var attributes = {
                    "class": columnclass.text()
                };
                column.attributes = attributes;
            }

            var template = columnTemplate.find("template");
            if (template.length) {
                column.template = template.html();
            }

            var title: any = columnTemplate.find("title");
            if (title.length) {
                column.title = title.text();
                if (column.title == "NO_TITLE") {
                    column.title = " ";
                }
            }

            var width = columnTemplate.find("width");
            if (width.length) {
                column.width = width.text();
            }

            var format = columnTemplate.find("format");
            if (format.length) {
                column.format = format.text();
            }

            var type = columnTemplate.find("type");
            if (type.length) {
                column.dataType = type.text();
            }

            var filterable = columnTemplate.find("filterable");
            if (filterable.length) {
                var text = filterable.text();
                if (text == "true") {
                    var filterable: any = {};
                    filterable.ui = me.CurrencyFilter;
                    column.filterable = filterable;
                }
            }

            var makeIntegar = columnTemplate.find("makeIntegar");
            if (makeIntegar.length) {
                var text = makeIntegar.text();
                if (text == "true") {
                    var round: any = {};
                    round.ui = function (element) {
                        element.kendoNumericTextBox({                           
                            spinners: false,
                            format: "#",
                            decimals: 0
                        });
                    }
                    column.filterable = round;

                }                                                  
            }

          

            var encoded = columnTemplate.find("encoded");
            if (encoded.length) {
                var text = encoded.text();
                if (text == "false") {
                    column.encoded = false;
                }
            }

            var aggregates = columnTemplate.find("aggregates");
            if (aggregates.length) {
                var text = aggregates.text();
                column.aggregates = text;
            }

            var footertemplate = columnTemplate.find("footertemplate");
            if (footertemplate.length) {
                var text = footertemplate.text();
                column.footerTemplate = text;
            }


            return column;
        }





        parseSortable(element) {
            var me = this;

            var sortable: any = element.find("sortable");
            if (sortable.length) {
                sortable = sortable.text();
                if (sortable == "false") {
                    sortable = false;
                }
                else {
                    sortable = {
                        mode: "multiple",
                        allowUnsort: true,
                    };
                }
            }

            //console.log("    sortable: " + !!sortable);

            me.gridOptions.sortable = sortable;
        }

        parseSelectable(element) {
            var me = this;

            var selectable: any = element.find("selectable");
            if (selectable.length) {
                if (selectable.text() == "false") {
                    selectable = false;
                }
                else {
                    selectable = selectable.text();
                }
            }

            //console.log("    selectable: " + !!selectable);

            me.gridOptions.selectable = selectable;
        }

        parsePageSize(element) {
            var me = this;

            var pagesize: any = element.find("pagesize");
            if (pagesize.length) {
                if (pagesize.text() == "") {
                    pagesize = DEFAULT_PAGE_SIZE;
                }
                else {

                    pagesize = pagesize.text();
                }
            }
            else {
                pagesize = DEFAULT_PAGE_SIZE;
            }

            if (pagesize != null) {
                pagesize = DEFAULT_PAGE_SIZE;
            }
            //console.log("    pagesize: " + pagesize);

            me.gridOptions.pagesize = pagesize;
        }

        parsePageable(element) {
            var me = this;

            var pageable: any = element.find("pageable");
            if (pageable.length) {
                pageable = pageable.text();
                if (pageable == "true") {
                    pageable = true;
                }
                else {
                    pageable = false;
                }
            }
            else {
                pageable = null;
            }

            if (pageable === null) {
                pageable = {
                    pageSizes: [5, 10, 15, 20, 30, 40, 50, 100, 999],
                    pageSize: DEFAULT_PAGE_SIZE,
                };
            }
            //console.log("    pageable: " + !!pageable);

            me.gridOptions.pageable = pageable;
        }
    }

    interface IColumnConfig {
        field: string;
        template: string;
        role: string;
        title: string;
        width: string;
        format: string;
        type: string;
        filterable: any;
    }

    angular.module("Danel").directive("danelGrid", ["$parse", function ($parse) {
        return {
            restrict: "A",

            scope: {
                danelModel: "=",
                danelGridSet: "=",
            },

            link: function (scope, element, attrs) {
                new GridWidget(scope, element, attrs, $parse);
            }
        };
    }]);
}

