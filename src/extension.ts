// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as commands from './commands';
import * as handle from './outputHandling';
import { TemplateManager } from './templateManager';
import * as webviews from './webviews';
import * as path from 'path';
import * as fs from 'fs';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const templateManager = new TemplateManager();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dotnet-new-extension" is now active!');
	let panel: vscode.WebviewPanel | undefined = undefined;

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.selectTemplate', () => {
		// The code you place here will be executed every time your command is executed
		panel = vscode.window.createWebviewPanel(
			'templateSelector',
			'Select your template',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [
					vscode.Uri.file(path.join(context.extensionPath, 'src', 'html')),
				]
			}
		);

		const filePath: vscode.Uri = vscode.Uri.file(path.join(context.extensionPath, 'src', 'html', 'index.html'));
		panel.webview.html = fs.readFileSync(filePath.fsPath, 'utf8');

		panel.webview.onDidReceiveMessage(
			(message: Message) => {
				switch (message.command) {
					case "loadTemplates": {
						console.info('loading templates');
						loadTemplates();
						break;
					}
					case "loadTemplate": {
						console.info('loading template');
						loadTemplate(message.data);
						break;
					}
				}
			},
			undefined,
			context.subscriptions
		);
	});

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
				} else {
					vscode.window.showErrorMessage("No panel to display the template information");
				}
			})
			.catch((err) => {
				handleError(err);
			});
	}

	function handleError(err: Error) {
		if (panel !== undefined) {
			panel.webview.html = webviews.getLoadingFailedView(err);
		} else {
			vscode.window.showErrorMessage(err.message);
		}
	}

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


interface Message {
	command: string;
	data: any;
}

