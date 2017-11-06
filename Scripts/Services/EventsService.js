var Danel;
(function (Danel) {
    var EventsService = (function () {
        function EventsService() {
            var me = this;
            me.eventOwnersMap = new Danel.Dictionary();
        }
        EventsService.prototype.getOwnerEventMap = function (ownerName) {
            var me = this;
            var eventsMap;
            eventsMap = me.eventOwnersMap.get(ownerName);
            return eventsMap;
        };
        EventsService.prototype.addEvent = function (ownerName, eventName, params) {
            if (params === void 0) { params = null; }
            var me = this;
            var eventsMap;
            var event;
            eventsMap = me.getOwnerEventMap(ownerName);
            if (eventsMap == null) {
                eventsMap = new Danel.Dictionary();
                me.eventOwnersMap.set(ownerName, eventsMap);
            }
            event = eventsMap.get(eventName);
            if (event != null) {
                event.setParams(params);
                return event;
            }
            event = new Danel.Event(eventName, params);
            eventsMap.set(eventName, event);
            return event;
        };
        EventsService.prototype.getEvent = function (ownerName, eventName) {
            var me = this;
            var eventsMap;
            var event;
            eventsMap = me.getOwnerEventMap(ownerName);
            if (eventsMap == null) {
                event = me.addEvent(ownerName, eventName);
                return event;
            }
            event = eventsMap.get(eventName);
            if (event == null) {
                event = me.addEvent(ownerName, eventName);
            }
            return event;
        };
        return EventsService;
    }());
    Danel.EventsService = EventsService;
    angular.module("Danel").service("EventsService", [EventsService]);
})(Danel || (Danel = {}));
//# sourceMappingURL=EventsService.js.map