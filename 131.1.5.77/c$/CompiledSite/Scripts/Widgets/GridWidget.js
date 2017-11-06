var Danel;
(function (Danel) {
    var DEFAULT_PAGE_SIZE = 15;
    var GridWidget = (function () {
        function GridWidget(scope, element, attrs, $parse) {
            var me = this;
            console.log("GridDirective: link BEGIN, " + attrs.danelModel);
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
            console.log("    Calling kendoGrid");
            me.element.kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: me.gridOptions.dataSource
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
            $(".k-collapse").click();
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
            console.log("    GridDirective: link END");
            if (scope.danelChartSet != null)
                scope.danelChartSet(me);
            if (scope.danelGridSet != null)
                scope.danelGridSet(me);
        }
        GridWidget.prototype.DisplayNoResultsFound = function () {
            var me = this;
            //var data = me.kendoGrid.dataSource.view();
        };
        GridWidget.prototype.setGridOptions = function (options) {
            var me = this;
            me.kendoGrid.setOptions(options);
        };
        GridWidget.prototype.setGridAsGroupable = function () {
            var me = this;
            me.kendoGrid.setOptions({
                groupable: {
                    messages: {
                        empty: "גרור כותרת לכאן על מנת לקבץ על ידי העמודה"
                    }
                }
            });
        };
        GridWidget.prototype.setGridAsFilterable = function () {
            var me = this;
            me.kendoGrid.setOptions({
                filterable: {
                    extra: false,
                    messages: {
                        info: "אפשרויות חיתוך:",
                        filter: "בצע",
                        clear: "מחק חיתוך",
                        // when filtering boolean numbers
                        isTrue: "כן",
                        isFalse: "לא",
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
                            lt: "קטן מ"
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
        };
        GridWidget.prototype.CurrencyFilter = function (element) {
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
        };
        GridWidget.prototype.onScopeDestroy = function () {
            var me = this;
        };
        GridWidget.prototype.watchData = function () {
            var me = this;
            //
            //  $watch only monitors changes to the reference it self not to the data inside it
            //
            me.scope.$watch(function () {
                return me.scope.danelModel;
            }, function (newValue, oldValue) {
                //
                //  Listener might be invoked for the first time even when value is the same
                //
                if (newValue == oldValue) {
                    console.log("GridDirective: DATAREF ignored, newValue and oldValue are the same");
                    return;
                }
                console.log("GridDirective: DATAREF changed " + me.attrs["danelModel"]);
                me.updateData(newValue);
                var dataSource = me.kendoGrid.dataSource;
                //var total = dataSource.data().length;
                //dataSource.insert(total, {});
            });
        };
        GridWidget.prototype.buildDataSourceSchemaModel = function (columns) {
            var me = this;
            var schema = {
                id: "id",
                fields: {}
            };
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                schema.fields[column.field] = {
                    type: column.dataType,
                };
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
        };
        GridWidget.prototype.updateData = function (models) {
            var me = this;
            if (!$.isArray(models)) {
                throw new Error("Grid model must be of type Array");
            }
            console.log("    updateData");
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
                    model: me.gridOptions.dataSourceModel,
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
            console.log("        data: " + dataSourceOptions.data.length);
            console.log("        pageSize: " + dataSourceOptions.pageSize);
            me.kendoGrid.setDataSource(me.dataSource);
            var kendoModels = me.dataSource.data();
            kendoModels.forEach(function (kendoModel) {
                kendoModel._model._kendoModel = kendoModel;
            });
        };
        GridWidget.prototype.parse = function (element) {
            var me = this;
            me.parseColumns(element);
            me.parseSortable(element);
            me.parseSelectable(element);
            me.gridOptions.reorderable = Danel.DOMHelpers.getElementContentAsBoolean(element, "reorderable", false, false);
            console.log("    reorderable: " + me.gridOptions.reorderable);
            me.gridOptions.resizable = Danel.DOMHelpers.getElementContentAsBoolean(element, "resizable", false, false);
            console.log("    resizable: " + me.gridOptions.resizable);
            me.parsePageSize(element);
            me.parsePageable(element);
        };
        GridWidget.prototype.parseColumns = function (element) {
            var me = this;
            var columns = [];
            element.find("columns column").each(function () {
                var column = me.parseColumn($(this));
                if (column) {
                    columns.push(column);
                }
            });
            console.log("    columns: " + columns.length);
            $.each(columns, function (index, column) {
                console.log("        " + (column.field || column.title || column.template));
                if (column.filterable) {
                    console.log("            filterable");
                }
                if (column.width) {
                    console.log("            width: " + column.width);
                }
            });
            me.gridOptions.columns = columns;
        };
        GridWidget.prototype.parseColumn = function (columnTemplate) {
            var me = this;
            var column = {};
            //var attributes = {
            //    "class": "lior-gishry"
            //};
            //column.attributes = attributes;
            var field = columnTemplate.find("field");
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
            var title = columnTemplate.find("title");
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
                    var filterable = {};
                    filterable.ui = me.CurrencyFilter;
                    column.filterable = filterable;
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
        };
        GridWidget.prototype.parseSortable = function (element) {
            var me = this;
            var sortable = element.find("sortable");
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
            console.log("    sortable: " + !!sortable);
            me.gridOptions.sortable = sortable;
        };
        GridWidget.prototype.parseSelectable = function (element) {
            var me = this;
            var selectable = element.find("selectable");
            if (selectable.length) {
                if (selectable.text() == "false") {
                    selectable = false;
                }
                else {
                    selectable = selectable.text();
                }
            }
            console.log("    selectable: " + !!selectable);
            me.gridOptions.selectable = selectable;
        };
        GridWidget.prototype.parsePageSize = function (element) {
            var me = this;
            var pagesize = element.find("pagesize");
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
            console.log("    pagesize: " + pagesize);
            me.gridOptions.pagesize = pagesize;
        };
        GridWidget.prototype.parsePageable = function (element) {
            var me = this;
            var pageable = element.find("pageable");
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
            console.log("    pageable: " + !!pageable);
            me.gridOptions.pageable = pageable;
        };
        return GridWidget;
    }());
    Danel.GridWidget = GridWidget;
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
})(Danel || (Danel = {}));
//# sourceMappingURL=GridWidget.js.map