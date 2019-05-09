// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as commands from './commands';
import * as handle from './outputHandling';
import { TemplateManager } from './templateManager';
import * as webviews from './webviews';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dotnet-new-extension" is now active!');


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.selectTemplate', () => {
		const panel = vscode.window.createWebviewPanel(
			'templateSelector',
			'Select your template',
			vscode.ViewColumn.One,
			{}
		);


		panel.webview.html = webviews.getLoadingView();
		// The code you place here will be executed every time your command is executed

		const templateManager = new TemplateManager();
		try {
			templateManager
				.load()
				.then(() => {
					panel.webview.html = webviews.getTemplateView(templateManager.getTemplates());
				});
		} catch (err) {
			panel.webview.html = webviews.getLoadingFailedView(err);
		}

		panel.webview.onDidReceiveMessage(
			message => {
				
			},
			undefined,
			context.subscriptions
		  );
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
