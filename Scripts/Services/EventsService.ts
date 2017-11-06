module Danel {
    export class EventsService {

        private eventOwnersMap: Dictionary<Dictionary<Event>>;

        constructor() {
            var me = this;

            me.eventOwnersMap = new Dictionary<Dictionary<Event>>();

        }

        private getOwnerEventMap(ownerName): Dictionary<Event> {
            var me = this;

            var eventsMap: Dictionary<Event>;
            eventsMap = <Dictionary<Event>>me.eventOwnersMap.get(ownerName);

            return eventsMap;
        }

        addEvent(ownerName: string, eventName: string, params: Dictionary<Object> = null): Event {
            var me = this;
            var eventsMap: Dictionary<Event>;
            var event: Event;
            eventsMap = me.getOwnerEventMap(ownerName);

            if (eventsMap == null) { // create Object map that will store Owner Events
                eventsMap = new Dictionary<Event>();
                me.eventOwnersMap.set(ownerName, eventsMap);
            }

            event = eventsMap.get(eventName);

            if (event != null) { //event already exist replace params object.
                event.setParams(params);
                return event;
            }

            event = new Event(eventName, params);
            eventsMap.set(eventName, event);

            return event;
        }

        getEvent(ownerName: string, eventName: string): Event {
            var me = this;
            var eventsMap: Dictionary<Event>;
            var event: Event;
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
        }
    }

    angular.module("Danel").service("EventsService", [EventsService]);
}
