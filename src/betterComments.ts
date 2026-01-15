import * as vscode from 'vscode';

interface Tag {
    tag: string;
    color: string;
    bg: string;
    style?: string;
    decoration?: string;
}

const tags: Tag[] = [
    { tag: '!', color: '#FF3B3B', bg: '#FF3B3B22', style: 'bold' },
    { tag: '?', color: '#3B82F6', bg: '#3B82F622', style: 'italic' },
    { tag: 'TODO', color: '#FF9500', bg: '#FF950022', style: 'bold' },
    { tag: 'FIXME', color: '#FF2D92', bg: '#FF2D9222', style: 'bold' },
    { tag: 'NOTE', color: '#A855F7', bg: '#A855F722', style: 'italic' },
    { tag: 'HACK', color: '#FACC15', bg: '#FACC1522', style: 'bold' },
    { tag: '*', color: '#22C55E', bg: '#22C55E22', style: 'bold' },
    { tag: '//', color: '#6B7280', bg: 'transparent', decoration: 'line-through' }
];

const decTypes: Map<string, vscode.TextEditorDecorationType> = new Map();

function init(): void {
    for (const t of tags) {
        const dec = vscode.window.createTextEditorDecorationType({
            color: t.color,
            backgroundColor: t.bg,
            fontStyle: t.style === 'italic' ? 'italic' : 'normal',
            fontWeight: t.style === 'bold' ? 'bold' : 'normal',
            textDecoration: t.decoration || 'none',
            borderRadius: '3px'
        });
        decTypes.set(t.tag, dec);
    }
}

function getPatterns(lang: string): RegExp[] {
    const p: RegExp[] = [];
    
    const cStyle = ['javascript', 'typescript', 'javascriptreact', 'typescriptreact',
        'c', 'cpp', 'csharp', 'java', 'go', 'rust', 'swift', 'kotlin', 'php', 'scala', 'dart', 'vue', 'svelte'];
    const hashStyle = ['python', 'ruby', 'perl', 'shellscript', 'bash', 'zsh', 'yaml', 'dockerfile', 'makefile', 'r', 'julia'];
    const dashStyle = ['sql', 'lua', 'haskell'];
    const semiStyle = ['asm', 'lisp', 'clojure', 'scheme'];
    const htmlStyle = ['html', 'xml', 'svg', 'markdown'];
    
    if (cStyle.includes(lang)) {
        p.push(/\/\/.*$/gm);
        p.push(/\/\*[\s\S]*?\*\//gm);
    }
    if (hashStyle.includes(lang)) p.push(/#.*$/gm);
    if (dashStyle.includes(lang)) p.push(/--.*$/gm);
    if (semiStyle.includes(lang)) p.push(/;.*$/gm);
    if (htmlStyle.includes(lang)) p.push(/<!--[\s\S]*?-->/gm);
    
    if (lang === 'css' || lang === 'scss' || lang === 'less') {
        p.push(/\/\*[\s\S]*?\*\//gm);
        if (lang === 'scss') p.push(/\/\/.*$/gm);
    }
    
    return p;
}

function findTag(comment: string): Tag | null {
    const clean = comment
        .replace(/^\/\/\s*/, '').replace(/^\/\*\s*/, '').replace(/\s*\*\/$/, '')
        .replace(/^#\s*/, '').replace(/^--\s*/, '').replace(/^;\s*/, '')
        .replace(/^<!--\s*/, '').replace(/\s*-->$/, '').trim();
    
    for (const t of tags) {
        if (t.tag === '//') {
            if (clean.startsWith('//')) return t;
        } else if (t.tag === '!' || t.tag === '?' || t.tag === '*') {
            if (clean.startsWith(t.tag)) return t;
        } else {
            if (new RegExp(`^${t.tag}\\b`, 'i').test(clean)) return t;
        }
    }
    return null;
}

export function updateBetterCommentsDecorations(editor: vscode.TextEditor): void {
    const cfg = vscode.workspace.getConfiguration('doraemay.betterComments');
    if (!cfg.get('enable', true)) {
        clearDecorations(editor);
        return;
    }
    
    if (decTypes.size === 0) init();
    
    const text = editor.document.getText();
    const lang = editor.document.languageId;
    const patterns = getPatterns(lang);
    
    const decsMap: Map<string, vscode.DecorationOptions[]> = new Map();
    for (const t of tags) decsMap.set(t.tag, []);
    
    for (const pattern of patterns) {
        let m;
        const re = new RegExp(pattern.source, pattern.flags);
        while ((m = re.exec(text)) !== null) {
            const t = findTag(m[0]);
            if (t) {
                const start = editor.document.positionAt(m.index);
                const end = editor.document.positionAt(m.index + m[0].length);
                decsMap.get(t.tag)!.push({ range: new vscode.Range(start, end) });
            }
        }
    }
    
    for (const [tag, decs] of decsMap) {
        const dec = decTypes.get(tag);
        if (dec) editor.setDecorations(dec, decs);
    }
}

export function clearDecorations(editor: vscode.TextEditor): void {
    for (const dec of decTypes.values()) editor.setDecorations(dec, []);
}

export function disposeDecorations(): void {
    for (const dec of decTypes.values()) dec.dispose();
    decTypes.clear();
}
