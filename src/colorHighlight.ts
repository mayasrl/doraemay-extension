import * as vscode from 'vscode';

const colorPatterns = [
    /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g,
    /rgba?\s*\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*[\d.]+\s*)?\)/gi,
    /hsla?\s*\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(?:,\s*[\d.]+\s*)?\)/gi
];

let decTypes: Map<string, vscode.TextEditorDecorationType> = new Map();

function toHex(color: string): string | null {
    color = color.toLowerCase().trim();
    
    if (color.startsWith('#')) {
        if (color.length === 4) return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
        if (color.length === 5) return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}${color[4]}${color[4]}`;
        return color;
    }
    
    const rgbMatch = color.match(/rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
    if (rgbMatch) {
        const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
        const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
        const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    }
    
    const hslMatch = color.match(/hsla?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%/i);
    if (hslMatch) {
        const h = parseInt(hslMatch[1]) / 360;
        const s = parseInt(hslMatch[2]) / 100;
        const l = parseInt(hslMatch[3]) / 100;
        
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        const hex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
        return `#${hex(r)}${hex(g)}${hex(b)}`;
    }
    
    return null;
}

function getLuminance(hex: string): number {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function getDecType(color: string): vscode.TextEditorDecorationType {
    const hex = toHex(color);
    if (!hex) return vscode.window.createTextEditorDecorationType({});
    
    if (decTypes.has(hex)) return decTypes.get(hex)!;
    
    const lum = getLuminance(hex);
    const txtColor = lum > 0.5 ? '#1e1e2e' : '#fff';
    
    const dec = vscode.window.createTextEditorDecorationType({
        backgroundColor: hex,
        color: txtColor,
        borderRadius: '4px',
        border: `1px solid ${hex}`
    });
    
    decTypes.set(hex, dec);
    return dec;
}

export function updateColorDecorations(editor: vscode.TextEditor): void {
    const text = editor.document.getText();
    const decsMap: Map<vscode.TextEditorDecorationType, vscode.DecorationOptions[]> = new Map();
    
    for (const pattern of colorPatterns) {
        let m;
        const re = new RegExp(pattern.source, pattern.flags);
        while ((m = re.exec(text)) !== null) {
            const start = editor.document.positionAt(m.index);
            const end = editor.document.positionAt(m.index + m[0].length);
            const range = new vscode.Range(start, end);
            const dec = getDecType(m[0]);
            if (!decsMap.has(dec)) decsMap.set(dec, []);
            decsMap.get(dec)!.push({ range });
        }
    }
    
    for (const [dec, decs] of decsMap) {
        editor.setDecorations(dec, decs);
    }
}

export function clearDecorations(editor: vscode.TextEditor): void {
    for (const dec of decTypes.values()) editor.setDecorations(dec, []);
}

export function disposeDecorations(): void {
    for (const dec of decTypes.values()) dec.dispose();
    decTypes.clear();
}
