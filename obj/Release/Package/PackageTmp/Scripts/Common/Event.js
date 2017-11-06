/// <reference path="../typings/q/q.d.ts" />
var Danel;
(function (Danel) {
    //
    //  Wrapps a list of event handlers
    //  Reminds the event C# keyword
    //
    var Event = (function () {
        function Event(name, params) {
            if (name === void 0) { name = "Undefined"; }
            if (params === void 0) { params = null; }
            var me = this;
            me.name = name;
            me.params = params;
            me.handlers = [];
        }
        Event.prototype.addEventHandler = function (obj, method) {
            var me = this;
            if (obj instanceof EventHandler) {
                me.handlers.push(obj);
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
        };
        Event.prototype.removeEventHandler = function (obj, method) {
            var me = this;
            var index = me.findIndex(obj, method);
            if (index == -1) {
                return;
            }
            me.handlers.splice(index, 1);
        };
        Event.prototype.fire = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var me = this;
            for (var i = 0; i < me.handlers.length; i++) {
                var handler = me.handlers[i];
                handler.invoke(args);
            }
        };
        Event.prototype.fireWithParams = function () {
            var me = this;
            me.fire(me.params);
        };
        Event.prototype.setParams = function (params) {
            var me = this;
            me.params = params;
        };
        Event.prototype.findIndex = function (obj, method) {
            var me = this;
            for (var i = 0; i < me.handlers.length; i++) {
                var handler = me.handlers[i];
                if (handler.equals(obj, method)) {
                    return i;
                }
            }
            return -1;
        };
        return Event;
    }());
    Danel.Event = Event;
    var EventHandler = (function () {
        function EventHandler(obj, method) {
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
        EventHandler.prototype.invoke = function (args) {
            var me = this;
            me.method.apply(me.obj, args);
        };
        EventHandler.prototype.equals = function (obj, method) {
            var me = this;
            if (me.obj == obj && me.method == method) {
                return true;
            }
            return false;
        };
        return EventHandler;
    }());
    Danel.EventHandler = EventHandler;
})(Danel || (Danel = {}));
//# sourceMappingURL=Event.js.map