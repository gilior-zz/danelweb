var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Danel;
(function (Danel) {
    var DanelCtrl = (function (_super) {
        __extends(DanelCtrl, _super);
        function DanelCtrl(name, $scope) {
            _super.call(this, name, $scope);
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
            var req = { webParameter: Danel.WebParameter.WebsiteMainColor + Danel.WebParameter.HeaderAndTotalColor };
            me.httpService.POST('/api/Parameters/GetParameter', req).then(function (res) {
                me.applyChanges(function () {
                    me.mainColor = res.ParameterItems[0].Value;
                    me.headerAndTotalColor = res.ParameterItems[1].Value;
                    $(".main-back-color").css("background-color", me.mainColor);
                    $(".main-fore-color").css("color", me.mainColor);
                    $(".main-border-color").css("border-color", me.mainColor);
                    $(".k-header").css("background-color", me.headerAndTotalColor);
                    $(".yield-view .k-grid-content table tbody tr:last-child").css("background-color", me.headerAndTotalColor);
                });
            }).fail(function (err) {
                me.$log.log("Error in getsiteTitle in DanelTopHeaderCtrl - Error Message:" + err.InternalMessage);
            });
        }
        DanelCtrl.prototype.closeErrorWindow = function () {
            var me = this;
            me.errorWindow.data("kendoWindow").close();
        };
        DanelCtrl.prototype.openErrorWindow = function (err) {
            var me = this;
            //me.errorWindow.data("kendoWindow").center().open();
        };
        DanelCtrl.prototype.onDispose = function () {
            var me = this;
            _super.prototype.onDispose.call(this);
        };
        DanelCtrl.prototype.handleRequest = function (url, request, auth_is_requierd) {
            if (auth_is_requierd === void 0) { auth_is_requierd = true; }
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
        };
        DanelCtrl.prototype.handlesystemError = function (err) {
        };
        DanelCtrl.prototype.authError = function (url, request) {
            var me = this;
            me.$log.log("authError in handleRequest - url: " + url + " request name: " + request.name);
            return null;
        };
        return DanelCtrl;
    }(Danel.BaseCtrl));
    Danel.DanelCtrl = DanelCtrl;
})(Danel || (Danel = {}));
//# sourceMappingURL=DanelCtrl.js.map