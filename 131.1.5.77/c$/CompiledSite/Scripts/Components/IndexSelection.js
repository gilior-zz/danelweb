var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typings/angularjs/angular.d.ts" />
var Danel;
(function (Danel) {
    var IndexSelectionCtrl = (function (_super) {
        __extends(IndexSelectionCtrl, _super);
        function IndexSelectionCtrl($scope) {
            _super.call(this, "IndexSelectionCtrl", $scope);
            var me = this;
            me.danelShowIndex = $scope.$parent.danelShowIndex;
            if (me.danelShowIndex != "false") {
                //me.httpService = httpService;
                //me.parametersService = parametersService;
                //me.eventsService = eventsService;
                //Add Parameters Map to the Parameters Service
                me.parameterMap = me.parametersService.getParametersMap("IndexSelection", "PersistentMap");
                // Add Event Index Changed Event
                me.indexAddedEvent = me.eventService.addEvent("IndexSelection", "IndexAdded", me.parameterMap);
                me.indexChangedEvent = me.eventService.addEvent("IndexSelection", "IndexChanged", me.parameterMap);
                // Initialize Indexes Status
                me.initIndexes();
                me.$scope.$watch(function () {
                    return me.selectedIndex1Number;
                }, function (newValue, oldValue) {
                    if (newValue == oldValue)
                        return;
                    if (me.selectedIndex1Number != null) {
                        me.parameterMap["Index1Id"].SelectedId = me.selectedIndex1Number;
                        me.parameterMap["Index1Id"].Id = me.indexes[me.selectedIndex1Number].Id;
                        me.index1Name = me.indexes[me.selectedIndex1Number].Name;
                        if (me.selectedIndex1Number != "0")
                            me.indexAddedEvent.fireWithParams();
                    }
                });
                me.$scope.$watch(function () {
                    return me.selectedIndex2Number;
                }, function (newValue, oldValue) {
                    if (newValue == oldValue)
                        return;
                    if (me.selectedIndex2Number != null) {
                        me.parameterMap["Index2Id"].SelectedId = me.selectedIndex2Number;
                        me.parameterMap["Index2Id"].Id = me.indexes[me.selectedIndex2Number].Id;
                        me.index2Name = me.indexes[me.selectedIndex2Number].Name;
                        if (me.selectedIndex2Number != "0")
                            me.indexAddedEvent.fireWithParams();
                    }
                });
            }
        }
        IndexSelectionCtrl.prototype.onDispose = function () {
            var me = this;
            _super.prototype.onDispose.call(this);
        };
        //private initIndexes() {
        //    var me = this;
        //    me.applyChanges(() => {
        //        me.indexes = <IndexDetails[]>[
        //            { Id: 1, Name: "אינדקס 1" },
        //            { Id: 2, Name: "אינדקס 2" },
        //            { Id: 3, Name: "אינדקס 3" },
        //            { Id: 4, Name: "אינדקס 4" },
        //            { Id: 5, Name: "אינדקס 5" },
        //            { Id: 6, Name: "אינדקס 6" },
        //            { Id: 7, Name: "אינדקס 7" },
        //            { Id: 8, Name: "אינדקס 8" },
        //            { Id: 9, Name: "אינדקס 9" },
        //        ];
        //        me.indexes.unshift(<IndexDetails>{ Id: "-1", Name: "בחר מדד" });
        //        me.selectionPresentationIndex1 = false;
        //        me.selectionPresentationIndex2 = false;
        //        me.showPlusSign = true;
        //        me.indexSelectionEx = true;
        //        if (me.parameterMap["Index1Id"] == null || me.parameterMap["Index1Id"] == 'undefined') {
        //            me.parameterMap["Index1Id"] = { Active: "0", Id: me.indexes[0].Id, SelectedId: "0" }
        //        }
        //        me.selectedIndex1Number = me.parameterMap["Index1Id"].SelectedId;
        //        if (me.parameterMap["Index1Id"].Active == "1") {
        //            me.selectionPresentationIndex1 = true;
        //        }
        //        if (me.parameterMap["Index2Id"] == null || me.parameterMap["Index2Id"] == 'undefined') {
        //            me.parameterMap["Index2Id"] = { Active: "0", Id: me.indexes[0].Id, SelectedId: "0" }
        //                    }
        //        me.selectedIndex2Number = me.parameterMap["Index2Id"].SelectedId;
        //        if (me.parameterMap["Index2Id"].Active == "1") {
        //            me.selectionPresentationIndex2 = true;
        //        }
        //        if (me.selectionPresentationIndex1 && me.selectionPresentationIndex2)
        //            me.showPlusSign = false;
        //        if (me.selectionPresentationIndex1 || me.selectionPresentationIndex2)
        //            me.indexSelectionEx = false;
        //    });
        //}
        IndexSelectionCtrl.prototype.initIndexes = function () {
            var me = this;
            me.getIndexes()
                .then(function (indexes) {
                me.applyChanges(function () {
                    me.indexes = indexes;
                    me.indexes.unshift({ Id: "-1", Name: "בחר מדד" });
                    var indexId = 0;
                    me.indexes.forEach(function (index) {
                        index.SelectedId = indexId;
                        indexId++;
                    });
                    me.selectionPresentationIndex1 = false;
                    me.selectionPresentationIndex2 = false;
                    me.showPlusSign = true;
                    me.indexSelectionEx = true;
                    me.index1Name = "מדד 1";
                    me.index2Name = "מדד 2";
                    if (me.parameterMap["Index1Id"] == null || me.parameterMap["Index1Id"] == 'undefined') {
                        me.parameterMap["Index1Id"] = { Active: "0", Id: me.indexes[0].Id, SelectedId: "0" };
                    }
                    me.selectedIndex1Number = me.parameterMap["Index1Id"].SelectedId;
                    if (me.parameterMap["Index1Id"].Active == "1") {
                        me.selectionPresentationIndex1 = true;
                    }
                    if (me.parameterMap["Index2Id"] == null || me.parameterMap["Index2Id"] == 'undefined') {
                        me.parameterMap["Index2Id"] = { Active: "0", Id: me.indexes[0].Id, SelectedId: "0" };
                    }
                    me.selectedIndex2Number = me.parameterMap["Index2Id"].SelectedId;
                    if (me.parameterMap["Index2Id"].Active == "1") {
                        me.selectionPresentationIndex2 = true;
                    }
                    if (me.selectionPresentationIndex1 && me.selectionPresentationIndex2)
                        me.showPlusSign = false;
                    if (me.selectionPresentationIndex1 || me.selectionPresentationIndex2)
                        me.indexSelectionEx = false;
                });
            }).fail(function (err) { me.$log.log("Error in DanelHoldingsGroupedCtrl in reloadData - Error Message:" + err.InternalMessage); });
        };
        IndexSelectionCtrl.prototype.showIndex = function () {
            var me = this;
            if (me.danelShowIndex == "false")
                return false;
            return true;
        };
        IndexSelectionCtrl.prototype.handleAddSelectorRequest = function () {
            var me = this;
            me.applyChanges(function () {
                me.indexSelectionEx = false;
                if (me.selectionPresentationIndex1 == false) {
                    me.selectionPresentationIndex1 = true;
                    me.parameterMap["Index1Id"].Active = "1";
                    me.parameterMap["Index1Id"].Id = "-1";
                    me.selectedIndex1Number = "0";
                    if (me.selectionPresentationIndex2 == true) {
                        me.showPlusSign = false;
                    }
                }
                else if (me.selectionPresentationIndex1 == true) {
                    me.selectionPresentationIndex2 = true;
                    me.parameterMap["Index2Id"].Active = "1";
                    me.parameterMap["Index2Id"].Id = "-1";
                    me.selectedIndex2Number = "0";
                    me.showPlusSign = false;
                }
            });
        };
        IndexSelectionCtrl.prototype.removeIndex1 = function () {
            var me = this;
            me.applyChanges(function () {
                me.showPlusSign = true;
                me.selectionPresentationIndex1 = false;
                me.parameterMap["Index1Id"].Active = "0";
                me.indexChangedEvent.fireWithParams();
                if (!me.selectionPresentationIndex1 && !me.selectionPresentationIndex2)
                    me.indexSelectionEx = true;
            });
        };
        IndexSelectionCtrl.prototype.removeIndex2 = function () {
            var me = this;
            me.applyChanges(function () {
                me.showPlusSign = true;
                me.selectionPresentationIndex2 = false;
                me.parameterMap["Index2Id"].Active = "0";
                me.indexChangedEvent.fireWithParams();
                if (!me.selectionPresentationIndex1 && !me.selectionPresentationIndex2)
                    me.indexSelectionEx = true;
            });
        };
        IndexSelectionCtrl.prototype.getIndexes = function () {
            var me = this;
            if (me.indexes) {
                return Q.when(me.indexes);
            }
            var emptyRequest = {
                // Init UiRequestBase
                name: "ResetPassword",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],
            };
            return me.handleRequest("/api/Index/GetAll", emptyRequest);
            //return me.httpService.POST("/api/Index/GetAll")
            //    .then((indexes) => {
            //        return me.indexes = indexes;
            //    });
        };
        return IndexSelectionCtrl;
    }(Danel.DanelCtrl));
    angular.module('Danel')
        .controller("IndexSelectionCtrl", [
        "$scope",
        "HttpService",
        "ParametersService",
        "EventsService",
        IndexSelectionCtrl
    ])
        .directive("danelIndexSelection", function () {
        return {
            restrict: "E",
            replace: true,
            scope: {},
            templateUrl: Danel.HttpService.fixUrl("/views/Directive/IndexSelection"),
            controller: "IndexSelectionCtrl as ctrl",
        };
    });
})(Danel || (Danel = {}));
//# sourceMappingURL=IndexSelection.js.map