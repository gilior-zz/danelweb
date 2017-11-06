/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var PortfolioIndexCtrl = (function (_super) {
        __extends(PortfolioIndexCtrl, _super);
        function PortfolioIndexCtrl($scope) {
            _super.call(this, "PortfolioIndexCtrl", $scope);
            var me = this;
        }
        return PortfolioIndexCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("PortfolioIndexCtrl", [
        "$scope",
        PortfolioIndexCtrl,
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=PortfolioIndex.js.map