/// <reference path="../typings/q/q.d.ts" />
/// <reference path="app.ts" />

module Danel {
    export class LocaleService {
        constructor() {
            var me = this;
        }

        getMonthShortName(month: number) : string {
            var names: string[] = [
                "ינו",
                "פבו",
                "מרץ",
                "אפר",
                "מאי",
                "יונ",
                "יול",
                "אוג",
                "ספט",
                "אוק",
                "נוב",
                "דצמ",
            ];

            if (month < 1 || month > 12) {
                return month + "";
            }

            return names[month - 1];
        }
    }

    angular.module("Danel").service("LocaleService", LocaleService);
}  
