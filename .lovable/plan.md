## Substituir logo "inventada" pelas logos oficiais O2

### Problema
Em 4 páginas internas (Index, Questionnaire, Results, PresentationMode), o cabeçalho ainda usa um placeholder que eu inventei: um círculo verde com gradiente `from-[#7EBF8E] to-[#4CAF50]` com o texto "O2" em preto. Isso não é a marca oficial — deve ser a logo PNG real (`src/assets/o2-logo-white.png` para wordmark ou `src/assets/o2-icon.png` para o símbolo).

### Mudanças

Substituir, em cada um dos 4 cabeçalhos, o `<div>` circular + `<span>O2</span>` pela **logo wordmark branca** (`o2-logo-white.png`), que é a representação oficial em interfaces dark.

1. **`src/pages/Index.tsx`** (linhas 60-62)
   - Trocar o circle+span por `<img src={logoWhite} alt="O2 Inc" className="h-7 w-auto" />`
   - Importar `logoWhite from "@/assets/o2-logo-white.png"`

2. **`src/pages/Questionnaire.tsx`** (linhas 230-232)
   - Mesma substituição (`h-6 w-auto` para caber no header mais compacto)
   - Importar `logoWhite`

3. **`src/pages/Results.tsx`** (linhas 344-346)
   - Mesma substituição (`h-7 w-auto`)
   - Importar `logoWhite`

4. **`src/pages/PresentationMode.tsx`** (linhas 375-377)
   - Mesma substituição (`h-6 w-auto`)
   - Importar `logoWhite`

### Verificação adicional
Rodar `rg "font-black text-\[10px\]\">O2"` e `rg "from-\[#7EBF8E\] to-\[#4CAF50\]"` após para garantir que nenhuma instância da logo placeholder ficou no código.

### Fora de escopo
- Não vou tocar no avatar circular numerado das perguntas/sub-áreas (linhas 196, 570, 654 etc.) — esses são **badges de número**, não logo da marca.
- Não vou refatorar tipografia/cores hardcoded das páginas internas neste passo (pode ser próximo passo se quiser unificar com tokens O2).