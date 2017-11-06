var Danel;
(function (Danel) {
    var Params = (function () {
        function Params() {
        }
        Params.prototype.GetDanelParameter = function (num) {
            var me = this;
            if (me.parameters == null)
                return null;
            var item = me.parameters.ParameterItems.filter(function (i) { return i.WebParameter == num; });
            if (item == null)
                return null;
            return item[0].Value;
        };
        return Params;
    }());
    Danel.Params = Params;
    Danel.DanelParams = new Params();
})(Danel || (Danel = {}));
//# sourceMappingURL=file1.js.map