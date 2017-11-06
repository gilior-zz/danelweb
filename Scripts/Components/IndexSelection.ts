/// <reference path="../typings/angularjs/angular.d.ts" />
module Danel {
    class IndexSelectionCtrl extends DanelCtrl {
        scope;
        private indexes: IndexDetails[];
        private danelShowIndex: string;
        private showPlusSign: boolean;
        private indexSelectionEx: boolean;
        private selectionPresentationIndex1: boolean;
        private selectionPresentationIndex2: boolean;
        private selectedIndex1Number: string;
        private selectedIndex2Number: string;
        private index1Name: string;
        private index2Name: string;
        private indexAddedEvent: Event;
        private indexChangedEvent: Event;

        //private httpService: HttpService;
        //private parametersService: ParametersService;
        //private eventsService: EventsService;
        private parameterMap;

        constructor($scope) {

            super("IndexSelectionCtrl", $scope);
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

                me.$scope.$watch(
                    function () {
                        return me.selectedIndex1Number;
                    },
                    function (newValue, oldValue) {

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

                me.$scope.$watch(
                    function () {
                        return me.selectedIndex2Number;
                    },
                    function (newValue, oldValue) {

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

        onDispose() {
            var me = this;

            super.onDispose();
        }


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

        private initIndexes() {
            var me = this;

            me.getIndexes()
                .then((indexes) => {
                    me.applyChanges(() => {
                        me.indexes = indexes;

                        me.indexes.unshift(<IndexDetails>{ Id: "-1", Name: "בחר מדד" });

                        var indexId: number = 0;
                        me.indexes.forEach((index) => {
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
                            me.parameterMap["Index1Id"] = { Active: "0", Id: me.indexes[0].Id, SelectedId: "0" }
                        }
                        me.selectedIndex1Number = me.parameterMap["Index1Id"].SelectedId;
                        if (me.parameterMap["Index1Id"].Active == "1") {
                            me.selectionPresentationIndex1 = true;
                        }

                        if (me.parameterMap["Index2Id"] == null || me.parameterMap["Index2Id"] == 'undefined') {
                            me.parameterMap["Index2Id"] = { Active: "0", Id: me.indexes[0].Id, SelectedId: "0" }
                        }
                        me.selectedIndex2Number = me.parameterMap["Index2Id"].SelectedId;
                        if (me.parameterMap["Index2Id"].Active == "1") {
                            me.selectionPresentationIndex2 = true;
                        }

                        if (me.selectionPresentationIndex1 && me.selectionPresentationIndex2)
                            me.showPlusSign = false;

                        if (me.selectionPresentationIndex1 || me.selectionPresentationIndex2)
                            me.indexSelectionEx = false;

                    })
                }).fail((err) => { me.$log.log("Error in DanelHoldingsGroupedCtrl in reloadData - Error Message:" + err.InternalMessage); });
        }

        showIndex(): boolean {
            var me = this;

            if (me.danelShowIndex == "false")
                return false;

            return true;
        }

        handleAddSelectorRequest() {
            var me = this;

            me.applyChanges(() => {

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

                else
                    if (me.selectionPresentationIndex1 == true) {
                        me.selectionPresentationIndex2 = true;
                        me.parameterMap["Index2Id"].Active = "1";
                        me.parameterMap["Index2Id"].Id = "-1";
                        me.selectedIndex2Number = "0";
                        me.showPlusSign = false;
                    }
            });
        }

        removeIndex1() {
            var me = this;
            me.applyChanges(() => {
                me.showPlusSign = true;
                me.selectionPresentationIndex1 = false;
                me.parameterMap["Index1Id"].Active = "0";
                me.indexChangedEvent.fireWithParams();

                if (!me.selectionPresentationIndex1 && !me.selectionPresentationIndex2)
                    me.indexSelectionEx = true;
            });
        }

        removeIndex2() {
            var me = this;
            me.applyChanges(() => {
                me.showPlusSign = true;
                me.selectionPresentationIndex2 = false;
                me.parameterMap["Index2Id"].Active = "0";
                me.indexChangedEvent.fireWithParams();

                if (!me.selectionPresentationIndex1 && !me.selectionPresentationIndex2)
                    me.indexSelectionEx = true;
            });
        }

        getIndexes(): Q.Promise<IndexDetails[]> {
            var me = this;

            if (me.indexes) {
                return Q.when(me.indexes);
            }

            var emptyRequest: EmptyRequest = <EmptyRequest>{

                // Init UiRequestBase
                name: "ResetPassword",
                entityList: [{ Id: me.accountStore.currentAccountNumber, EntityType: 50 }],


            };
            return me.handleRequest("/api/Index/GetAll", emptyRequest);

            //return me.httpService.POST("/api/Index/GetAll")
            //    .then((indexes) => {
            //        return me.indexes = indexes;
            //    });
        }

        //getIndexesOld() {
        //    var me = this;
        //    if (me.indexes == null)
        //        me.indexes = <IndexDetails[]>[{ IndexId: 1, Name: "תל אביב 25" }, { IndexId: 2, Name: "תל אביב 100" }, { IndexId: 3, Name: "עוד מדד" }];
        //}



    }

    angular.module('Danel')
        .controller("IndexSelectionCtrl",
        [
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
                scope: {
                },
                templateUrl: HttpService.fixUrl("/views/Directive/IndexSelection"),
                controller: "IndexSelectionCtrl as ctrl",
            };
        });
}

