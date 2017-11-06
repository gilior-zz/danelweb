module Danel {
    class YieldWidgetCtrl extends DanelCtrl {
        value?: number;
        absValue?: number;
        validNumber: boolean
        sign: string;
        constructor($scope) {

            super("YieldWidgetCtrl", $scope);
            var me = this;
            me.$scope.contextualColor = me.parametersService.GetDanelParameter(WebParameter.ContextualColor) == "True";
            $scope.$watch("danelModel", function (newValue, oldValue) {
                me.value = newValue;
                //me.absValue = Math.round(Math.abs(newValue) * 10000) / 100;
                me.absValue = newValue && Math.abs(newValue);
                if (!me.absValue || isNaN(me.absValue))
                    me.validNumber = false;
                else
                    me.validNumber = true;
                me.sign = (me.value >= 0 ? "+" : "-");
            });
        }

        public getClass(): string {
            var me = this;
            if (me.value >= 0 && me.$scope.contextualColor)
                return "positive";
            if (me.value < 0 && me.$scope.contextualColor)
                return "negative";
            if (!me.validNumber)
                return 'centered';

        }

        public generateText(): string {
            var me = this;
            if (me.validNumber)
                return me.absValue.toString();
            else
                return '-'

        }
    }

    angular.module("Danel").controller("YieldWidgetCtrl", ["$scope", YieldWidgetCtrl]);

    angular.module("Danel").directive("danelYield", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
                danelModel: "=",
            },
            templateUrl: HttpService.fixUrl("/views/Directive/Yield"),
            replace: true,
            controller: "YieldWidgetCtrl as ctrl",
        };
    }]);
}
