import * as vscode from 'vscode';
import * as colorHighlight from './colorHighlight';
import * as betterComments from './betterComments';

let timeout: NodeJS.Timeout | undefined;

export function activate(ctx: vscode.ExtensionContext): void {
    console.log('Doraemay ativo');
    
    betterComments.init();
    
    if (vscode.window.activeTextEditor) {
        triggerUpdate(vscode.window.activeTextEditor);
    }
    
    ctx.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) triggerUpdate(editor);
        })
    );
    
    ctx.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event => {
            const editor = vscode.window.activeTextEditor;
            if (editor && event.document === editor.document) {
                triggerUpdate(editor);
            }
        })
    );
}

function triggerUpdate(editor: vscode.TextEditor): void {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => updateDecorations(editor), 100);
}

function updateDecorations(editor: vscode.TextEditor): void {
    colorHighlight.updateColorDecorations(editor);
    betterComments.updateComments(editor);
}

export function deactivate(): void {
    if (timeout) clearTimeout(timeout);
    colorHighlight.disposeDecorations();
    betterComments.dispose();
}
