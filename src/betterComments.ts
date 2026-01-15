import * as vscode from 'vscode';

const patterns = [
    { regex: /\/\/\s*!\s*(.+)/g, color: '#FF3B3B' },
    { regex: /\/\/\s*\?\s*(.+)/g, color: '#3B82F6' },
    { regex: /\/\/\s*TODO\s*(.+)/g, color: '#FF9500' },
    { regex: /\/\/\s*FIXME\s*(.+)/g, color: '#FF2D92' },
    { regex: /\/\/\s*NOTE\s*(.+)/g, color: '#A855F7' },
    { regex: /\/\/\s*HACK\s*(.+)/g, color: '#FACC15' },
    { regex: /\/\/\s*\*\s*(.+)/g, color: '#22C55E' }
];

let decorations: vscode.TextEditorDecorationType[] = [];

function initDecorations(): void {
    for (const p of patterns) {
        const dec = vscode.window.createTextEditorDecorationType({
            color: p.color,
            fontWeight: 'bold'
        });
        decorations.push(dec);
    }
}

export function updateComments(editor: vscode.TextEditor): void {
    const text = editor.document.getText();
    
    for (let i = 0; i < patterns.length; i++) {
        const decs: vscode.DecorationOptions[] = [];
        let match;
        
        while ((match = patterns[i].regex.exec(text)) !== null) {
            const start = editor.document.positionAt(match.index);
            const end = editor.document.positionAt(match.index + match[0].length);
            decs.push({ range: new vscode.Range(start, end) });
        }
        
        editor.setDecorations(decorations[i], decs);
    }
}

export function dispose(): void {
    for (const dec of decorations) {
        dec.dispose();
    }
    decorations = [];
}

export function init(): void {
    initDecorations();
}
