import { Template } from "./template";
import { TemplateOption } from "./templateOptions";

const separator = "----------------------------------------------------------------------------------------------------------------------------";
const allTemplatesRegex = /(.*?)[ ]{2,}(.*?)[ ]{2,}(.*?)[ ]{2,}(.*)/;
const singleTemplateRegex = /(.*?)( \(.*?\))?\n(Author: (.*?))\n(Description: (.*?)\n)?(Options:\n((.*?(\n))+)\n\n|(.*?\(No Parameters\)))/;
const optionsRegex = /((.*?)(--.*?)\s+(.*?)\n\s+(.*?) - (Optional|Required)(\n\s+Default: (.*))?)/;

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
            let match = lines[i].match(allTemplatesRegex);
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
    output = output.replace(/\r\n/g, '\n');

    const match = output.match(singleTemplateRegex);
    if (match !== null) {
        template.author = match[3] !== undefined ? match[4] : "";
        template.description = match[5] !== undefined ? match[6] : "";
        template = handleTemplateOptions(template, match[8]);
    } else {
        throw Error("matching failed for template: " + template.templateName);
    }
    return template;
}



//   --langVersion  Sets langVersion in the created project file
//                  text - Optional

//   --no-restore   If specified, skips the automatic restore of the project on create.
//                  bool - Optional
//                  Default: false / (*) true
function handleTemplateOptions(template: Template, options: string) {
    if (options === undefined) {
        return template;
    }

    let optionsList = options.split(/\n\n/g);
    optionsList.forEach(opt => {
        const match = opt.match(optionsRegex);
        if(match !== null){
            console.log(match);
        }
    });
    // foreach option add TemplateOptions to template

    return template;
}

function createTemplateOptions(
    parameter: string,
    description: string,
    type: string,
    optionalRequired: string,
    defaultValue: string) {
    // if(type === "bool"){
    //     defaultValue = 
    // }
}
