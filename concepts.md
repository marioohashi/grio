================================================================================
YVYRA — GRIO DESIGN SYSTEM
================================================================================
Codename : YVYRA (Araucaria Cosmica)
Projeto : Grio — Timeline & Memory Archive
Versao : 1.0
Origem : Curitiba, Parana, Brasil
Atualizacao : 2026
================================================================================

---

## INDICE

1.  VISAO GERAL
2.  NARRATIVA E FILOSOFIA
3.  SIMBOLOS FUNDADORES
4.  PALETA DE CORES
5.  TIPOGRAFIA
6.  ORNAMENTOS SAGRADOS (SVGs)
7.  PADROES DE COMPONENTES
8.  IMPLEMENTACAO TECNICA
9.  STACK E ARQUITETURA
10. PROMPTS DE GERACAO DE IMAGEM
11. REFERENCIAS CONCEITUAIS

================================================================================

1. # VISAO GERAL

YVYRA e a identidade visual e conceitual do Grio — um santuario digital de
preservacao de memoria. O sistema funde tres herancas simbolicas:

- Afro-ancestral : o grio como guardiao da memoria coletiva
- Sul-brasileira : a araucaria (Araucaria angustifolia), arvore que
  da nome a Curitiba ("muitos pinoes")
- Retro-futurista : o astrolabio e a instrumentacao de navegacao
  analogica cosmica

O resultado e uma estetica musgo + cobre, afrofuturista, com grafismos
sagrados xamânicos e tecnologia analogica.

## PRINCIPIOS DE DESIGN

Anti-algoritmo
Longevidade, profundidade humana, atemporalidade.

Sagrado, nao decorativo
Cada ornamento tem origem e significado.

Analogico, nao nostalgico
Instrumentos reais reinterpretados.

Enraizado, nao exotico
Referencias reais do sul do Brasil.

Calibrado, nao rigido
Geometria precisa com organicidade viva.

# ================================================================================ 2. NARRATIVA E FILOSOFIA

## 2.1 O GRIO COMO ARAUCARIA COSMICA

O Grio e uma araucaria cosmica. Suas raizes sao os ancestrais; o tronco e a
linha do tempo principal; os verticilos — galhos horizontais em aneis, padrao
unico da araucaria — sao as ramificacoes de cada vida. O pinhao, semente em
espiral Fibonacci, e o simbolo do arquivo: cada memoria e uma semente que
viaja entre geracoes. E o astrolabio e a ferramenta do narrador-grio: mede o
tempo, calibra a bussola emocional, aponta direcoes.

## 2.2 FILOSOFIA E ESSENCIA

O Grio nao e apenas uma plataforma de gestao de timelines; e um santuario
digital para preservacao de memoria. Inspirado na figura ancestral dos griots
(contadores de historia e guardioes da memoria coletiva), o aplicativo
funciona como um cofre seguro e intimo para capitulos de vida, historias
familiares e jornadas de exploracao.

## 2.3 TOM EMOCIONAL

- Acolhedor
- Reverente
- Poetico
- Seguro
- Tecnologicamente robusto

Sensacao tatil: cada detalhe deve transmitir a sensacao de tocar algo
duradouro e precioso.

## 2.4 METAFORA DA ARVORE DA VIDA

Baseada em Yggdrasil, no Baoba ("arvore da palavra" onde anciaos se
reuniam) e na Araucaria (cujos aneis em verticilo ecoam a geometria
concentrica do astrolabio).

Raizes : Ancestralidade, origens, memorias profundamente armazenadas.
Tronco : Timeline central (jornada principal de vida).
Verticilos : Ramificacoes, momentos em desdobramento, futuros em expansao.
Pinhao : Cada memoria como semente Fibonacci viajando entre geracoes.

## 2.5 LINHAS TEMPORAIS RAMIFICADAS (ESTETICA LOKI / ASTROLABIO)

O tempo nao e tratado como uma linha rigida, mas como um organismo vivo e
interconectado — medido, angulado e calibrado como um instrumento de
navegacao ancestral. As interfaces apresentam feixes de cobre quente,
sombras verde-musgo e elementos analogicos tateis.

# ================================================================================ 3. SIMBOLOS FUNDADORES

[ARVORE] Araucaria
Origem: Araucaria angustifolia / Curitiba
Papel : Estrutura, verticalidade, resistencia ao frio.

[ESPIRAL] Pinhao
Origem: Semente em espiral Fibonacci
Papel : Geometria sagrada, arquivo-semente, marco.

[ENGRE.] Astrolabio
Origem: Instrumento arabe-islamico de navegacao
Papel : Tempo mensuravel, calibracao, bussola emocional.

[FOGO] Fogo Ritual
Origem: Cosmologia Guarani / Kaingang
Papel : Lar da memoria, circulo de narracao.

# ================================================================================ 4. PALETA DE CORES

## 4.1 TABELA CANONICA

PAPEL NOME HEX USO

---

Fundo Musgo Noturno #0E1712 Background
Fundo Profundo Musgo Profundo #0A100C Pocos internos
Superficie Verde Lichen #14201A Cards
Superf. Elevada Superficie Alta #1A2A22 Hover / elevacao
Bordas Verde Musgo #3E5641 Contornos
Texto 2o Verde Samambaia #8FA88C Texto secundario
Acerto 1 Cobre do Astrolabio #C77B3C CTA / links
Acerto 2 Ambar do Pinhao #E0A84B Destaques
Sagrado Cinabrio Ritual #A63D2F Erros / alertas
Texto Osso de Anciao #E6E1D3 Texto principal

## 4.2 RACIONAL

Verde musgo frio contra cobre quente — instrumento contra floresta. A tensao
afrofuturista nasce ai: a floresta (musgo, frio, organico) encontra a
navegacao cosmica (cobre, quente, metalico). Sem o contraste, o design vira
ou "tech frio" ou "organico vago".

## 4.3 GRADIENTE METALICO

Para simular latao polido em headers, use:

background: linear-gradient(135deg,
rgba(224,168,75,0.20),
rgba(199,123,60,0.10));

Tailwind equivalente:

  <div class="bg-gradient-to-br from-amber-500/20 to-orange-800/10">

## 4.4 GRADE CELESTIAL

Fundo com pontos muito sutis, simulando uma carta estelar analogica:

background-image:
radial-gradient(rgba(143,168,140,0.08) 1px, transparent 1px);
background-size: 24px 24px;

# ================================================================================ 5. TIPOGRAFIA

## 5.1 REGRA ABSOLUTA

SEM SERIFAS. Todas as familias tipograficas sao geometricas, humanistas ou
mono-espacadas.

## 5.2 FAMILIAS ESCOLHIDAS

PAPEL FONTE PESO USO LICENCA

---

Display Bricolage Grotesque 500-700 Headlines / marca Google
Body Space Grotesk 400-500 Corpo / paragrafos Google
Mono IBM Plex Mono 400-600 Dados / codigo Google

## 5.3 APLICACAO VIA NEXT/FONT/GOOGLE

import {
Bricolage_Grotesque,
Space_Grotesk,
IBM_Plex_Mono
} from 'next/font/google'

export const displayFont = Bricolage_Grotesque({
subsets: ['latin'],
variable: '--font-display',
display: 'swap',
})

export const bodyFont = Space_Grotesk({
subsets: ['latin'],
variable: '--font-body',
display: 'swap',
})

export const monoFont = IBM_Plex_Mono({
subsets: ['latin'],
weight: ['400', '500', '600'],
variable: '--font-mono',
display: 'swap',
})

## 5.4 ALTERNATIVAS

Display alternativo : Clash Display (Fontshare), Monument Extended
Body alternativo : Satoshi (Fontshare), General Sans
Mono alternativo : JetBrains Mono, Space Mono

## 5.5 REGRAS DE COMPOSICAO

- Labels / categorias : sempre em Mono, uppercase, tracking-widest.
- Headlines : Display, sem tracking extra.
- Paragrafos : Body, leading-relaxed.
- Codigo inline : Mono com cor cobre (#C77B3C) ou ambar (#E0A84B).

# ================================================================================ 6. ORNAMENTOS SAGRADOS (SVGs)

Todos os ornamentos sao SVG inline, sem dependencia externa, e usam
currentColor para herdar do contexto.

## 6.1 CRUZ GUARANI (MBYA)

Significado : Cosmologia Guarani — memoria selada, icone sagrado.
Uso : Marcadores de secao, icones, marca d'agua.

function GuaraniCross({ className = '', size = 40 }) {
return (
<svg viewBox="0 0 40 40" width={size} height={size}
               className={className} fill="none"
               stroke="currentColor" strokeWidth="1.25">
<circle cx="20" cy="20" r="18" strokeOpacity="0.4" />
<circle cx="20" cy="20" r="13" strokeOpacity="0.8" />
<line x1="20" y1="4" x2="20" y2="36" strokeOpacity="0.9" />
<line x1="4"  y1="20" x2="36" y2="20" strokeOpacity="0.9" />
<circle cx="20" cy="20" r="2.5" fill="currentColor" stroke="none" />
<circle cx="20" cy="7"  r="1"   fill="currentColor" stroke="none" />
<circle cx="20" cy="33" r="1"   fill="currentColor" stroke="none" />
<circle cx="7"  cy="20" r="1"   fill="currentColor" stroke="none" />
<circle cx="33" cy="20" r="1"   fill="currentColor" stroke="none" />
</svg>
)
}

## 6.2 GRAFISMO KAINGANG

Significado : Padrao geometrico dos povos Je do Parana — linhas paralelas
mais pontos.
Uso : Divisores de secao, bordas laterais.

function KaingangDivider({ className = '' }) {
return (
<svg viewBox="0 0 240 16" className={className} fill="none"
               stroke="currentColor" strokeWidth="1"
               preserveAspectRatio="none">
<line x1="0" y1="4"  x2="240" y2="4"  strokeOpacity="0.7" />
<line x1="0" y1="12" x2="240" y2="12" strokeOpacity="0.7" />
{[20, 60, 100, 140, 180, 220].map((x, i) => (
<g key={i}>
<circle cx={x} cy="8" r="1.5"
                              fill="currentColor" stroke="none" />
<line x1={x} y1="4" x2={x} y2="12"
                            strokeOpacity="0.5" />
</g>
))}
</svg>
)
}

## 6.3 ESPIRAL DO PINHAO

Significado : Semente em espiral Fibonacci — arquivo, marco.
Uso : Marcador de marco de timeline, animacao de hover (rotaciona
15 graus).

function PinhaoSpiral({ className = '', size = 32 }) {
return (
<svg viewBox="0 0 40 40" width={size} height={size}
               className={className} fill="none"
               stroke="currentColor" strokeWidth="1">
<path d="M20 20 m0 -2 a2 2 0 0 1 2 2 a4 4 0 0 1 -4 4
                       a6 6 0 0 1 -6 -6 a8 8 0 0 1 8 -8
                       a10 10 0 0 1 10 10 a12 12 0 0 1 -12 12
                       a14 14 0 0 1 -14 -14 a16 16 0 0 1 16 -16" />
</svg>
)
}

## 6.4 ROSACEA DE ASTROLABIO

Significado : Instrumento de navegacao cosmica — tempo medido.
Uso : Headers ornamentados, botoes circulares, selo do projeto.

function AstrolabeRose({ className = '', size = 80 }) {
const ticks = Array.from({ length: 24 })
return (
<svg viewBox="0 0 80 80" width={size} height={size}
               className={className} fill="none"
               stroke="currentColor" strokeWidth="0.75">
<circle cx="40" cy="40" r="38" strokeOpacity="0.25" />
<circle cx="40" cy="40" r="30" strokeOpacity="0.5"  />
<circle cx="40" cy="40" r="22" strokeOpacity="0.8"  />
<circle cx="40" cy="40" r="12" strokeOpacity="0.5"  />
<circle cx="40" cy="40" r="3"
                      fill="currentColor" stroke="none" />
{ticks.map((\_, i) => {
const a = ((i _ 15) _ Math.PI) / 180
return <line key={i}
x1={40 + Math.cos(a) _ 30}
y1={40 + Math.sin(a) _ 30}
x2={40 + Math.cos(a) _ 38}
y2={40 + Math.sin(a) _ 38}
strokeOpacity="0.6" />
})}
<line x1="40" y1="8"  x2="40" y2="72" strokeOpacity="0.35" />
<line x1="8"  y1="40" x2="72" y2="40" strokeOpacity="0.35" />
</svg>
)
}

## 6.5 ANEL DE CRESCIMENTO

Significado : Dendrocronologia — camadas, anos, sub-timelines.
Uso : Sub-timeline, camadas temporais.

<svg viewBox="0 0 48 48" width={48} height={48} fill="none"
       stroke="currentColor" strokeWidth="1">
<circle cx="24" cy="24" r="20" strokeOpacity="0.4" />
<circle cx="24" cy="24" r="14" />
<circle cx="24" cy="24" r="8"  strokeOpacity="0.7" />
<circle cx="24" cy="24" r="3"  fill="currentColor" stroke="none" />
</svg>

## 6.6 VERTICILO

Significado : Estrutura da araucaria — galhos horizontais em aneis.
Uso : Estrutura da timeline principal.

<svg viewBox="0 0 48 48" width={48} height={48} fill="none"
       stroke="currentColor" strokeWidth="1">
<line x1="24" y1="4"  x2="24" y2="44" strokeOpacity="0.6" />
<line x1="12" y1="16" x2="36" y2="16" strokeOpacity="0.8" />
<line x1="8"  y1="26" x2="40" y2="26" strokeOpacity="0.8" />
<line x1="14" y1="36" x2="34" y2="36" strokeOpacity="0.8" />
<circle cx="24" cy="4"  r="2" fill="currentColor" stroke="none" />
<circle cx="24" cy="44" r="2" fill="currentColor" stroke="none" />
</svg>

# ================================================================================ 7. PADROES DE COMPONENTES

## 7.1 CARDS COM CANTONEIRAS (CORNER BRACKETS)

Todo card principal usa cantoneiras de cobre nos quatro cantos, imitando
instrumentos astronomicos.

function CornerBrackets({ color = '#C77B3C' }) {
const corners = [
'top-0 left-0',
'top-0 right-0 rotate-90',
'bottom-0 right-0 rotate-180',
'bottom-0 left-0 -rotate-90',
]
return (
<>
{corners.map((pos, i) => (
<svg key={i} viewBox="0 0 16 16"
width="14" height="14"
className={`absolute ${pos} pointer-events-none`}
fill="none" stroke={color} strokeWidth="1.25">
<path d="M0 6 L0 0 L6 0" />
<path d="M2.5 6 L2.5 2.5 L6 2.5" strokeOpacity="0.5" />
</svg>
))}
</>
)
}

## 7.2 TIMELINE VERTICAL (VERTICILO)

- Tronco central em gradiente musgo -> cobre.
- Nos horizontais (verticilos) a cada marco.
- Pinhao em espiral marcando cada no.
- Linha dupla Kaingang correndo ao lado do eixo.
- Cruz Guarani flutuando como marcador de secao.
- Animacao: linhas "crescem" de baixo para cima (400ms ease-out).

## 7.3 BOTOES CTA

- Borda dupla cobre + ambar.
- Hover: preenchimento gradiente metalico.
- Cantos levemente arredondados (rounded-xl).
- Mono uppercase tracking wide.

## 7.4 BADGES E LABELS

- Fundo : bg-[#C77B3C]/8
- Borda : border-[#C77B3C]/30
- Texto : Cobre em Mono uppercase

# ================================================================================ 8. IMPLEMENTACAO TECNICA

## 8.1 OBJETO DE PALETA (TYPESCRIPT)

export const YVYRA = {
bg: '#0E1712', // Musgo Noturno
bgDeep: '#0A100C', // Musgo Profundo
surface: '#14201A', // Verde Lichen
surfaceHi: '#1A2A22', // Superficie elevada
lichen: '#3E5641', // Verde Musgo (bordas)
fern: '#8FA88C', // Verde Samambaia (texto 2o)
bone: '#E6E1D3', // Osso de Anciao (texto)
copper: '#C77B3C', // Cobre do Astrolabio
amber: '#E0A84B', // Ambar do Pinhao
cinnabar: '#A63D2F', // Cinabrio Ritual
} as const

## 8.2 TOKENS TAILWIND (EXTENSAO SUGERIDA)

// tailwind.config.ts
export default {
theme: {
extend: {
colors: {
moss: {
DEFAULT: '#0E1712',
deep: '#0A100C',
surface: '#14201A',
elevated: '#1A2A22',
border: '#3E5641',
},
fern: '#8FA88C',
bone: '#E6E1D3',
copper: '#C77B3C',
pinhao: '#E0A84B',
cinnabar:'#A63D2F',
},
fontFamily: {
display: ['var(--font-display)'],
body: ['var(--font-body)'],
mono: ['var(--font-mono)'],
},
backgroundImage: {
'celestial-grid':
'radial-gradient(rgba(143,168,140,0.08) 1px, transparent 1px)',
'brass-sheen':
'linear-gradient(135deg, rgba(224,168,75,0.20), rgba(199,123,60,0.10))',
},
backgroundSize: {
'celestial': '24px 24px',
},
},
},
}

## 8.3 MOTION E MICRO-INTERACOES

ELEMENTO ANIMACAO DURACAO EASING

---

Timeline tronco Cresce baixo -> cima 400ms ease-out
Pinhao no hover Rotaciona 15 graus 300ms ease-out
Radar sweep no header Rotacao 360 continua 8s linear
Cards hover Rotate 3D leve 200ms ease-out
Reveal de conteudo Fade + translateY(8px) 300ms ease-out
Numeros "calibrando" Flicker de opacidade 150ms steps(2)

## 8.4 ACESSIBILIDADE

- Contraste: #E6E1D3 sobre #0E1712 = 14.8:1 (AAA).
- Cobre sobre musgo: #C77B3C sobre #0E1712 = 6.2:1
  (AA, usar para texto >= 16px).
- Focus ring: sempre visivel, cor ambar #E0A84B com outline-offset 2px.
- Reduced motion: respeitar prefers-reduced-motion — desativar radar
  sweep e rotacao.

# ================================================================================ 9. STACK E ARQUITETURA

## 9.1 FRONTEND E UI

- Next.js App Router
- Tailwind CSS (Design System)
- Client / Server Components
- next/font/google para tipografia

## 9.2 BACKEND E DATABASE

- PostgreSQL (Relational DB)
- Prisma ORM (Type-safe queries)
- Zod (Schema Validation)
- Next.js Server Actions

## 9.3 MEDIA E CLOUD

- Cloudinary (Media CDN)
- Unsigned Upload (Client-Side)
- Local Canvas compression
- Strict edge-clamping logic

## 9.4 WORKFLOW TECNICO DE UPLOAD DE IMAGEM

1.  Usuario seleciona arquivo de imagem. Browser le via FileReader.

2.  Painel interativo aplica zoom e arraste com limites matematicos
    estritos de clamp para evitar bordas pretas.

3.  O <canvas> renderiza uma versao quadrada em alta definicao,
    convertida para Blob.

4.  O arquivo otimizado e enviado direto do cliente para Cloudinary
    usando variaveis de ambiente
    (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME).

5.  A URL segura gerada (secure_url) e enviada via Server Action para
    ser persistida no PostgreSQL com Prisma.

# ================================================================================ 10. PROMPTS DE GERACAO DE IMAGEM

## 10.1 MOODBOARD / ATMOSFERA

Afro-indigenous cosmic navigation sanctuary moodboard, interior of a
giant Araucaria angustifolia (Parana pine) tree at dusk, distinctive
horizontal whorled branches forming concentric rings, illuminated by
brass oil lanterns and copper astrolabe instruments, pine cones
(pinhao) arranged as Fibonacci spirals, Kaingang and Guarani geometric
body-paint patterns on textiles, aged copper plates engraved with
celestial maps, moss green and forest darkness against warm amber and
copper light, analog oscilloscope with green phosphor glow in
background, sacred fire circle, deep moss green (#0E1712) dominant
with copper (#C77B3C) and amber (#E0A84B) accents, cinematic
volumetric light, --ar 16:9 --style raw --v 6.1

Negative: serif fonts, western colonial aesthetic, egyptian cliches,
baobab, fantasy vikings, cartoon

## 10.2 UI MOCKUP DESKTOP

Website UI design mockup for a memory archive app named
"YVYRA — Grio Araucaria", Afro-indigenous analog cosmic aesthetic,
deep moss green background (#0E1712), geometric sans-serif headlines
in cream (#E6E1D3), mono-spaced body text in soft sage (#8FA88C),
vertical timeline rendered as an Araucaria trunk with horizontal
whorled branch nodes, milestone markers shaped as Fibonacci pine-cone
spirals, copper (#C77B3C) and amber (#E0A84B) metallic gradient
accents, cards with brass astronomical instrument corner brackets,
Kaingang parallel-line dividers, Guarani cross-in-circle section
marks, subtle dotted celestial grid background at 5% opacity,
concentric astrolabe rings as decorative ornament, --ar 16:10 --v 6.1

## 10.3 DETALHE DE COMPONENTE

Close-up UI card component for the "YVYRA" app, inspired by an analog
astronomical instrument crossed with Araucaria bark texture, aged
copper double-border frame with riveted corner brackets, deep moss
green matte surface, heading in geometric sans-serif cream text,
small Fibonacci spiral of a pinhao seed engraved as watermark, thin
Kaingang parallel-line divider, a single amber indicator light
glowing like a calibration signal, subtle oscilloscope grid etched
into the surface, warm rim light from top-left, shallow depth of
field, --ar 4:3 --v 6.1

## 10.4 DETALHE DE TIMELINE (MOBILE 9:16)

Vertical timeline UI detail from the "YVYRA" app, central trunk
rendered as a gradient from moss green to copper, horizontal whorled
branch nodes like an Araucaria silhouette, each milestone marked by a
small Fibonacci spiral of a pinhao seed in amber glow, thin
double-line Kaingang geometric pattern running along the axis between
nodes, faint Guarani cross-in-circle symbols floating as section
markers, warm amber and copper backlighting against deep moss
darkness, cinematic analog atmosphere, macro detail, --ar 9:16 --v 6.1

# ================================================================================ 11. REFERENCIAS CONCEITUAIS

- Griot / Grio .............. Guardiao da memoria coletiva na tradicao
  oeste-africana.
- Araucaria angustifolia .... Arvore simbolo do Parana; "Curitiba" =
  "muitos pinoes" em Tupi.
- Astrolabio ................ Instrumento astronomico arabe-islamico
  medieval.
- Povos Kaingang e Guarani .. Herancas indigenas do sul do Brasil.
- Yggdrasil ................. Arvore do Mundo na mitologia nordica.
- Baoba ..................... "Arvore da palavra" africana.
- TVA / Loki ................ Estetica retro-futurista de burocracia
  cosmica.

================================================================================
FIM DO DOCUMENTO
================================================================================
