import * as cp from 'child_process';
import * as vscode from 'vscode';
import { Template } from './template';
import { CreateTemplate } from './createTemplate';

function exec(command: string, options: cp.ExecOptions): Promise<{ stdout: string; stderr: string }> {
	return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
		cp.exec(command, options, (error, stdout, stderr) => {
			if (error) {
				reject({ error, stdout, stderr });
			}
			resolve({ stdout, stderr });
		});
	});
}

export function getDotnetNewList(){
    return exec("dotnet new -l", {});
}

export function getDotnetNewTemplateInformation(template: Template){
	return exec(`dotnet new ${template.shortName} -h`, {});
}

export function executeTemplateCreation(templateInformation: CreateTemplate){
	let templateString = `dotnet new ${templateInformation.template} `;
	const keys = Object.keys(templateInformation.parameters);
	keys.forEach(key => {
		templateString += `--${key} `;
		if(templateInformation.parameters[key] !== ""){
			templateString += `${templateInformation.parameters[key]} `;
		}
	});
	return exec(templateString, {});
}