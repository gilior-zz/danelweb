module Danel {

    export class Dictionary<TValue> {

        private map: { [s: string]: TValue; } = {};
        set: Function;
        get: Function;

        constructor() {
            var me = this;

            me.set = function setMe(key: string, value: TValue) {
                me.map[key] = value;
            }

            me.get = function getMe(key: string): TValue {
                return me.map[key];
            }
        }
    }
}
 