var Danel;
(function (Danel) {
    var DOMHelpers = (function () {
        function DOMHelpers() {
        }
        DOMHelpers.getElementContent = function (parent, name, throwIfNotFound, throwIfEmpty) {
            if (throwIfNotFound === void 0) { throwIfNotFound = true; }
            if (throwIfEmpty === void 0) { throwIfEmpty = true; }
            if (throwIfEmpty === undefined) {
                throwIfEmpty = true;
            }
            if (throwIfNotFound === undefined) {
                throwIfNotFound = true;
            }
            var sub = parent.find(name);
            if (!sub.length) {
                if (throwIfNotFound) {
                    throw new Error("Sub element " + name + " was not found");
                }
                else {
                    return undefined;
                }
            }
            var content = sub.text();
            if (throwIfEmpty && !content) {
                throw new Error("Sub element " + name + " must be non empty");
            }
            return content;
        };
        DOMHelpers.getElementContentAsBoolean = function (element, name, throwIfNotFound, throwIfEmpty) {
            var content = DOMHelpers.getElementContent(element, name, throwIfNotFound, throwIfEmpty);
            var res = (content == "true");
            return res;
        };
        DOMHelpers.getElement = function (element, name) {
            var sub = element.find(name);
            if (!sub.length) {
                throw new Error("Sub element " + name + " was not found");
            }
            return sub;
        };
        DOMHelpers.getAttr = function (element, name, throwIfEmpty) {
            if (throwIfEmpty === void 0) { throwIfEmpty = undefined; }
            var sub = element.attr(name);
            if (throwIfEmpty === undefined) {
                throwIfEmpty = true;
            }
            if (sub === undefined) {
                if (throwIfEmpty) {
                    //
                    //  attribute does exist
                    //
                    throw new Error("Attribute " + name + " was not found");
                }
                else {
                    return undefined;
                }
            }
            if (!sub) {
                if (throwIfEmpty) {
                    //
                    //  attribute is empty
                    //
                    throw new Error("Attribute " + name + " was not found");
                }
            }
            return sub;
        };
        return DOMHelpers;
    }());
    Danel.DOMHelpers = DOMHelpers;
})(Danel || (Danel = {}));
//# sourceMappingURL=DOMHelpers.js.map