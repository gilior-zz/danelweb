module Danel {
    export class Params {
        public parameters: Parameters;
        constructor() {

        }
        public GetDanelParameter(num: number): string {

            var me = this;

            if (me.parameters == null) return null;

            let item = me.parameters.ParameterItems.filter(i => i.WebParameter == num);
            if (item == null) return null;
            return item[0].Value;

        }
    }

    export var DanelParams: Params = new Params();
}



