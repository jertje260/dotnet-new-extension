import { TemplateOptions } from "./templateOptions";

export class Template {
    public description: string;
    public author: string;
    public options: TemplateOptions[];

    constructor(public templateName: string, public shortName: string, public languages: string[], public defaultLanguage: string = "", public tags: string[]) {
        this.description = "";
        this.author = "";
        this.options = [];
    }
}