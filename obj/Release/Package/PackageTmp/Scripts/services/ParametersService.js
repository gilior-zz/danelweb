var Danel;
(function (Danel) {
    var ParametersService = (function () {
        function ParametersService($localStorage, httpService) {
            this.httpService = httpService;
            this.maps = {};
            var me = this;
            // me.LoadParamters();
            me.danelLocalStorage = $localStorage;
            if (me.danelLocalStorage.persistentMaps == null)
                me.danelLocalStorage.persistentMaps = {};
        }
        ParametersService.prototype.GetDanelParameter = function (num, defaultValue) {
            if (defaultValue === void 0) { defaultValue = ""; }
            var me = this;
            var webSiteParams = Danel.webSiteParams;
            if (webSiteParams == null)
                return null;
            var value = webSiteParams[num];
            if (value != null)
                return value;
            return defaultValue;
        };
        ParametersService.prototype.LoadParamters = function () {
            var me = this;
            var req = {};
            var url = '/api/Parameters/GetAllParameter';
            me.httpService.POST(url, req, false).then(function (i) {
                me.parameters = i;
            });
        };
        Object.defineProperty(ParametersService.prototype, "IsActiveWebSite", {
            get: function () {
                var me = this;
                var resault = false;
                var req = { webParameter: Danel.WebParameter.IsActiveWebSite };
                var url = '/api/Parameters/GetParameter';
                me.httpService.POST(url, req).then(function (res) {
                    resault = res.ParameterItems[0].Value.toLowerCase() == 'true';
                });
                return resault;
            },
            enumerable: true,
            configurable: true
        });
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