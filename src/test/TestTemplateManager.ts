import { TemplateManager } from "../templateManager";
import { Template } from "../template";

export class TestTemplateManager extends TemplateManager{
    public setTemplates(templates: Template[]){
        this.templates = templates;
    }
}