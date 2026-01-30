# Doraemay - VSCode Theme

Um tema escuro elegante e minimalista para o VSCode com uma paleta de cores cuidadosamente selecionada, inspirada em tons pastéis e cores vibrantes que tornam a codificação mais agradável e produtiva.

## ✨ Características Principais

### 🎨 Paleta de Cores Otimizada

Todas as cores foram extraídas e otimizadas para máxima legibilidade e redução de fadiga visual:

- **Keywords** (roxo `#C078D8`): Palavras-chave da linguagem destacadas com elegância
- **Funções/Métodos** (azul `#60A8E8`): Nomes de funções claramente identificáveis
- **Strings** (verde `#94C078`): Texto entre aspas com cor verde vibrante
- **Números/Constantes** (laranja `#C89360`): Valores constantes em destaque
- **Variáveis/Parâmetros** (vermelho `#D7676F`): Nomes de variáveis bem definidos
- **Tipos/Classes** (amarelo `#E0BC78`): Tipos e classes em destaque
- **Comentários** (cinza `#888C90`): Comentários sutis e legíveis
- **Pontuação** (cinza claro `#A7ACB4`): Símbolos e parênteses neutros

### 🖥️ Terminal Integrado Personalizado

Cores ANSI totalmente personalizadas para o terminal integrado do VSCode, oferecendo uma experiência consistente entre o editor e o terminal.

### 📊 Suporte a CSV com Rainbow Coloring

Cada coluna do CSV é colorida com uma cor diferente, facilitando a leitura e navegação de dados tabulares:

```
id,nome,email,usuario,grupo,ativo,data_criacao,salario
1,João Silva,joao@exemplo.com,joao_silva,ADMIN,true,2024-01-15,5000.00
```

- Coluna 1 → Roxo
- Coluna 2 → Azul
- Coluna 3 → Verde
- Coluna 4 → Vermelho
- Coluna 5 → Laranja
- Coluna 6 → Amarelo
- Coluna 7 → Ciano
- Coluna 8 → Cinza
- Coluna 9+ → Repete as cores

### 🛠️ Funcionalidades Adicionais

- ✅ Color Highlight - Destaca cores hexadecimais no código
- ✅ Better Comments - Comentários com destaque especial
- ✅ Indent Rainbow - Indentação com cores arco-íris
- ✅ CSV Rainbow - Colunas com cores diferentes

### 📚 Suporte Completo para Linguagens

- ✅ Python
- ✅ JavaScript / TypeScript
- ✅ C# / .NET
- ✅ SQL
- ✅ HTML / CSS
- ✅ JSON / YAML
- ✅ Bash / Shell
- ✅ Markdown
- ✅ CSV
- ✅ E muito mais!

## 🚀 Como Usar

### Instalação via Marketplace

1. Abra o VSCode
2. Vá para Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Procure por "Doraemay"
4. Clique em Install

### Instalação via Arquivo VSIX

1. Baixe o arquivo `doraemay-theme-1.x.x.vsix` da página de [Releases](https://github.com/mayasrl/doraemay-extension/releases)
2. No VSCode, abra a paleta de comandos (Ctrl+Shift+P)
3. Digite: `Extensions: Install from VSIX`
4. Selecione o arquivo baixado

### Ativação do Tema

1. Abra a paleta de comandos (Ctrl+Shift+P)
2. Digite: `Preferences: Color Theme`
3. Selecione **Doraemay**

## ⚙️ Configurações

### Desabilitar Funcionalidades

Você pode desabilitar qualquer funcionalidade através das configurações do VSCode:

```json
{
  "doraemay.colorHighlight.enable": false,
  "doraemay.betterComments.enable": false,
  "doraemay.indentRainbow.enable": false,
  "doraemay.csvHighlight.enable": false
}
```

## 🎯 Comandos Disponíveis

- `Doraemay: Toggle Color Highlight` - Ativa/desativa destaque de cores
- `Doraemay: Toggle Better Comments` - Ativa/desativa comentários destacados
- `Doraemay: Toggle Indent Rainbow` - Ativa/desativa indentação colorida
- `Doraemay: Toggle CSV Highlight` - Ativa/desativa colorização de CSV

## 📝 Changelog

### v1.1.0
- ✨ Adicionado suporte a CSV com rainbow coloring por coluna
- 🎨 Atualizado mapeamento de cores para todas as linguagens
- 🔧 Melhorado suporte para C#, Python, JavaScript e TypeScript
- 📊 Integração de funcionalidades de destaque de CSV

### v1.0.0
- 🎉 Lançamento inicial
- 🎨 Paleta de cores completa e otimizada
- 🖥️ Terminal integrado personalizado
- 🔧 Suporte para múltiplas linguagens
- ✨ Color Highlight, Better Comments, Indent Rainbow

## 🤝 Contribuindo

Se você encontrou um bug ou tem uma sugestão, abra uma [issue](https://github.com/mayasrl/doraemay-extension/issues) no repositório!

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuindo

Este é um projeto de código aberto.

---

Desenvolvido com 💛 por **@mayasrl**

