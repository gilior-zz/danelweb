var Danel;
(function (Danel) {
    var ParametersService = (function () {
        function ParametersService($localStorage, httpService) {
            this.httpService = httpService;
            this.maps = {};
            var me = this;
            me.danelLocalStorage = $localStorage;
            if (me.danelLocalStorage.persistentMaps == null)
                me.danelLocalStorage.persistentMaps = {};
        }
        ParametersService.prototype.GetDanelParameter = function (num) {
            var me = this;
            var req = { webParameter: num };
            var url = '/api/Parameters/GetParameter';
            return me.httpService.POST(url, req);
        };
        ParametersService.prototype.getParametersMap = function (key, mapType) {
            if (mapType === void 0) { mapType = ""; }
            var me = this;
            var map;
            if (mapType == "PersistentMap") {
                map = me.getPresistentMap(key);
                if (map == null)
                    map = me.addPresistentMap(key);
                return map;
            }
            map = me.getMap(key);
            if (map == null)
                map = me.addMap(key);
            return map;
        };
        ParametersService.prototype.addParameterMap = function (key, mapType) {
            if (mapType === void 0) { mapType = ""; }
            var me = this;
            if (mapType != "PersistentMap")
                return me.addMap(key);
            return me.addPresistentMap(key);
        };
        ParametersService.prototype.addMap = function (key) {
            var me = this;
            var map = {};
            me.maps[key] = map;
            return map;
        };
        ParametersService.prototype.addPresistentMap = function (key) {
            var me = this;
            var maps = me.danelLocalStorage.persistentMaps;
            var map = maps[key];
            if (map == null) {
                map = {};
                maps[key] = map;
            }
            return map;
        };
        ParametersService.prototype.getMap = function (key) {
            var me = this;
            var map = me.maps[key];
            if (map == null) {
                map = me.getPresistentMap(key);
            }
            return map;
        };
        ParametersService.prototype.getPresistentMap = function (key) {
            var me = this;
            var maps = me.danelLocalStorage.persistentMaps;
            var map = maps[key];
            if (map != null)
                return map;
            return me.addPresistentMap(key);
        };
        return ParametersService;
    }());
    Danel.ParametersService = ParametersService;
    angular.module("Danel").service("ParametersService", ["$localStorage", "HttpService", ParametersService]);
})(Danel || (Danel = {}));
//# sourceMappingURL=ParametersService.js.map