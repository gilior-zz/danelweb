/// <reference path="../typings/q/q.d.ts" />
/// <reference path="app.ts" />
var Danel;
(function (Danel) {
    //
    //  Manages route configuration for the application
    //  Has no public API
    //
    var RouteConfig = (function () {
        function RouteConfig() {
            var me = this;
            me.entries = [
                {
                    state: "login",
                    url: "/login",
                    controller: "AuthLoginCtrl as ctrl",
                    templateUrl: "/views/Auth/Login",
                    roles: null,
                    abstract: false
                },
                {
                    state: "reset_password",
                    url: "/reset_password",
                    controller: "ResetPasswordCtrl as ctrl",
                    templateUrl: "/views/Auth/ResetPassword",
                    roles: ["ResetPassword"],
                    abstract: false
                },
                {
                    state: "admin",
                    url: "/admin",
                    controller: "AdminIndexCtrl as ctrl",
                    templateUrl: "/views/Admin/Index",
                    roles: ["WebAdmin"],
                    abstract: false
                },
                {
                    state: "home",
                    controller: "HomeCtrl as ctrl",
                    templateUrl: "/views/Main/Home",
                    abstract: true,
                    url: undefined,
                    roles: ["WebAdmin", "AccountOwner", "ExternalUser"],
                },
                {
                    state: "home.portfolio",
                    url: "/portfolio",
                    controller: "PortfolioIndexCtrl as ctrl",
                    templateUrl: "/views/Portfolio/Index",
                    roles: ["WebAdmin", "AccountOwner", "ExternalUser"],
                    abstract: false
                },
                {
                    state: "home.transaction",
                    url: "/transaction",
                    controller: "TransactionIndexCtrl as ctrl",
                    templateUrl: "/views/Transaction/Index",
                    roles: ["WebAdmin", "AccountOwner", "ExternalUser"],
                    abstract: false
                },
                {
                    state: "home.dashboard",
                    url: "/dashboard",
                    controller: "DashboardIndexCtrl as ctrl",
                    templateUrl: "/views/Dashboard/Index",
                    roles: ["WebAdmin", "AccountOwner", "ExternalUser"],
                    abstract: false
                },
                {
                    state: "home.yield",
                    url: "/yield",
                    controller: "YieldIndexCtrl as ctrl",
                    templateUrl: "/views/yield/Index",
                    roles: ["WebAdmin", "AccountOwner", "ExternalUser"],
                    abstract: false
                },
                {
                    state: "home.contact",
                    url: "/contact",
                    controller: "ContactIndexCtrl as ctrl",
                    templateUrl: "/views/Contact/Index",
                    roles: ["WebAdmin", "AccountOwner", "ExternalUser"],
                    abstract: false
                },
                {
                    state: "home.profile",
                    url: "/profile",
                    controller: "ProfileIndexCtrl as ctrl",
                    templateUrl: "/views/Profile/Index",
                    roles: ["WebAdmin", "AccountOwner", "ExternalUser"],
                    abstract: false
                },
            ];
        }
        RouteConfig.prototype.configure = function ($locationProvider, $stateProvider, $urlRouterProvider) {
            var me = this;
            //
            //  Dont use hashbang if possible
            //
            $locationProvider.html5Mode(true);
            me.registerRoutes($stateProvider, $urlRouterProvider);
        };
        RouteConfig.prototype.run = function ($rootScope, $state, authService, httpService) {
            var me = this;
            //
            //  Enforce role validation when switching between pages
            //
            $rootScope.$on('$stateChangeStart', function (event, next) {
                if (next.data && next.data.roles) {
                    if (!authService.isAuthorized(next.data.roles)) {
                        console.log("Requested state " + next.name + " is not allowed: " + next.url);
                        event.preventDefault();
                        authService.logout();
                        $state.go("login");
                    }
                }
            });
        };
        RouteConfig.prototype.registerRoutes = function ($stateProvider, $urlRouterProvider) {
            var me = this;
            //console.log("Registering routes");
            me.entries.forEach(function (entry) {
                var url = entry.url;
                //console.log("    " + entry.state + ": " + url + " " + entry.roles);
                $stateProvider.state(entry.state, {
                    url: "^" + url,
                    controller: entry.controller,
                    templateUrl: Danel.HttpService.fixUrl(entry.templateUrl),
                    data: {
                        roles: entry.roles,
                    }
                });
            });
            $urlRouterProvider.otherwise("/login");
        };
        return RouteConfig;
    }());
    var router = new RouteConfig();
    angular.module("Danel")
        .config(["$locationProvider", "$stateProvider", "$urlRouterProvider", function ($locationProvider, $stateProvider, $urlRouterProvider) {
            router.configure($locationProvider, $stateProvider, $urlRouterProvider);
        }])
        .run(["$rootScope", "$state", "AuthService", "HttpService", function ($rootScope, $state, authService, httpService) {
            router.run($rootScope, $state, authService, httpService);
        }]);
})(Danel || (Danel = {}));
//# sourceMappingURL=RouteConfig.js.map