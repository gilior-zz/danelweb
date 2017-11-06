var Danel;
(function (Danel) {
    var AppClass = (function () {
        function AppClass() {
        }
        AppClass.prototype.config = function ($locationProvider, $stateProvider, $urlRouterProvider, $injector) {
            var me = this;
            me.appUrl = Danel.appUrl;
            kendo.culture("he-IL");
            //
            //  $injector injected into config block is not the "real" one
            //  Instead use the run block
            //
        };
        AppClass.prototype.run = function ($injector, $location, $log, $rootScope, $exceptionHandler, authService, idleService, $timeout, $interval, $interpolate) {
            var me = this;
            $log.debug("App.run");
            me.$injector = $injector;
            //idleService.startLogoutTimeout();
            //idleService.cancelTimeout();
        };
        AppClass.prototype.resolve = function (name) {
            var me = this;
            var service = me.$injector.get(name);
            return service;
        };
        return AppClass;
    }());
    Danel.AppClass = AppClass;
    Danel.App = new AppClass();
    angular.module("Danel", ["ngCookies", "ngRoute", "ui.router", "kendo.directives", "ngStorage", "ngSanitize"])
        .config([
        "$locationProvider",
        "$stateProvider",
        "$urlRouterProvider",
        "$injector",
        function ($locationProvider, $stateProvider, $urlRouterProvider, $injector) {
            Danel.App.config($locationProvider, $stateProvider, $urlRouterProvider, $injector);
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
        function ($injector, $location, $log, $rootScope, $exceptionHandler, authService, idleService, $timeout, $interval, $interpolate) {
            Danel.App.run($injector, $location, $log, $rootScope, $exceptionHandler, authService, idleService, $timeout, $interval, $interpolate);
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=app.js.map