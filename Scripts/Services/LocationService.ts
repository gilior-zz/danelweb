module Danel {

    angular.module("Danel").config(["$provide", function ($provide) {
        $provide.decorator("$location", ["$delegate", "HttpService", function ($delegate, httpService: HttpService) {

            var locationDecorator = Object.create($delegate);

            locationDecorator.hash = function (arg1, arg2, arg3) {
                $delegate.hash(arg1, arg2, arg3);
            }

            locationDecorator.path = function (url: string) {
                if (url) {
                    //
                    //  setter overload
                    //
                    //console.log("$location.path: " + url);

                    return $delegate.path(url);
                }
                else {
                    //
                    //  getter overload
                    //
                    url = $delegate.path();
                    if (url) {
                        //
                        //  By default URL is case sensitive
                        //  We don't want to change the URL but rather treat it as case insensitive
                        //
                        url = url.toLocaleLowerCase();
                    }

                    return url;
                }
            }

            return locationDecorator;
        }]);
    }]);
}
