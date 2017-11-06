/// <reference path="../../typings/angularjs/angular.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var AuthRecoverNameCtrl = (function (_super) {
        __extends(AuthRecoverNameCtrl, _super);
        function AuthRecoverNameCtrl($scope) {
            _super.call(this, "AuthRecoverNameCtrl", $scope);
            var me = this;
        }
        return AuthRecoverNameCtrl;
    }(Danel.BaseCtrl));
    angular.module("Danel").controller("AuthRecoverNameCtrl", [
        "$scope",
        AuthRecoverNameCtrl,
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=AuthRecoverNameCtrl.js.map