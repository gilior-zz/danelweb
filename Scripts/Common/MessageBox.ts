module Danel {
    export class MessageBox {
        public static showError(err) {
            var message;

            if (typeof err == "string") {
                message = err;
            }
            else if (err instanceof DanelError) {
                message = Errors.toUserMessage(err);
            }

            alert(message);
        }

        public static show(message, callback = null) {
            alert(message);

            if (callback) {
                callback();
            }
        }

        public static confirm(message, okCallback: () => void, cancelCallback: () => void = null) {
            var res = confirm(message);

            if (res) {
                okCallback();
            }
            else {
                if (cancelCallback) {
                    cancelCallback();
                }
            }
        }
    }
} 