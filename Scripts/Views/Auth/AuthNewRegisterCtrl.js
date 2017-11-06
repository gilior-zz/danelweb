/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var AuthNewRegisterCtrl = (function (_super) {
        __extends(AuthNewRegisterCtrl, _super);
        function AuthNewRegisterCtrl($scope) {
            var _this = _super.call(this, "AuthNewRegisterCtrl", $scope) || this;
            var me = _this;
            return _this;
        }
        return AuthNewRegisterCtrl;
    }(Danel.DanelCtrl));
    angular.module("Danel").controller("AuthNewRegisterCtrl", [
        "$scope",
        AuthNewRegisterCtrl,
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=AuthNewRegisterCtrl.js.map