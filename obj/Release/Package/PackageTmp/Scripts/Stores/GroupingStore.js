/// <reference path="../Services/app.ts" />
var Danel;
(function (Danel) {
    //export interface Group {
    //    GroupID: number;
    //    GroupName: string;
    //}
    var GroupingStore = (function () {
        function GroupingStore(httpService) {
            var me = this;
            me.groups = [];
            me.httpService = httpService;
            me.currentGroupingID = 1;
            me.detailedGroupingID = 0;
            me.groupingChanged = new Danel.Event();
            me.detailedGroupingChanged = new Danel.Event();
            me.initialGroups();
        }
        GroupingStore.prototype.initialGroups = function () {
            var me = this;
            var channel = { GroupID: 1, GroupName: 'אפיק' };
            var industry = { GroupID: 8, GroupName: 'ענף' };
            var currency = { GroupID: 9, GroupName: 'מטבע' };
            var geography = { GroupID: 14, GroupName: 'מדינה' };
            me.groups.push(channel);
            me.groups.push(industry);
            me.groups.push(currency);
            me.groups.push(geography);
        };
        GroupingStore.prototype.getCurrentGroup = function () {
            var me = this;
            for (var i = 0; i < me.groups.length; i++) {
                var gr = me.groups[i];
                if (gr.GroupID == me.currentGroupingID) {
                    return gr;
                }
            }
            return null;
        };
        // not working
        GroupingStore.prototype.getCurrentDetailedGroup = function () {
            var me = this;
            for (var i = 0; i < me.groups.length; i++) {
                var gr = me.groups[i];
                if (gr.GroupID == me.detailedGroupingID) {
                    return gr;
                }
            }
            return null;
        };
        GroupingStore.prototype.changeGrouping = function (groupingID) {
            var me = this;
            me.currentGroupingID = groupingID;
            me.groupingChanged.fire(me.currentGroupingID);
        };
        GroupingStore.prototype.changeDetailedGrouping = function (groupingID) {
            var me = this;
            me.detailedGroupingID = groupingID;
            me.detailedGroupingChanged.fire(me.detailedGroupingID);
        };
        return GroupingStore;
    }());
    Danel.GroupingStore = GroupingStore;
    angular.module("Danel").service("GroupingStore", [
        "HttpService",
        GroupingStore
    ]);
})(Danel || (Danel = {}));
//# sourceMappingURL=GroupingStore.js.map