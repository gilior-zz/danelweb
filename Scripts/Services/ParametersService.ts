module Danel {


    export class ParametersService {

        private maps: { [s: string]: {} } = {};
        private danelLocalStorage;
        public parameters: Parameters;
        constructor($localStorage, private httpService: HttpService) {
            var me = this;
            // me.LoadParamters();
            me.danelLocalStorage = $localStorage;

            if (me.danelLocalStorage.persistentMaps == null)
                me.danelLocalStorage.persistentMaps = {};
        }

        public GetDanelParameter(num: number, defaultValue: string = ""): string {

            var me = this;           


            let webSiteParams = (<any>Danel).webSiteParams;
            if (webSiteParams == null) return null;
            var value = webSiteParams[num];
            if (value != null) return value;
            return defaultValue;
        }



        LoadParamters(): void {

            var me = this;
            var req: EmptyRequest = <EmptyRequest>{};
            var url: string = '/api/Parameters/GetAllParameter';
            me.httpService.POST(url, req, false).then(i => {
                me.parameters = i
            }
            );
        }

        get IsActiveWebSite(): boolean {
            var me = this;
            var resault = false;
            var req: parameterRequest = <parameterRequest>{ webParameter: WebParameter.IsActiveWebSite };
            var url: string = '/api/Parameters/GetParameter';
            me.httpService.POST(url, req).then((res: Parameters) => {
                resault = res.ParameterItems[0].Value.toLowerCase() == 'true';
            });
            return resault;
        }



        getParametersMap(key: string, mapType: string = "") {
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
        }

        addParameterMap(key: string, mapType: string = "") {
            var me = this;

            if (mapType != "PersistentMap")
                return me.addMap(key);

            return me.addPresistentMap(key);
        }

        private addMap(key: string) {
            var me = this;

            var map = {};

            me.maps[key] = map;

            return map;
        }

        private addPresistentMap(key: string) {
            var me = this;

            var maps = me.danelLocalStorage.persistentMaps;

            var map = maps[key];

            if (map == null) {

                map = {};

                maps[key] = map;
            }

            return map;
        }

        private getMap(key: string) {

            var me = this;

            var map = me.maps[key];

            if (map == null) { // If map does not exist create it.
                map = me.getPresistentMap(key);
            }

            return map;
        }

        private getPresistentMap(key: string) {
            var me = this;

            var maps = me.danelLocalStorage.persistentMaps;

            var map = maps[key];

            if (map != null)
                return map;

            return me.addPresistentMap(key);
        }
    }

    angular.module("Danel").service("ParametersService", ["$localStorage", "HttpService", ParametersService]);
}
