

module Danel {
    export class BaseCtrl {
        public $scope: any;
        public $exceptionHandler: any;
        public $log: ng.ILogService;
        public validation: ValidationManager

        //
        //  for logging purposes. Has no logical meaning
        //
        name: string;

        constructor(name: string, $scope) {
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

        public onDispose() {
            var me = this;

            me.$log.info(this.name + " dtor");
        }

        public resolve(name: string) {
            return App.resolve(name);
        }

        //
        //  Like $scope.$apply but effect only the current scope
        //
        public applyChanges(fn) {
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
            } catch (e) {
                me.$exceptionHandler(e);
            } finally {
                try {
                    me.$scope.$digest();
                } catch (e) {
                    me.$exceptionHandler(e);
                    throw e;
                }
            }
        }

        //
        //  Small helper which redirect to the specified absolute URL
        //
        public redirect(url: string) {
            var me = this;

            url = HttpService.fixUrl(url);

            window.location.assign(url);
        }
    }

    export class ValidationManager {
        errors: any;
        customErrors: any;
        ctrl: BaseCtrl;
        saved: boolean;
        scope: any;

        constructor(ctrl: BaseCtrl) {
            var me = this;

            me.ctrl = ctrl;
            me.scope = ctrl.$scope;
            me.errors = {};
            me.customErrors = {};
            me.saved = false;
            me.scope.errors = me.errors;

            me.ctrl.$scope.$watch(
                function () {
                    return me.customErrors;
                },
                function () {
                    me.recalc();
                },
                true);

            me.ctrl.$scope.$watch(
                function () {
                    return me.scope.form;
                },
                function () {
                    me.recalc();
                },
                true);
        }

        update(fieldName, errorType, on) {
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
        }

        watch(fieldName: string, errorType: string, callback: () => boolean) {
            var me = this;

            me.ctrl.$scope.$watch(fieldName, function (newValue, oldValue) {
                me.update(fieldName, errorType, callback());
            });
        }

        private recalc() {
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
        }

        isValid() {
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
        }
    }

    export class ValidationError {
        message: string;

        constructor(message) {
            var me = this;

            me.message = message;
        }
    }
} 
