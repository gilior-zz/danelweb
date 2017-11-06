module Danel {
    export class DOMHelpers {
        static getElementContent(parent, name, throwIfNotFound = true, throwIfEmpty = true) {
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
        }

        static getElementContentAsBoolean(element, name, throwIfNotFound, throwIfEmpty) {
            var content = DOMHelpers.getElementContent(element, name, throwIfNotFound, throwIfEmpty);

            var res = (content == "true");
            return res;
        }

        static getElement(element, name) {
            var sub = element.find(name);
            if (!sub.length) {
                throw new Error("Sub element " + name + " was not found");
            }

            return sub;
        }

        static getAttr(element, name, throwIfEmpty = undefined) {
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
        }
    }
} 
