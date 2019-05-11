import { Template } from "./template";
import { TemplateOption, SelectOption } from "./templateOptions";

const separator = "----------------------------------------------------------------------------------------------------------------------------";

const allTemplatesRegex = /(.*?)[ ]{2,}(.*?)[ ]{2,}(.*?)[ ]{2,}(.*)/;
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

const defaultLanguageRegex = /\[(.*)\]/;
function getTemplateFromMatch(match: RegExpMatchArray) {
    const templateName = match[1];
    const shortName = match[2];
    const languages = match[3].trim().split(', ');
    let tags = match[4].trim().split('/');
    let defaultLanguage = "";
    const cleanedLanguages: string[] = [];

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

const singleTemplateRegex = /(.*?)( \(.*?\))?\n(Author: (.*?))\n(Description: (((.*?)\n)*))?(Options:\s*\n((.*?(\n))+)\n\n|(.*?\(No Parameters\)))/;
export function handleDotnetTemplateOutput(template: Template, output: string) {
    output = output.replace(/\r\n/g, '\n');

    const match = output.match(singleTemplateRegex);
    if (match !== null) {
        template.author = match[3] !== undefined ? match[4] : "";
        template.description = match[5] !== undefined ? match[6].replace(/\n/g, ' ').trim() : "";
        template = handleTemplateOptions(template, match[10]);
    } else {
        throw Error("matching failed for template: " + template.templateName);
    }
    template.loaded = true;
    return template;
}



//   --langVersion  Sets langVersion in the created project file
//                  text - Optional

//   --no-restore   If specified, skips the automatic restore of the project on create.
//                  bool - Optional
//                  Default: false / (*) true
const optionsRegex = /(.*?)(--.*?)\s+(.*?)\n(\s+((.*?) - (Optional|Required))|((\s+(.*?) - (.*?\n))+))\n?(\s+Default: (.*))?/;
function handleTemplateOptions(template: Template, options: string) {
    if (options === undefined) {
        return template;
    }

    let optionsList = options.split(/\n\n/g);
    optionsList.forEach(opt => {
        const match = opt.match(optionsRegex);
        if (match !== null) {
            const templateOption = createTemplateOption(match[3], match[4], match[6], match[7], match[13], match[8]);
            template.options[templateOption.parameter] = templateOption;
        } else {
            throw Error("matching failed for option: " + template.templateName);
        }
    });
    // foreach option add TemplateOptions to template

    return template;
}

const defaultValueBoolRegex = /(\(\*\))?[ ]?(.*?) \/ (\(\*\))?[ ]?(.*)/;
function createTemplateOption(
    parameter: string,
    description: string,
    type: string,
    optionalRequired: string,
    defaultValue: string,
    optionList: string) {

    let selectOptions: SelectOption[] = [];
    if (type === "bool") {
        const match = defaultValue.match(defaultValueBoolRegex);
        if (match !== null) {
            defaultValue = match[1] !== undefined ? match[2] : match[4];
        }
    }
    if (type === undefined && optionList !== undefined) {
        type = "select";
        selectOptions = createSelectOptions(optionList);
    }
    return new TemplateOption(parameter, description, type, optionalRequired === "Required", defaultValue, selectOptions);
}

const optionRegex = /(.*) - (.*)/;
function createSelectOptions(optionList: string): SelectOption[] {
    const options = optionList.split('\n');
    let selections : SelectOption[] = [];
    options.forEach((opt) =>{
        const match = opt.trim().match(optionRegex);
        if(match !== null){
            selections.push({key: match[1].trim(), description: match[2].trim()});
        }
    });
    return selections;
}
