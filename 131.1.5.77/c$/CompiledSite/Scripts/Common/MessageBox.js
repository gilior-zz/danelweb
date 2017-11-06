var Danel;
(function (Danel) {
    var MessageBox = (function () {
        function MessageBox() {
        }
        MessageBox.showError = function (err) {
            var message;
            if (typeof err == "string") {
                message = err;
            }
            else if (err instanceof Danel.DanelError) {
                message = Danel.Errors.toUserMessage(err);
            }
            alert(message);
        };
        MessageBox.show = function (message, callback) {
            if (callback === void 0) { callback = null; }
            alert(message);
            if (callback) {
                callback();
            }
        };
        MessageBox.confirm = function (message, okCallback, cancelCallback) {
            if (cancelCallback === void 0) { cancelCallback = null; }
            var res = confirm(message);
            if (res) {
                okCallback();
            }
            else {
                if (cancelCallback) {
                    cancelCallback();
                }
            }
        };
        return MessageBox;
    }());
    Danel.MessageBox = MessageBox;
})(Danel || (Danel = {}));
//# sourceMappingURL=MessageBox.js.map