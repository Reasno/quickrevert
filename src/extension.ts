import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.revertToRemote', (uri: vscode.Uri) => {
        if (!uri) {
            vscode.window.showErrorMessage('No file selected');
            return;
        }

        const filePath = uri.fsPath;
        const gitCommand = `git checkout origin/master -- ${filePath}`;

        exec(gitCommand, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Error: ${stderr}`);
                return;
            }

            vscode.window.showInformationMessage(`File ${filePath} reverted to origin/master`);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}