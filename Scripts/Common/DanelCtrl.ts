
module Danel {
    export class DanelCtrl extends BaseCtrl {
        sce: ng.ISCEService;
        public state: any;
        public httpService: HttpService;
        public interval: ng.IIntervalService;
        public timeout: ng.ITimeoutService;
        public interpolate: ng.IInterpolateService;
        private currentInterval: any;
        private currentTimeout: any;
        public authService: AuthService;
        public eventService: EventsService;
        public parametersService: ParametersService;
        public idleService: IdleService;
        public localeService: LocaleService;
        public accountStore: AccountStore;
        private errorWindow;
        public errorText: string;
        public mainColor: string;
        public headerAndTotalColor: string;
        constructor(name: string, $scope) {

            super(name, $scope);
            var me = this;
            me.sce = me.resolve("$sce");
            me.localeService = me.resolve("LocaleService");
            me.httpService = me.resolve("HttpService");
            me.authService = me.resolve("AuthService");
            me.parametersService = me.resolve("ParametersService");
            me.idleService = me.resolve("IdleService");
            me.eventService = me.resolve("EventsService");
            me.accountStore = me.resolve("AccountStore");
            me.interval = me.resolve("$interval");
            me.timeout = me.resolve("$timeout");
            me.interpolate = me.resolve("$interpolate");
            me.errorWindow = $("#errorWindow");
            me.state = me.resolve("$state");
            if (!me.errorWindow.data("kendoWindow")) {
                me.errorWindow.kendoWindow({
                    draggable: false,
                    modal: true,
                    width: "200px",
                    title: "הודעת מערכת",
                    actions: [
                        "Close"
                    ],
                    visible: false
                });
            }

            me.applyChanges(() => {
                me.mainColor = me.parametersService.GetDanelParameter(WebParameter.WebsiteMainColor);
                me.headerAndTotalColor = me.parametersService.GetDanelParameter(WebParameter.HeaderAndTotalColor);

                $(".main-back-color").css("background-color", me.mainColor);
                $(".main-fore-color").css("color", me.mainColor);
                $(".main-border-color").css("border-color", me.mainColor);
                $(".k-filterable").css("background-color", me.headerAndTotalColor);
                $(".yield-view .k-grid-content table tbody tr:last").css("background-color", me.headerAndTotalColor);

            });


        }

        public closeErrorWindow(): void {
            var me = this;
            me.errorWindow.data("kendoWindow").close();
        }

        public openErrorWindow(err: DanelError): void {
            var me = this;

            //me.errorWindow.data("kendoWindow").center().open();
        }





        public onDispose() {
            var me = this;

            super.onDispose();
        }

        public handleRequest(url: string, request: UiRequestBase, auth_is_requierd: boolean = true): Q.Promise<any> {
            var me = this;

            //var lastDigestRun = Date.now();
            //me.currentTimeout = me.timeout(function () {
            //    var now = Date.now();
            //    if (now - lastDigestRun > 1 * 1000) {

            //        me.authService.logout().then(() => { window.location.assign('/'); });
            //    }
            //}, 20 * 1000);



            if (auth_is_requierd) {
                if (me.authService.authRequest(request))
                    return me.httpService.POST(url, request);
            }
            else
                return me.httpService.POST(url, request);


            //return Q.when(null);

            //return Q(me.authError(url, request))
            //    .fail(function (retVal: any) {
            //        //return retVal;
            //        me.errorWindow.data("kendoWindow").center().open();
            //    });
        }

        public handlesystemError(err: DanelError) {

        }

        private authError(url: string, request: UiRequestBase): any {
            var me = this;
            me.$log.log("authError in handleRequest - url: " + url + " request name: " + request.name);
            return null;
        }

    }
}