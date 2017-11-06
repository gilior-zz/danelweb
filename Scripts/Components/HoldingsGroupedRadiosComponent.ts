module Danel {
    class HoldingsGroupedRadiosCtrl extends BaseCtrl {
        public group: Group;
        public currentID: number;
        groupingStore: GroupingStore;
        constructor($scope, groupingStore: GroupingStore) {
            var me = this;
            super("HoldingsGroupedRadiosCtrl", $scope);

            me.groupingStore = groupingStore;
            me.group = groupingStore.getCurrentGroup();
            me.currentID = me.group.GroupID;
            me.watchData();

        }

        onDispose() {
            var me = this;
            super.onDispose();
        }

        watchData(): void {
            var me = this;
            me.$scope.$watch(function () {
                return me.currentID;
            },
                function (newValue: number, oldValue: number) {
                    me.groupingStore.changeGrouping(newValue);
                    me.group = me.groupingStore.getCurrentGroup();
                });
        }
    }


    angular.module("Danel").controller("HoldingsGroupedRadiosCtrl",
        [
            "$scope",
            "GroupingStore",
            HoldingsGroupedRadiosCtrl
        ]);

    angular.module("Danel").directive("danelHoldingsGroupedRadios", ["$log", function ($log) {
        return {
            restrict: "E",
            scope: {
            },
            templateUrl: HttpService.fixUrl("/views/Directive/HoldingsGroupedRadios"),
            replace: true,
            controller: "HoldingsGroupedRadiosCtrl as ctrl",
        };
    }]);
}