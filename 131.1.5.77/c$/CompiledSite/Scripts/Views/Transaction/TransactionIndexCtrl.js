/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var TransactionIndexCtrl = (function (_super) {
        __extends(TransactionIndexCtrl, _super);
        function TransactionIndexCtrl($scope) {
            _super.call(this, "TransactionIndexCtrl", $scope);
            var me = this;
        }
        return TransactionIndexCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("TransactionIndexCtrl", [
        "$scope",
        TransactionIndexCtrl,
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=TransactionIndexCtrl.js.map