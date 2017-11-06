module Danel {
    export class IdleService {
        waitingFunc: ng.IPromise<any>;
        idleTime: number;
        constructor(public timeout: ng.ITimeoutService, public interval: ng.IIntervalService, public authService: AuthService, public httpService: HttpService, public parametersService: ParametersService) {
            var me = this;

        //    me.idleTime = +me.parametersService.GetDanelParameter(WebParameter.IdleTimeForWebSite).Value;
        //    me.startLogoutTimeout();


        }
        startLogoutTimeout(): void {
            var me = this;

            if (me.idleTime == undefined) return;

            var t;
            window.onload = resetTimer;
            document.onmousemove = resetTimer;
            document.onkeypress = resetTimer;
            function resetTimer() {
                clearTimeout(t);
                t = setTimeout(() => me.authService.logout().then(() => {
                    var url = "/";
                    url = HttpService.fixUrl(url);
                    window.location.assign(url);
                }),
                    me.idleTime * 60 * 1000);
            }

        }




        cancelTimeout(): void {
            var me = this;
            me.timeout.cancel(me.waitingFunc);
        }
    }
    angular.module('Danel').service('IdleService', ['$timeout', '$interval', 'AuthService', 'HttpService', 'ParametersService', IdleService]);
} 