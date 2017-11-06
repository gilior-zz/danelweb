module Danel {
    export class AppClass {
        appUrl: string;
        $injector: any;

        constructor() {
        }

        config($locationProvider: ng.ILocationProvider, $stateProvider, $urlRouterProvider, $injector) {
            var me = this;



            me.appUrl = (<any>Danel).appUrl;

            kendo.culture("he-IL");

            //
            //  $injector injected into config block is not the "real" one
            //  Instead use the run block
            //
        }

        run($injector, $location: ng.ILocationService, $log: ng.ILogService, $rootScope: ng.IScope, $exceptionHandler, authService: AuthService, idleService: IdleService, $timeout: ng.ITimeoutService, $interval: ng.IIntervalService, $interpolate:ng.IInterpolateService,) {
            var me = this;

            $log.debug("App.run");


            me.$injector = $injector;

            //idleService.startLogoutTimeout();

            //idleService.cancelTimeout();

        }

        resolve(name: string) {
            var me = this;

            var service = me.$injector.get(name);

            return service;
        }
    }

    export var App: AppClass = new AppClass();

    angular.module("Danel", ["ngCookies", "ngRoute", "ui.router", "kendo.directives", "ngStorage","ngSanitize"])
        .config([
            "$locationProvider",
            "$stateProvider",
            "$urlRouterProvider",
            "$injector",
            function ($locationProvider: ng.ILocationProvider,
                $stateProvider,
                $urlRouterProvider,
                $injector) {
                App.config($locationProvider, $stateProvider, $urlRouterProvider, $injector);
            }])
        .run([
            "$injector",
            "$location",
            "$log",
            "$rootScope",
            "$exceptionHandler",
            "AuthService",
            "IdleService",
            '$timeout',
            '$interval',
            '$interpolate',
            function (
                $injector,
                $location: ng.ILocationService,
                $log: ng.ILogService,
                $rootScope,
                $exceptionHandler,
                authService: AuthService, idleService: IdleService, $timeout, $interval, $interpolate) {
                App.run($injector, $location, $log, $rootScope, $exceptionHandler, authService, idleService, $timeout, $interval, $interpolate);
            }]);
}
