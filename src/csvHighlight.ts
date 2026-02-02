import * as vscode from 'vscode';

const COLUMN_COLORS = [
  '#C078D8', // Roxo - Coluna 1
  '#60A8E8', // Azul - Coluna 2
  '#94C078', // Verde - Coluna 3
  '#D7676F', // Vermelho - Coluna 4
  '#C89360', // Laranja - Coluna 5
  '#E0BC78', // Amarelo - Coluna 6
  '#50A8B8', // Ciano - Coluna 7
  '#A7ACB4', // Cinza - Coluna 8
];

let csvDecorationTypes: vscode.TextEditorDecorationType[] = [];

export function setupCSVHighlight(context: vscode.ExtensionContext): void {
  // Criar tipos de decoração para cada coluna
  for (let i = 0; i < COLUMN_COLORS.length; i++) {
    csvDecorationTypes[i] = vscode.window.createTextEditorDecorationType({
      color: COLUMN_COLORS[i],
      fontStyle: 'normal',
    });
  }
}

export function updateCSVDecorations(editor: vscode.TextEditor): void {
  const fileName = editor.document.fileName;
  
  // Verificar se é um arquivo com extensão suportada
  const supportedExtensions = ['.csv', '.tsv', '.psv', '.ssv', '.txt'];
  const isSupportedFile = supportedExtensions.some(ext => fileName.endsWith(ext));
  
  if (!isSupportedFile) {
    // Limpar decorações se não for arquivo suportado
    for (let i = 0; i < csvDecorationTypes.length; i++) {
      editor.setDecorations(csvDecorationTypes[i], []);
    }
    return;
  }

  // Verificar se CSV highlight está habilitado
  const cfg = vscode.workspace.getConfiguration('doraemay.csvHighlight');
  if (!cfg.get('enable', true)) {
    for (let i = 0; i < csvDecorationTypes.length; i++) {
      editor.setDecorations(csvDecorationTypes[i], []);
    }
    return;
  }

  const text = editor.document.getText();
  const lines = text.split('\n');

  // Detectar o separador da primeira linha
  const separator = detectSeparator(lines[0] || '');

  // Inicializar array de decorações para cada coluna
  const decorations: vscode.Range[][] = [];
  for (let i = 0; i < COLUMN_COLORS.length; i++) {
    decorations[i] = [];
  }

  // Processar cada linha
  lines.forEach((line, lineIndex) => {
    if (!line.trim()) return;

    const fields = parseDelimitedLine(line, separator);
    
    fields.forEach((field, columnIndex) => {
      const colorIndex = columnIndex % COLUMN_COLORS.length;
      
      // Encontrar a posição do campo na linha
      const fieldStart = findFieldPosition(line, columnIndex, fields, separator);
      const fieldEnd = fieldStart + field.length;

      if (fieldStart >= 0 && fieldEnd > fieldStart) {
        const range = new vscode.Range(
          lineIndex,
          fieldStart,
          lineIndex,
          fieldEnd
        );
        decorations[colorIndex].push(range);
      }
    });
  });

  // Aplicar decorações
  for (let i = 0; i < csvDecorationTypes.length; i++) {
    editor.setDecorations(csvDecorationTypes[i], decorations[i]);
  }
}

function detectSeparator(line: string): string {
  // Contar ocorrências de cada separador
  const separators = [',', ';', ':', '|', '\t'];
  let maxCount = 0;
  let detectedSeparator = ','; // Padrão

  for (const sep of separators) {
    let count = 0;
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === sep && !inQuotes) {
        count++;
      }
    }

    if (count > maxCount) {
      maxCount = count;
      detectedSeparator = sep;
    }
  }

  return detectedSeparator;
}

function parseDelimitedLine(line: string, separator: string): string[] {
  const fields: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        currentField += '"';
        i++;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        currentField += char;
      }
    } else if (char === separator && !inQuotes) {
      // Field separator
      fields.push(currentField);
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Adicionar último campo
  if (currentField || line.endsWith(separator)) {
    fields.push(currentField);
  }

  return fields;
}

function findFieldPosition(line: string, fieldIndex: number, fields: string[], separator: string): number {
  let currentField = 0;
  let currentPos = 0;
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === separator && !inQuotes) {
      currentField++;
      currentPos = i + 1;
      
      if (currentField === fieldIndex) {
        return currentPos;
      }
    }
  }

  // Se chegou aqui, é o último campo
  if (currentField === fieldIndex) {
    return currentPos;
  }

  return -1;
}

export function disposeDecorations(): void {
  for (let i = 0; i < csvDecorationTypes.length; i++) {
    csvDecorationTypes[i].dispose();
  }
  csvDecorationTypes = [];
}