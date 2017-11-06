module Danel {
    export class BaseWidget {
        name: string;
        ddo;
        scope;
        element: JQuery;
        attrs;
        $log: ng.ILogService;

        constructor(name, ddo, scope, element, attrs, $log: ng.ILogService) {
            var me = this;

            //$log.debug("Widget " + name + " created");

            me.ddo = ddo;
            me.name = name;
            me.scope = scope;
            me.element = element;
            me.attrs = attrs;
            me.$log = $log;

            me.validateAttrs();
        }

        validateAttrs() {
            var me = this;

            for (var attrName in me.ddo.requiredAttrs) {
                if (!me.attrs[attrName]) {
                    throw new Error(me.name + ": " + attrName + " attribute is missing");
                }
            }
        }
    }
}