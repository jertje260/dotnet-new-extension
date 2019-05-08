import { Template } from "./template";
import { TemplateOptions } from "./templateOptions";

const separator = "----------------------------------------------------------------------------------------------------------------------------";
const regex = /(.*?)[ ]{2,}(.*?)[ ]{2,}(.*?)[ ]{2,}(.*)/;

export function handleDotnetListOutput(output: string): Array<Template> {
    output = output.replace(/\r\n/g, '\n');
    let lines = output.split('\n');

    let templates: Template[] = [];

    let templateListStarted = false;
    for (let i = 0; i < lines.length; i++) {
        if (!templateListStarted) {
            if (lines[i] === separator) {
                templateListStarted = true;
            }
        } else {
            let match = lines[i].match(regex);
            if (match !== null) {
                templates.push(getTemplateFromMatch(match));
            }
        }
    }

    return templates;
}

function getTemplateFromMatch(match: RegExpMatchArray) {
    const templateName = match[1];
    const shortName = match[2];
    const languages = match[3].trim().split(', ');
    let tags = match[4].trim().split('/');
    let defaultLanguage = "";
    const cleanedLanguages: string[] = [];


    const defaultLanguageRegex = /\[(.*)\]/;
    languages.forEach(lang => {
        const match = lang.match(defaultLanguageRegex);
        if (match !== null) {
            defaultLanguage = match[1];
            cleanedLanguages.push(match[1]);
        } else {
            cleanedLanguages.push(lang);
        }

    });

    return new Template(templateName, shortName, cleanedLanguages, defaultLanguage, tags);
}

export function handleDotnetTemplateOutput(template: Template, output: string) {
    const regex = /(.*?) \(.*?\)\n(Author: (.*))\n(Description: (.*)\n)?(Options:\n(.*(\n))+\n\n|\s+\(No Parameters\))/gm;
    output = output.replace(/\r\n/g, '\n');
    
    const match = output.match(regex);
    if(match !== null){
        template.author = match[3];
        template.description = match[5];
        handleTemplateOptions(template, match[7]);
    } else {
        let x = 0;
    }
}



//   --langVersion  Sets langVersion in the created project file
//                  text - Optional

//   --no-restore   If specified, skips the automatic restore of the project on create.
//                  bool - Optional
//                  Default: false / (*) true
function handleTemplateOptions(template: Template, options: string) {
    if(options === null){
        return;
    }
    // foreach option add TemplateOptions to template
}

function handleTemplateOption(option: string[]): TemplateOptions {
    return new TemplateOptions("", "", "", false, "");
}