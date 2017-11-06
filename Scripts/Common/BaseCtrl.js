var Danel;
(function (Danel) {
    var BaseCtrl = (function () {
        function BaseCtrl(name, $scope) {
            var me = this;
            me.$log = me.resolve("$log");
            me.name = name;
            me.$scope = $scope;
            me.$exceptionHandler = me.resolve("$exceptionHandler");
            me.validation = new ValidationManager(me);
            $scope.$on("$destroy", function () {
                me.onDispose();
            });
        }
        BaseCtrl.prototype.onDispose = function () {
            var me = this;
            me.$log.info(this.name + " dtor");
        };
        BaseCtrl.prototype.resolve = function (name) {
            return Danel.App.resolve(name);
        };
        //
        //  Like $scope.$apply but effect only the current scope
        //
        BaseCtrl.prototype.applyChanges = function (fn) {
            var me = this;
            var phase = me.$scope.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                //
                //  We are already in the middle of a digest phase
                //
                fn();
                return;
            }
            try {
                return fn();
            }
            catch (e) {
                me.$exceptionHandler(e);
            }
            finally {
                try {
                    me.$scope.$digest();
                }
                catch (e) {
                    me.$exceptionHandler(e);
                    throw e;
                }
            }
        };
        //
        //  Small helper which redirect to the specified absolute URL
        //
        BaseCtrl.prototype.redirect = function (url) {
            var me = this;
            url = Danel.HttpService.fixUrl(url);
            window.location.assign(url);
        };
        return BaseCtrl;
    }());
    Danel.BaseCtrl = BaseCtrl;
    var ValidationManager = (function () {
        function ValidationManager(ctrl) {
            var me = this;
            me.ctrl = ctrl;
            me.scope = ctrl.$scope;
            me.errors = {};
            me.customErrors = {};
            me.saved = false;
            me.scope.errors = me.errors;
            me.ctrl.$scope.$watch(function () {
                return me.customErrors;
            }, function () {
                me.recalc();
            }, true);
            me.ctrl.$scope.$watch(function () {
                return me.scope.form;
            }, function () {
                me.recalc();
            }, true);
        }
        ValidationManager.prototype.update = function (fieldName, errorType, on) {
            var me = this;
            if (on) {
                var field = me.customErrors[fieldName] = (me.customErrors[fieldName] || {});
                field[errorType] = true;
            }
            else {
                var field = me.customErrors[fieldName];
                if (field) {
                    delete field[errorType];
                }
                if ($.isEmptyObject(field)) {
                    delete me.customErrors[fieldName];
                }
            }
        };
        ValidationManager.prototype.watch = function (fieldName, errorType, callback) {
            var me = this;
            me.ctrl.$scope.$watch(fieldName, function (newValue, oldValue) {
                me.update(fieldName, errorType, callback());
            });
        };
        ValidationManager.prototype.recalc = function () {
            var me = this;
            var errors = {};
            var form = me.ctrl.$scope.form;
            if (form) {
                for (var errorType in form.$error) {
                    //
                    //  All errors of the same type but might be related to different fields
                    //
                    var modelControllers = form.$error[errorType];
                    for (var i = 0; i < modelControllers.length; i++) {
                        var modelController = modelControllers[i];
                        var fieldName = modelController.$name;
                        if (!errors[fieldName]) {
                            errors[fieldName] = {};
                        }
                        errors[fieldName][errorType] = (modelController.$dirty || me.saved) && modelController.$error[errorType];
                    }
                }
            }
            if (me.saved) {
                for (var customError in me.customErrors) {
                    var field = me.customErrors[customError];
                    for (var errorType in field) {
                        errors[customError] = errors[customError] || {};
                        errors[customError][errorType] = true;
                    }
                }
            }
            me.scope.errors = me.errors = errors;
        };
        ValidationManager.prototype.isValid = function () {
            var me = this;
            me.saved = true;
            me.recalc();
            if (me.ctrl.$scope.form) {
                //
                //  Current controller supports form validation
                //  Need to check $valid flag
                //  
                if (me.ctrl.$scope.form.$valid === false) {
                    return false;
                }
            }
            if (!$.isEmptyObject(this.errors)) {
                return false;
            }
            return true;
        };
        return ValidationManager;
    }());
    Danel.ValidationManager = ValidationManager;
    var ValidationError = (function () {
        function ValidationError(message) {
            var me = this;
            me.message = message;
        }
        return ValidationError;
    }());
    Danel.ValidationError = ValidationError;
})(Danel || (Danel = {}));
//# sourceMappingURL=BaseCtrl.js.map