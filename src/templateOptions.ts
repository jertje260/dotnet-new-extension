export class TemplateOption {
    constructor(
        public parameter: string,
        public description: string,
        public type: any,
        public optional: boolean,
        public defaultValue: any,
    ) {

    }
}