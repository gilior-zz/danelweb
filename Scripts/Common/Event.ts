/// <reference path="../typings/q/q.d.ts" />

module Danel {
    //
    //  Wrapps a list of event handlers
    //  Reminds the event C# keyword
    //
    export class Event {
        private handlers: EventHandler[];
        name: string;
        params;

        constructor(name: string = "Undefined", params = null) {
            var me = this;

            me.name = name;
            me.params = params;
            me.handlers = [];
        }

        addEventHandler(obj: Object, method: Function);
        addEventHandler(method: Function);
        addEventHandler(handler: EventHandler);
        addEventHandler(obj, method?) {
            var me = this;

            if (obj instanceof EventHandler) {
                me.handlers.push(<EventHandler>obj);
            }
            else {
                //var alreadyExists = false;
                //for (var i = 0; i < me.handlers.length; i++) {
                //    if (me.handlers[i].obj.name == obj.name && me.handlers[i].method.prototype == method.prototype) {
                //        alreadyExists = true;
                //        break;
                //    }
                //}
                //if (!alreadyExists)
                    me.handlers.push(new EventHandler(obj, method));
            }
        }

        removeEventHandler(obj, method) {
            var me = this;

            var index = me.findIndex(obj, method);
            if (index == -1) {
                return;
            }

            me.handlers.splice(index, 1);
        }

        fire(...args) {
            var me = this;

            for (var i = 0; i < me.handlers.length; i++) {
                var handler = me.handlers[i];

                handler.invoke(args);
            }
        }

        fireWithParams() {
            var me = this;

            me.fire(me.params);
        }

        setParams(params) {
            var me = this;

            me.params = params;
        }

        private findIndex(obj, method) {
            var me = this;

            for (var i = 0; i < me.handlers.length; i++) {
                var handler = me.handlers[i];

                if (handler.equals(obj, method)) {
                    return i;
                }
            }

            return -1;
        }
    }

    export class EventHandler {
        method: Function;
        obj: any;

        constructor(obj: Object, method: Function);
        constructor(method: Function);
        constructor(obj, method?) {
            var me = this;

            if (method === undefined) {
                me.obj = null;
                me.method = obj;
            }
            else {
                me.method = method;
                me.obj = obj;
            }
        }

        invoke(args) {
            var me = this;

            me.method.apply(me.obj, args);
        }

        equals(obj: Object, method: Function);
        equals(method: Function);
        equals(obj, method?) {
            var me = this;

            if (me.obj == obj && me.method == method) {
                return true;
            }

            return false;
        }
    }
}
