var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var YieldWidgetCtrl = (function (_super) {
        __extends(YieldWidgetCtrl, _super);
        function YieldWidgetCtrl($scope) {
            _super.call(this, "YieldWidgetCtrl", $scope);
            var me = this;
            me.parametersService.GetDanelParameter(Danel.WebParameter.ContextualColor).then(function (res) {
                me.$scope.contextualColor = res.ParameterItems[0].Value == "True";
            });
            $scope.$watch("danelModel", function (newValue, oldValue) {
                me.value = newValue;
                //me.absValue = Math.round(Math.abs(newValue) * 10000) / 100;
                me.absValue = Math.abs(newValue);
                if (isNaN(me.absValue))
                    me.validNumber = false;
                else
                    me.validNumber = true;
                me.sign = (me.value >= 0 ? "+" : "-");
            });
        }
        YieldWidgetCtrl.prototype.getClass = function () {
            var me = this;
            if (me.value >= 0 && me.$scope.contextualColor)
                return "positive";
            if (me.value < 0 && me.$scope.contextualColor)
                return "negative";
        };
        YieldWidgetCtrl.prototype.generateText = function () {
            var me = this;
            if (me.validNumber)
                return me.absValue.toString();
            else
                return 'אין נתונים';
        };
        return YieldWidgetCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("YieldWidgetCtrl", ["$scope", YieldWidgetCtrl]);
    angular.module("Danel").directive("danelYield", ["$log", function ($log) {
            return {
                restrict: "E",
                scope: {
                    danelModel: "=",
                },
                templateUrl: Danel.HttpService.fixUrl("/views/Directive/Yield"),
                replace: true,
                controller: "YieldWidgetCtrl as ctrl",
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=YieldWidget.js.map