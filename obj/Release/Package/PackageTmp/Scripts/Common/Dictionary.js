var Danel;
(function (Danel) {
    var Dictionary = (function () {
        function Dictionary() {
            this.map = {};
            var me = this;
            me.set = function setMe(key, value) {
                me.map[key] = value;
            };
            me.get = function getMe(key) {
                return me.map[key];
            };
        }
        return Dictionary;
    }());
    Danel.Dictionary = Dictionary;
})(Danel || (Danel = {}));
//# sourceMappingURL=Dictionary.js.map