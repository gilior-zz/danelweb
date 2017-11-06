var Danel;
(function (Danel) {
    angular.module("Danel").directive("danelDomElement", ["$parse", function ($parse) {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    if (!attrs.danelDomElement) {
                        return;
                    }
                    var getter = $parse(attrs.danelDomElement);
                    var setter = getter.assign;
                    setter(scope, element);
                }
            };
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=DomElementDirective.js.map