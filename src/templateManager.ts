import * as commands from './commands';
import * as handler from './outputHandling';
import { Template } from './template';

export class TemplateManager {
    private templates: Template[] = [];

    public getTemplates(){
        return this.templates;
    }
    public load() {
        return commands.getDotnetNewList()
            .then((output) => {
                this.templates = handler.handleDotnetListOutput(output.stdout);
            })
            .catch((err) => {
                throw new Error("Failed to load templates");
            });
    }

    public loadTemplateInfo(templateShortName: string) {
        const template = this.getTemplateByShortname(templateShortName);
        if (template !== null) {
            commands.getDotnetNewTemplateInformation(template)
                .then((output) => {
                    handler.handleDotnetTemplateOutput(template, output.stdout);
                })
                .catch((err) => {
                    throw new Error(`Failed to get additional information for template ${template.shortName}`);
                });
        }
    }

    private loadAdditionalTemplateInformation() {
        this.templates.forEach(template => {
            commands.getDotnetNewTemplateInformation(template)
                .then((output) => {
                    handler.handleDotnetTemplateOutput(template, output.stdout);
                })
                .catch((err) => {
                    throw new Error(`Failed to get additional information for template ${template.shortName}`);
                });
        });
    }

    private getTemplateByShortname(shortName: string) {
        for (let i = 0; i < this.templates.length; i++) {
            if (this.templates[i].shortName === shortName) {
                return this.templates[i];
            }
        }
        return null;
    }
}
