/// <reference path="../Services/app.ts" />

module Danel {
    //export interface Group {
    //    GroupID: number;
    //    GroupName: string;
    //}

    export class GroupingStore {
        private httpService: HttpService;
        private groups: Group[];

        public currentGroupingID: number;
        public currentGroupingName: string;

        public detailedGroupingID: number;
        public detailedGroupingName: string;

        public groupingChanged: Event;

        public detailedGroupingChanged: Event;

        constructor(httpService: HttpService) {
            var me = this;
            me.groups = [];
            me.httpService = httpService;
            me.currentGroupingID = 1;

            me.detailedGroupingID = 0;

            me.groupingChanged = new Event();
            me.detailedGroupingChanged = new Event();
            me.initialGroups();
        }

        initialGroups(): void {
            var me = this;
            var channel = { GroupID: 1, GroupName: 'אפיק' };
            var industry = { GroupID: 8, GroupName: 'ענף' };
            var currency = { GroupID: 9, GroupName: 'מטבע' };
            var geography = { GroupID: 14, GroupName: 'מדינה' };

            me.groups.push(channel);
            me.groups.push(industry);
            me.groups.push(currency);
            me.groups.push(geography);
        }

        getCurrentGroup(): Group {
            var me = this;

            for (var i = 0; i < me.groups.length; i++) {
                var gr = me.groups[i];

                if (gr.GroupID == me.currentGroupingID) {
                    return gr;
                }
            }
            return null;
        }

        // not working
        getCurrentDetailedGroup(): Group {
            var me = this;

            for (var i = 0; i < me.groups.length; i++) {
                var gr = me.groups[i];

                if (gr.GroupID == me.detailedGroupingID) {
                    return gr;
                }
            }
            return null;
        }


        changeGrouping(groupingID) {
            var me = this;
            me.currentGroupingID = groupingID;
            me.groupingChanged.fire(me.currentGroupingID);
        }


        changeDetailedGrouping(groupingID) {
            var me = this;
            me.detailedGroupingID = groupingID;
            me.detailedGroupingChanged.fire(me.detailedGroupingID);
        }
    }



    angular.module("Danel").service("GroupingStore",
        [
            "HttpService",
            GroupingStore
        ]);
} 