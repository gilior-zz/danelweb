/// <reference path="../typings/q/q.d.ts" />
/// <reference path="app.ts" />

module Danel {
    export class HttpService {
        private pendingCount: number;
        private $cookies;

        public workBegin: Event;
        public workEnd: Event;

        constructor($cookies) {
            var me = this;

            me.pendingCount = 0;
            me.workBegin = new Event();
            me.workEnd = new Event();
            me.$cookies = $cookies;
        }

        GET(url, data = undefined): any {
            var me = this;

            return me.doHttp("GET", url, data);
        }

        POST(url, data = undefined, asynch: boolean = true): any {
            var me = this;

            return me.doHttp("POST", url, data, asynch);
        }

        private doHttp(type, url, data, asynch: boolean = true) {
            var me = this;

            var options: JQueryAjaxSettings = {
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
        }

        //
        //  Convert XHR error to DanelError
        //
        private toError(jqXHR: JQueryXHR) {
            var me = this;

            var err = null;

            if (jqXHR.readyState == 0) {
                err = new DanelError(ErrorCode.ServerNotAvailable, "Server is not available", "Server is not available");
            }
            else {
                var res = JSONHelpers.tryJSONParse(jqXHR.responseText);
                if (res != null) {
                    if (res.hasOwnProperty("ErrorCode")) {
                        err = new DanelError(res.ErrorCode, res.UserMessage, res.InternalMessage);
                    }
                }
            }

            if (err == null) {
                err = new DanelError(1, "Internal server error", "Internal server error");
            }

            return err;
        }

        public static fixUrl(url: string) {
            var me = this;

            var res;
            if (url.indexOf(App.appUrl) == 0) {
                res = url;
            }
            else if (url == "/") {
                res = App.appUrl;
            }
            else {
                res = App.appUrl + url;
            }

            return res;
        }
    }

    angular.module("Danel").service("HttpService", ["$cookies", HttpService]);
}  
