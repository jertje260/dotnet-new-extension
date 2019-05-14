import { TemplateOption } from "./templateOptions";

export class Template {
    public description: string;
    public author: string;
    public options: { [key: string]: TemplateOption; };
    public loaded: boolean = false;

    constructor(public templateName: string, public shortName: string, public languages: string[], public defaultLanguage: string = "", public tags: string[]) {
        this.description = "";
        this.author = "";
        this.options = {};
        this.options["name"] = new TemplateOption(
            "name",
            "The name for the output being created. If no name is specified, the name of the current directory is used.",
            "text",
            false,
            "",
            []
        );

        this.options["force"] = new TemplateOption(
            "force",
            "Forces content to be generated even if it would change existing files.",
            "bool",
            false,
            "false",
            []
        );
    }
}