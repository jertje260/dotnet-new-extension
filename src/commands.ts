import * as cp from 'child_process';
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

export function getDotnetNewList(workspaceDir: string | undefined) {
	return exec("dotnet new -l", getOptions(workspaceDir));
}

export function getDotnetNewTemplateInformation(template: Template, workspaceDir: string | undefined) {
	return exec(`dotnet new ${template.shortName} -h`, getOptions(workspaceDir));
}

export function executeTemplateCreation(templateInformation: CreateTemplate, workspaceDir: string | undefined) {
	let templateString = `dotnet new ${templateInformation.template} `;
	const keys = Object.keys(templateInformation.parameters);
	keys.forEach(key => {
		templateString += `--${key} `;
		if (templateInformation.parameters[key] !== "") {
			templateString += `${templateInformation.parameters[key]} `;
		}
	});
	return exec(templateString, getOptions(workspaceDir));
}

export function getDotnetVersion(workspaceDir: string | undefined): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		exec("dotnet --version", getOptions(workspaceDir))
			.then((output) => {
				resolve(output.stdout);
			})
			.catch((output) => {
				reject(output.stderr);
			});
	});
}


function getOptions(workspaceDir: string | undefined): cp.ExecOptions {
	return {
		cwd: workspaceDir
	}
}