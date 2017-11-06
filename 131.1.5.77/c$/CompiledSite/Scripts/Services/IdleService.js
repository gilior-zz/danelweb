var Danel;
(function (Danel) {
    var IdleService = (function () {
        function IdleService(timeout, interval, authService, httpService) {
            this.timeout = timeout;
            this.interval = interval;
            this.authService = authService;
            this.httpService = httpService;
            var me = this;
            if (me.idleTime == undefined) {
                var req = { webParameter: Danel.WebParameter.IdleTimeForWebSite };
                me.httpService.POST('/api/Parameters/GetParameter', req).then(function (res) {
                    me.idleTime = +res.ParameterItems[0].Value;
                    me.startLogoutTimeout();
                }).fail(function (err) { });
            }
        }
        IdleService.prototype.startLogoutTimeout = function () {
            var me = this;
            if (me.idleTime == undefined)
                return;
            var t;
            window.onload = resetTimer;
            document.onmousemove = resetTimer;
            document.onkeypress = resetTimer;
            function resetTimer() {
                clearTimeout(t);
                t = setTimeout(function () { return me.authService.logout().then(function () {
                    var url = "/";
                    url = Danel.HttpService.fixUrl(url);
                    window.location.assign(url);
                }); }, me.idleTime * 60 * 1000);
            }
        };
        IdleService.prototype.cancelTimeout = function () {
            var me = this;
            me.timeout.cancel(me.waitingFunc);
        };
        return IdleService;
    }());
    Danel.IdleService = IdleService;
    angular.module('Danel').service('IdleService', ['$timeout', '$interval', 'AuthService', 'HttpService', IdleService]);
})(Danel || (Danel = {}));
//# sourceMappingURL=IdleService.js.map