import * as commands from './commands';
import * as handler from './outputHandling';
import { Template } from './template';

export class TemplateManager {
    protected templates: Template[] = [];
    private loaded: boolean = false;

    public getTemplates(): Promise<Template[]> {
        return commands.getDotnetNewList()
            .then((output) => {
                if (this.loaded) {
                    return this.templates;
                }
                this.templates = handler.handleDotnetListOutput(output.stdout);
                return this.templates;
            })
            .catch((err) => {
                throw new Error("Failed to load templates");
            });
    }

    public loadTemplateInfo(templateShortName: string): Promise<Template> {
        return new Promise((resolve, reject) => {
            const template = this.getTemplateByShortname(templateShortName);
            if (template !== null) {
                if (template.loaded) {
                    resolve(template);
                } else {
                    commands.getDotnetNewTemplateInformation(template)
                        .then((output) => {
                            try {
                                resolve(handler.handleDotnetTemplateOutput(template, output.stdout));
                            } catch (err) {
                                reject(err);
                            }
                        })
                        .catch((err) => {
                            reject(`Failed to get additional information for template '${template.shortName}'`);
                        });
                }
            } else {
                reject(`Could not find template with name '${templateShortName}'`);
            }
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
