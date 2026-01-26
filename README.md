# 🌈 Doraemay

Uma extensão VS Code colorida e divertida que combina os melhores recursos visuais para melhorar sua experiência de codificação!

![Doraemay Icon](https://private-us-east-1.manuscdn.com/sessionFile/JIhkSlJdfVtTlKz13pvuRU/sandbox/rQnztEBhotWE4Kq3Vx2iLK-images_1768569350547_na1fn_L2hvbWUvdWJ1bnR1L2RvcmFlbWF5LWV4dGVuc2lvbi9pY29u.png?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvSkloa1NsSmRmVnRUbEt6MTNwdnVSVS9zYW5kYm94L3JRbnp0RUJob3RXRTRLcTNWeDJpTEstaW1hZ2VzXzE3Njg1NjkzNTA1NDdfbmExZm5fTDJodmJXVXZkV0oxYm5SMUwyUnZjbUZsYldGNUxXVjRkR1Z1YzJsdmJpOXBZMjl1LnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=NZ~SKY6TZ18dFzirCGDnHGfASx7u5pm3J3~AcqLTEJzynajQG0Cq7GKO3MGFFDV5gM~dqnD8bbYnQsJ-hjMAqT4kyqQqdTgnDq8MKJYlNGFtczhYNYgyGwuKMhiUc-RIZ42fsp9dtsplTRdDZY0DmybQ9oAVtUJz8nC6CWlF7Ya6S5hP3F3xiwT24QE8~1aCEEqON4WTjcn7xY4lpQsOA4PIhlNIBARjyn2GHiE1Lc3HlRwKhmLdNTKsHXnvOcJ9cn~4FlWpkOFuaVTQ9GDGS77~uFVl4rvmhC3U8YA8K-cBIrbPXLLEiw42IGIYnNbyyDrAZkVtoDkCL1mEeHg1wg__)

## ✨ Features

### 🎨 Color Highlight
Visualize cores diretamente no código! Mostra um preview visual de cores em formatos:
- Hexadecimal: `#FF3B3B`, `#3B82F6`
- RGB/RGBA: `rgb(255, 59, 59)`, `rgba(59, 130, 246, 0.5)`
- HSL/HSLA: `hsl(0, 100%, 50%)`, `hsla(217, 91%, 60%, 0.5)`

### 💬 Better Comments
Destaque comentários especiais com cores vibrantes:
- `// ! Alerta` - Vermelho vibrante
- `// ? Pergunta` - Azul vibrante
- `// TODO` - Laranja vibrante
- `// FIXME` - Rosa vibrante
- `// NOTE` - Roxo vibrante
- `// HACK` - Amarelo vibrante
- `// * Destaque` - Verde vibrante
- `// // Riscado` - Cinza com linha

### 🌈 Indent Rainbow
Visualize níveis de indentação com 7 cores do arco-íris pastel:
1. 🔴 Vermelho pastel
2. 🟠 Laranja pastel
3. 🟡 Amarelo pastel
4. 🟢 Verde pastel
5. 🔵 Azul pastel
6. 🟣 Anil pastel
7. 🩷 Violeta pastel

Detecta automaticamente:
- ✅ Indentação incorreta (não múltipla do tab size)
- ✅ Mistura de tabs e espaços

## 🚀 Comandos

Acesse via paleta de comandos (`Ctrl+Shift+P` ou `Cmd+Shift+P`):

- `Doraemay: Toggle Color Highlight` - Liga/desliga o Color Highlight
- `Doraemay: Toggle Better Comments` - Liga/desliga o Better Comments
- `Doraemay: Toggle Indent Rainbow` - Liga/desliga o Indent Rainbow
- `Doraemay: Show Info` - Mostra informações da extensão

## ⚙️ Configurações

Configure a extensão em `settings.json`:

```json
{
  "doraemay.colorHighlight.enable": true,
  "doraemay.betterComments.enable": true,
  "doraemay.indentRainbow.enable": true
}
```

## 📦 Instalação

1. Abra o VS Code
2. Vá em Extensions (`Ctrl+Shift+X`)
3. Procure por "Doraemay"
4. Clique em Install

Ou instale via arquivo `.vsix`:
```bash
code --install-extension doraemay-1.0.0.vsix
```

## 🎯 Como Usar

Após instalar, a extensão é ativada automaticamente! Todos os recursos funcionam em tempo real enquanto você digita.

### Exemplo de Código

```typescript
// ! IMPORTANTE: Não esquecer de testar
function exemplo() {
  // TODO: Implementar lógica
  const cor = '#FF3B3B'; // Color Highlight mostra a cor
  
  if (true) {
    for (let i = 0; i < 5; i++) {
      // NOTE: Indent Rainbow mostra as cores aqui
      console.log(i);
      if (i === 2) {
        // ? Por que 2?
        console.log('achei');
      }
    }
  }
}
```

## 🛠️ Desenvolvimento

### Requisitos
- Node.js 14+
- VS Code 1.60+

### Build Local
```bash
# Instalar dependências
npm install

# Compilar
npm run compile

# Testar
npm run watch
# Aperte F5 para abrir Extension Development Host
```

### Empacotar
```bash
# Instalar vsce
npm install -g @vscode/vsce

# Criar .vsix
vsce package
```

## 📄 Licença

MIT License

---

<p align="center">
  Desenvolvido com 💛 por <strong>@mayasrl</strong>.
</p>
