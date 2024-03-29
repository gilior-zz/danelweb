var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var DropDownListWidget = (function (_super) {
        __extends(DropDownListWidget, _super);
        function DropDownListWidget(ddo, scope, element, attrs, $log) {
            _super.call(this, "DropDownListWidget", ddo, scope, element, attrs, $log);
            var me = this;
            var options = {
                dataSource: scope.danelData,
                dataTextField: attrs.danelDataTextField,
                dataValueField: attrs.danelDataValueField,
                //
                //  Update scope when user changes selected item
                //
                change: function (e) {
                    me.onChanged(e);
                }
            };
            me.element.kendoDropDownList(options);
            me.kendoDropDownList = element.data("kendoDropDownList");
            //
            //  Monitor scope changes and update back kendo
            //
            me.watchData();
        }
        DropDownListWidget.prototype.watchData = function () {
            var me = this;
            me.scope.$watch("danelData", function (newValue) {
                console.log("danelDropDownList data changed: ");
                if (newValue) {
                    for (var i = 0; i < newValue.length; i++) {
                        console.log("    " + (i + 1) + ": " + JSON.stringify(newValue[i]));
                    }
                    if (me.scope.danelAllowEmptyItem) {
                        var nullItem = {};
                        nullItem[me.attrs.danelName] = "";
                        nullItem[me.attrs.danelValue] = "";
                        newValue = [nullItem].concat(newValue);
                    }
                }
                var dataSource = new kendo.data.DataSource({
                    data: newValue,
                });
                me.kendoDropDownList.setDataSource(dataSource);
                if (me.lastSelectedValue !== undefined) {
                    me.kendoDropDownList.value(me.lastSelectedValue);
                }
            });
            me.scope.$watch("danelSelected", function (newValue) {
                if (!newValue) {
                    newValue = "";
                }
                me.kendoDropDownList.value(newValue);
                me.lastSelectedValue = newValue;
            });
        };
        DropDownListWidget.prototype.onChanged = function (e) {
            var me = this;
            var selectedValue = me.kendoDropDownList.value();
            me.$log.debug("DropDownList selected value changed: " + selectedValue);
            me.scope.$apply(function () {
                me.scope.danelSelected = me.kendoDropDownList.value();
            });
        };
        return DropDownListWidget;
    }(Danel.BaseWidget));
    angular.module("Danel").directive("danelDropDownList", ["$log", function ($log) {
            var ddo = {
                restrict: "A",
                scope: {
                    danelData: "=",
                    danelSelected: "=",
                    danelAllowEmptyItem: "=",
                },
                requiredAttrs: {
                    danelData: "",
                    danelDataTextField: "",
                    danelDataValueField: "",
                },
                link: function (scope, element, attrs) {
                    new DropDownListWidget(ddo, scope, element, attrs, $log);
                }
            };
            return ddo;
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=DropDownListWidget.js.map