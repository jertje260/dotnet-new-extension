export class TemplateOption {
    constructor(
        public parameter: string,
        public description: string,
        public type: string,
        public required: boolean,
        public defaultValue: string,
        public selectOptions: SelectOption[]
    ) {

    }
}

export interface SelectOption {
    key: string;
    description: string;
}