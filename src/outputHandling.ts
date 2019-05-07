import { Template } from "./template";

const separator = "----------------------------------------------------------------------------------------------------------------------------";
const regex = /(.*?)[ ]{2,}(.*?)[ ]{2,}(.*?)[ ]{2,}(.*)/;

export function handleDotnetListOutput(output: string){
    let lines = output.split('\n');

    let templates: Template[] = [];

    let templateListStarted = false;
    for(let i = 0; i < lines.length; i++){
        if(!templateListStarted){
            if(lines[i].startsWith(separator)){
                templateListStarted = true;
            }
        } else {
            let match = lines[i].match(regex);
            if(match !== null){
                templates.push(getTemplateFromMatch(match));
            }
        }
    }

    return templates;
}

function getTemplateFromMatch(match: RegExpMatchArray){
    const templateName = match[1];
    const shortName = match[2];
    let languages = match[3].trim().split(', ');
    let tags = match[4].trim().split('/');

    return new Template(templateName, shortName, languages, tags);
}