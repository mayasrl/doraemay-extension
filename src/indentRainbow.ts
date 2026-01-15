import * as vscode from 'vscode';

let decorationTypes: vscode.TextEditorDecorationType[] = [];
let doIt = false;
let clearMe = false;
let currentLanguageId: string | null = null;
let skipAllErrors = false;

const colors = [
  "rgba(255, 150, 150, 0.10)",
  "rgba(255, 200, 150, 0.10)",
  "rgba(255, 255, 150, 0.10)",
  "rgba(200, 255, 150, 0.10)",
  "rgba(150, 200, 255, 0.10)",
  "rgba(200, 150, 255, 0.10)",
  "rgba(255, 150, 200, 0.10)"
];

const errorColor = "rgba(255, 100, 100, 0.3)";
const tabmixColor = "rgba(255, 150, 100, 0.3)";

let errorDecorationType: vscode.TextEditorDecorationType;
let tabmixDecorationType: vscode.TextEditorDecorationType;

export function setupIndentRainbow(context: vscode.ExtensionContext) {
  errorDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: errorColor
  });

  tabmixDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: tabmixColor
  });

  colors.forEach((color) => {
    const decorType = vscode.window.createTextEditorDecorationType({
      backgroundColor: color
    });
    decorationTypes.push(decorType);
  });

  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    updateIndentDecorations(activeEditor);
  }

  vscode.window.onDidChangeActiveTextEditor(editor => {
    if (editor) {
      updateIndentDecorations(editor);
    }
  }, null, context.subscriptions);

  vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;
    if (editor && event.document === editor.document) {
      updateIndentDecorations(editor);
    }
  }, null, context.subscriptions);
}

export function updateIndentDecorations(editor: vscode.TextEditor) {
  const text = editor.document.getText();
  const tabSizeRaw = editor.options.tabSize || 4;
  let tabSize = 4;

  if (typeof tabSizeRaw === 'number') {
    tabSize = tabSizeRaw;
  }

  const tabs = " ".repeat(tabSize);
  const regEx = /^[\t ]+/gm;
  const decorators: vscode.DecorationOptions[][] = [];

  colors.forEach(() => {
    decorators.push([]);
  });

  let errorDecorator: vscode.DecorationOptions[] = [];
  let tabmixDecorator: vscode.DecorationOptions[] = [];

  let match;
  while ((match = regEx.exec(text)) !== null) {
    const pos = editor.document.positionAt(match.index);
    const line = editor.document.lineAt(pos).lineNumber;

    const thematch = match[0];
    const re = new RegExp("\t", "g");
    const ma = (match[0].replace(re, tabs)).length;

    if (ma % tabSize !== 0) {
      const startPos = editor.document.positionAt(match.index);
      const endPos = editor.document.positionAt(match.index + match[0].length);
      const decoration = { range: new vscode.Range(startPos, endPos) };
      errorDecorator.push(decoration);
    } else {
      const m = match[0];
      const l = m.length;
      let o = 0;
      let n = 0;

      while (n < l) {
        const startPos = editor.document.positionAt(match.index + n);

        if (m[n] === "\t") {
          n++;
        } else {
          n += tabSize;
        }

        const endPos = editor.document.positionAt(match.index + n);
        const decoration = { range: new vscode.Range(startPos, endPos) };

        const tc = (thematch.split("\t").length - 1);
        const sc = (thematch.split(" ").length - 1);

        if (sc > 0 && tc > 0) {
          tabmixDecorator.push(decoration);
        } else {
          const decoratorIndex = o % decorators.length;
          decorators[decoratorIndex].push(decoration);
        }

        o++;
      }
    }
  }

  decorationTypes.forEach((decorationType, index) => {
    editor.setDecorations(decorationType, decorators[index]);
  });

  editor.setDecorations(errorDecorationType, errorDecorator);
  editor.setDecorations(tabmixDecorationType, tabmixDecorator);
}

export function disposeDecorations(): void {
  decorationTypes.forEach(dec => dec.dispose());
  errorDecorationType.dispose();
  tabmixDecorationType.dispose();
  decorationTypes = [];
}
