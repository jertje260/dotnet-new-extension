export class TemplateOption {
    constructor(
        public parameter: string,
        public description: string,
        public type: string,
        public optional: boolean,
        public defaultValue: string,
    ) {

    }
}