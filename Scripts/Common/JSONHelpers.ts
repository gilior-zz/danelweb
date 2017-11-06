module Danel {
    export class JSONHelpers {
        public static tryJSONParse(str) {
            try {
                return JSON.parse(str);
            }
            catch (e) {
                return null;
            }
        }
    }
} 
