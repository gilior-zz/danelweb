var Danel;
(function (Danel) {
    var JSONHelpers = (function () {
        function JSONHelpers() {
        }
        JSONHelpers.tryJSONParse = function (str) {
            try {
                return JSON.parse(str);
            }
            catch (e) {
                return null;
            }
        };
        return JSONHelpers;
    }());
    Danel.JSONHelpers = JSONHelpers;
})(Danel || (Danel = {}));
//# sourceMappingURL=JSONHelpers.js.map