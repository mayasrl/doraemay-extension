import * as vscode from 'vscode';
import * as colorHighlight from './colorHighlight';
import * as betterComments from './betterComments';
import * as indentRainbow from './indentRainbow';

let timeout: NodeJS.Timeout | undefined;

export function activate(context: vscode.ExtensionContext): void {
    console.log('Doraemay ativo');
    
    indentRainbow.setupIndentRainbow(context);
    
    if (vscode.window.activeTextEditor) {
        triggerUpdate(vscode.window.activeTextEditor);
    }
    
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) triggerUpdate(editor);
        })
    );
    
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event => {
            const editor = vscode.window.activeTextEditor;
            if (editor && event.document === editor.document) {
                triggerUpdate(editor);
            }
        })
    );
    
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('doraemay')) {
                const editor = vscode.window.activeTextEditor;
                if (editor) {
                    colorHighlight.disposeDecorations();
                    betterComments.disposeDecorations();
                    triggerUpdate(editor);
                }
            }
        })
    );
    
    context.subscriptions.push(
        vscode.commands.registerCommand('doraemay.toggleColorHighlight', async () => {
            const cfg = vscode.workspace.getConfiguration('doraemay.colorHighlight');
            const val = cfg.get('enable', true);
            await cfg.update('enable', !val, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(`Color Highlight ${!val ? 'on' : 'off'}`);
        })
    );
    
    context.subscriptions.push(
        vscode.commands.registerCommand('doraemay.toggleBetterComments', async () => {
            const cfg = vscode.workspace.getConfiguration('doraemay.betterComments');
            const val = cfg.get('enable', true);
            await cfg.update('enable', !val, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(`Better Comments ${!val ? 'on' : 'off'}`);
        })
    );
    
    context.subscriptions.push(
        vscode.commands.registerCommand('doraemay.toggleIndentRainbow', async () => {
            const cfg = vscode.workspace.getConfiguration('doraemay.indentRainbow');
            const val = cfg.get('enable', true);
            await cfg.update('enable', !val, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(`Indent Rainbow ${!val ? 'on' : 'off'}`);
        })
    );
    
    context.subscriptions.push(
        vscode.commands.registerCommand('doraemay.showInfo', () => {
            vscode.window.showInformationMessage('Doraemay v1.0.0 by @mayasrs');
        })
    );
}

function triggerUpdate(editor: vscode.TextEditor): void {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => updateDecorations(editor), 100);
}

function updateDecorations(editor: vscode.TextEditor): void {
    colorHighlight.updateColorDecorations(editor);
    betterComments.updateBetterCommentsDecorations(editor);
    indentRainbow.updateIndentDecorations(editor);
}

export function deactivate(): void {
    if (timeout) clearTimeout(timeout);
    colorHighlight.disposeDecorations();
    betterComments.disposeDecorations();
}
