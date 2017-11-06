/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var YieldIndexCtrl = (function (_super) {
        __extends(YieldIndexCtrl, _super);
        function YieldIndexCtrl($scope) {
            var _this = _super.call(this, "DashboardIndexCtrl", $scope) || this;
            var me = _this;
            return _this;
        }
        return YieldIndexCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("YieldIndexCtrl", [
        "$scope",
        YieldIndexCtrl,
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=YieldIndexCtrl.js.map