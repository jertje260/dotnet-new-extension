export class TemplateOption {
    constructor(
        public parameter: string,
        public description: string,
        public type: string,
        public required: boolean,
        public defaultValue: string,
        public selectOptions: SelectOption[]
    ) {
        this.parameter = this.parameter.trim();
        if (this.description !== undefined) {
            this.description = this.description.trim();
        }
        if (this.defaultValue !== undefined) {
            this.defaultValue = this.defaultValue.trim();
        }
    }
}

export interface SelectOption {
    key: string;
    description: string;
}