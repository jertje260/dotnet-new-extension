import * as commands from './commands';
import * as handler from './outputHandling';
import { Template } from './template';

export class TemplateManager {
    private templates: Template[] = [];
    public load() {
        commands.getDotnetNewList()
            .then((output) => {
                this.templates = handler.handleDotnetListOutput(output.stdout);
                this.loadAdditionalTemplateInformation();
            })
            .catch((err) => {
                throw new Error("Failed to load templates");
            });
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
}
