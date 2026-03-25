# Design System Reference — Diagnóstico 360°

> Referência do visual original do data-weaver + diretrizes para polish

## Paleta de Cores (CSS Variables)

### Light Mode
- Background: `220 20% 97%` (azul-cinza claro)
- Card: `0 0% 100%` (branco puro)
- Primary: `217 91% 50%` (azul vibrante)
- Muted: `220 14% 95%`
- Border: `220 13% 90%`

### Dark Mode
- Background: `222 30% 8%` (azul-cinza muito escuro)
- Card: `222 25% 12%`
- Primary: `217 91% 60%` (azul mais claro)
- Border: `220 20% 18%`

### Maturity Colors
- Grade 1: `0 84% 60%` (vermelho)
- Grade 2: `25 95% 53%` (laranja)
- Grade 3: `48 96% 53%` (amarelo)
- Grade 4: `217 91% 60%` (azul)
- Grade 5: `142 71% 45%` (verde)

## Tipografia
- **Font**: Plus Jakarta Sans (300-800)
- Hero: `text-4xl md:text-5xl font-extrabold tracking-tight`
- Section: `text-2xl font-bold`
- Card title: `text-2xl font-semibold leading-none tracking-tight`
- Body: `text-sm` a `text-lg`
- Labels: `text-xs font-medium`

## Efeitos que fazem a diferença
1. **Backdrop blur**: `bg-card/80 backdrop-blur-sm` nos headers sticky
2. **Borders semi-transparentes**: `border-border/50`, `border-border/40`
3. **Shadows sutis**: `shadow-sm` (nunca bold)
4. **Transições**: `transition-colors` em tudo interativo
5. **Badge maturity**: `bg-[hsl(var(--maturity-X)/0.15)]` com borda `0.3` opacity
6. **Botões de grau**: `flex-1`, `border-2` quando ativo, label com número grande + texto pequeno
7. **Focus ring**: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`

## Layout Patterns
- Container: `max-w-6xl mx-auto px-6`
- Border radius: `0.75rem` (--radius)
- Card padding: `p-6`
- Gaps: `gap-2`, `gap-3`, `gap-4`
- Progress bar: `h-2` slim no header, `h-4` normal

## Componentes-chave do original
- Grade buttons: distribuição igual (`flex-1`), número grande em cima, texto descritivo embaixo
- Cards com `border-border/60 shadow-sm`
- Feature cards: `p-4 rounded-xl bg-card border-border/40`
- Hero badge: `px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold`
