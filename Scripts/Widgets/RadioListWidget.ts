module Danel {
    class RadioListWidget {
        element: JQuery;
        initVal: number;
        selectedInput: any;
        attrs;
        scope;
        $parse;
        items: any[];
        constructor(scope, element, attrs, $parse, $log) {
            var me = this;

            me.scope = scope;
            me.element = element;
            me.attrs = attrs;
            me.initVal = me.scope.$eval(me.attrs.initialValue);
            me.$parse = $parse;
            me.items = [];
            me.parse(me.element);
            me.element.empty();
            me.items.forEach(function (item) {
                var currentHtml = me.element.html();
                var newHtml = "<label style='display:block'> <input type='radio'   value='" + item.value + "' name='groupType' data-bind='checked: selectedItem' />" + item.text + "        </label>";
                currentHtml += newHtml;              
                me.element.html(currentHtml);

            });
            me.selectedInput = kendo.observable({
                selectedItem: me.initVal,
            });

            kendo.bind($("input"), me.selectedInput);
           

        }
        parse(element) {
            var me = this;

            me.parseItems(element);
        }

      
        parseItems(element) {

            var me = this;
            element.find("items item").each(function () {
                var item = me.parseItem($(this));
                if (item) {
                    me.items.push(item);
                }
            }
                )
            }
        parseItem(data) {
            var me = this;
            var item: any = {};
            var text: any = data.find("text");
            var value: any = data.find("value");
            item.text = text.text();
            item.value = value.text();

            return item;
        }
    }

    angular.module("Danel").directive("danelRadioList", ["$log", "$parse", function ($log, $parse) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                new RadioListWidget(scope, element, attrs, $parse, $log);
            }
        };
    }]);
}