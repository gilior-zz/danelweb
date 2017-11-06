var Danel;
(function (Danel) {
    var BaseWidget = (function () {
        function BaseWidget(name, ddo, scope, element, attrs, $log) {
            var me = this;
            $log.debug("Widget " + name + " created");
            me.ddo = ddo;
            me.name = name;
            me.scope = scope;
            me.element = element;
            me.attrs = attrs;
            me.$log = $log;
            me.validateAttrs();
        }
        BaseWidget.prototype.validateAttrs = function () {
            var me = this;
            for (var attrName in me.ddo.requiredAttrs) {
                if (!me.attrs[attrName]) {
                    throw new Error(me.name + ": " + attrName + " attribute is missing");
                }
            }
        };
        return BaseWidget;
    }());
    Danel.BaseWidget = BaseWidget;
})(Danel || (Danel = {}));
//# sourceMappingURL=BaseWidget.js.map