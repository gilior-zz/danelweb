/// <reference path="../typings/q/q.d.ts" />
/// <reference path="app.ts" />
var Danel;
(function (Danel) {
    var HttpService = (function () {
        function HttpService($cookies) {
            var me = this;
            me.pendingCount = 0;
            me.workBegin = new Danel.Event();
            me.workEnd = new Danel.Event();
            me.$cookies = $cookies;
        }
        HttpService.prototype.GET = function (url, data) {
            if (data === void 0) { data = undefined; }
            var me = this;
            return me.doHttp("GET", url, data);
        };
        HttpService.prototype.POST = function (url, data, asynch) {
            if (data === void 0) { data = undefined; }
            if (asynch === void 0) { asynch = true; }
            var me = this;
            return me.doHttp("POST", url, data, asynch);
        };
        HttpService.prototype.doHttp = function (type, url, data, asynch) {
            if (asynch === void 0) { asynch = true; }
            var me = this;
            var options = {
                type: type,
                async: asynch,
                contentType: "application/json",
                url: HttpService.fixUrl(url),
                data: JSON.stringify(data),
                headers: {
                    DANEL_CSRF_TOKEN: me.$cookies.DANEL_CSRF_TOKEN
                },
            };
            if (++me.pendingCount == 1) {
                me.workBegin.fire();
            }
            return Q($.ajax(options))
                .fail(function (jqXHR) {
                throw me.toError(jqXHR);
            })
                .fin(function () {
                if (--me.pendingCount == 0) {
                    me.workEnd.fire();
                }
            });
        };
        //
        //  Convert XHR error to DanelError
        //
        HttpService.prototype.toError = function (jqXHR) {
            var me = this;
            var err = null;
            if (jqXHR.readyState == 0) {
                err = new Danel.DanelError(Danel.ErrorCode.ServerNotAvailable, "Server is not available", "Server is not available");
            }
            else {
                var res = Danel.JSONHelpers.tryJSONParse(jqXHR.responseText);
                if (res != null) {
                    if (res.hasOwnProperty("ErrorCode")) {
                        err = new Danel.DanelError(res.ErrorCode, res.UserMessage, res.InternalMessage);
                    }
                }
            }
            if (err == null) {
                err = new Danel.DanelError(1, "Internal server error", "Internal server error");
            }
            return err;
        };
        HttpService.fixUrl = function (url) {
            var me = this;
            var res;
            if (url.indexOf(Danel.App.appUrl) == 0) {
                res = url;
            }
            else if (url == "/") {
                res = Danel.App.appUrl;
            }
            else {
                res = Danel.App.appUrl + url;
            }
            return res;
        };
        return HttpService;
    }());
    Danel.HttpService = HttpService;
    angular.module("Danel").service("HttpService", ["$cookies", HttpService]);
})(Danel || (Danel = {}));
//# sourceMappingURL=HttpService.js.map