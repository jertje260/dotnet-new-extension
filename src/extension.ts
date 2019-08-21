// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as commands from './commands';
import { TemplateManager } from './templateManager';
import * as webviews from './webviews';
import * as path from 'path';
import * as fs from 'fs';
import { CreateTemplate } from './createTemplate';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let panel: vscode.WebviewPanel | undefined = undefined;
	let selectedLocation: string | undefined = undefined;
	let workspaceDir : string | undefined = vscode.workspace.rootPath;

	const templateManager = new TemplateManager(workspaceDir);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('dotnet-new.createItemFromTemplate', handleExtensionExecution);
	let disposableFromPath = vscode.commands.registerCommand('dotnet-new.createItemFromTemplateInFolder', handleExtensionExecution);

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableFromPath);

	function handleExtensionExecution(options: any) {

		if (options !== undefined) {
			selectedLocation = options.fsPath;
		} else {
			selectedLocation = undefined;
		}
		try {
			panel = vscode.window.createWebviewPanel(
				'templateSelector',
				'Select your template',
				vscode.ViewColumn.One,
				{
					enableScripts: true,
					localResourceRoots: [
						vscode.Uri.file(path.join(context.extensionPath, 'html')),
					]
				}
			);

			const filePath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'html', 'index.html'));
			const basePath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'html'));

			let html = fs.readFileSync(filePath.fsPath, 'utf8');
			const resource = basePath.with({ scheme: 'vscode-resource' });
			html = html.replace(/{{baseUrl}}/g, `${resource.scheme}:${resource.path}`);
			panel.webview.html = html;

			panel.webview.onDidReceiveMessage(
				(message: Message) => {
					switch (message.command) {
						case "loadTemplates": {
							if (panel !== undefined) {
								panel.title = 'Select your template';
								loadTemplates();
							}
							break;
						}
						case "loadTemplate": {
							if (panel !== undefined) {
								panel.title = `Create ${message.data}`;
								loadTemplate(message.data);
							}
							break;
						}
						case "executeCreation": {
							createTemplate(message.data);
							break;
						}
						case "setTitle": {
							if (panel !== undefined) {
								panel.title = message.data;
							}
							break;
						}
						case "selectFolder": {
							selectFolder();
							break;
						}
						case "dotnetVersion" : {
							getDotnetVersion();
							break;
						}
					}
				},
				undefined,
				context.subscriptions
			);
		} catch (e) {
			vscode.window.showErrorMessage("Something unexpected happened while trying to start extension", e);
			console.error(e);
		}

		function loadTemplates() {
			templateManager
				.getTemplates()
				.then((templates) => {
					if (panel !== undefined) {
						const message: Message = {
							command: 'templates',
							data: templates
						};
						panel.webview.postMessage(message);
					} else {
						vscode.window.showErrorMessage("No panel to display the templates");
					}
				})
				.catch((err) => {
					handleError(err);
				});
		}

		function loadTemplate(shortName: string) {
			templateManager.loadTemplateInfo(shortName)
				.then((template) => {
					if (panel !== undefined) {
						const message: Message = {
							command: 'template',
							data: template
						};
						panel.webview.postMessage(message);
						if (selectedLocation !== undefined) {
							const location: Message = {
								command: 'path',
								data: selectedLocation
							};
							panel.webview.postMessage(location);
						}
					} else {
						vscode.window.showErrorMessage("No panel to display the template information");
					}
				})
				.catch((err) => {
					handleError(err);
				});
		}

		function selectFolder() {
			vscode.window.showOpenDialog({
				canSelectFolders: true,
				canSelectFiles: false,
				canSelectMany: false,
				openLabel: "Select folder"
			}).then((paths) => {
				if (paths !== undefined) {
					if (panel !== undefined) {
						const message: Message = {
							command: 'path',
							data: paths[0].fsPath
						};
						panel.webview.postMessage(message);
					} else {
						vscode.window.showErrorMessage("No panel to send the path to");
					}

				} else {
					// no path selected	
				}
			});
		}

		function createTemplate(createObject: CreateTemplate) {
			commands.executeTemplateCreation(createObject, workspaceDir)
				.then((output) => {
					if (panel !== undefined) {
						const message: Message = {
							command: 'output',
							data: output.stdout
						};
						panel.webview.postMessage(message);
					} else {
						vscode.window.showErrorMessage("No panel to display the template creation output");
					}
				})
				.catch((err) => {
					handleError(err);
				});
		}

		function getDotnetVersion(){
			commands.getDotnetVersion(workspaceDir)
				.then((output) => {
					if (panel !== undefined) {
						const message: Message = {
							command: 'version',
							data: output
						};
						panel.webview.postMessage(message);
					} else {
						vscode.window.showErrorMessage("No panel to display the dotnet version");
					}
				})
				.catch((err) => {
					vscode.window.showErrorMessage("Error happened when getting dotnet version: " + err);
				});
		}

		function handleError(err: Error) {
			if (panel !== undefined) {
				panel.webview.html = webviews.getLoadingFailedView(JSON.stringify(err));
			} else {
				if (err.stack !== undefined) {
					vscode.window.showErrorMessage(err.stack);
				} else {
					vscode.window.showErrorMessage(err.message);
				}
			}
		}


	}
}

// this method is called when your extension is deactivated
export function deactivate() { }


interface Message {
	command: string;
	data: any;
}
