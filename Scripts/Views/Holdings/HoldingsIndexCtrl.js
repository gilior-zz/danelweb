/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var HoldingsIndexCtrl = (function (_super) {
        __extends(HoldingsIndexCtrl, _super);
        function HoldingsIndexCtrl($scope) {
            var _this = _super.call(this, "HoldingsIndexCtrl", $scope) || this;
            var me = _this;
            return _this;
        }
        return HoldingsIndexCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("HoldingsIndexCtrl", [
        "$scope",
        HoldingsIndexCtrl,
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=HoldingsIndexCtrl.js.map