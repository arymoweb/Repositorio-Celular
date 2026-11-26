# Carrosséis AgriCode

Carrosséis para o Instagram **@agricodeagencia**, feitos em HTML/CSS e exportados em PNG 1080 × 1350 (formato 4:5 do Instagram).

## Onde estão as imagens prontas

| Carrossel | Tema | Imagens |
|---|---|---|
| 01 · Pôr do sol | Criação de sites | [`01-sites-em-camadas/png/`](01-sites-em-camadas/png) |
| 02 · Noite | Sistemas de gestão | [`02-sistemas-caderno/png/`](02-sistemas-caderno/png) |
| 03 · Céu e palha | Glossário: 5 termos de site | [`03-glossario-do-site/png/`](03-glossario-do-site/png) |

Cada pasta tem `01.png`, `02.png`… na ordem do carrossel e uma `previa.jpg` com todos os slides lado a lado.
As legendas prontas dos posts estão no fim do [PROMPTS.md](PROMPTS.md).

## Estrutura

```
carrosseis/
├── base/
│   ├── agricode.css     ← cores, fontes, moldura, títulos, mockups
│   └── agricode.js      ← monta topo, contador, números de linha, partículas, folhas e lavoura
├── assets/
│   ├── logo/            ← logo recortada (PNG transparente) + banner original
│   ├── fotos/           ← fotos reais (Wikimedia Commons) e recortes; créditos em fotos/CREDITOS.md
│   └── fonts/           ← fontes gratuitas (OFL) usadas nos slides
├── 01-sites-em-camadas/carrossel.html
├── 02-sistemas-caderno/carrossel.html
├── 03-glossario-do-site/carrossel.html
├── ferramentas/         ← buscar/baixar fotos, recortar fundo, luz de borda e auditoria de fontes
├── render.cjs           ← exporta os PNGs
└── PROMPTS.md           ← análise dos modelos, prompt mestre, prompts de imagem e legendas
```

## Como editar

1. Abra o `carrossel.html` da pasta e troque os textos direto no HTML (cada slide é uma `<section class="slide">`).
2. Para ver no navegador, abra o arquivo direto (duplo clique).
3. Para gerar os PNGs de novo (precisa de Node.js e do Playwright):

```bash
npm install playwright && npx playwright install chromium   # só na primeira vez
node carrosseis/render.cjs        # todos os carrosséis
node carrosseis/render.cjs 02     # só o carrossel 02
```

Antes de exportar, rode `node carrosseis/ferramentas/auditar_fontes.cjs`: ele avisa se algum caractere (seta, ✓, ★…) caiu numa fonte reserva e saiu com cara de erro.

Para criar um carrossel novo, copie uma das pastas, renomeie (ex.: `04-loja-virtual`) e use o prompt mestre do [PROMPTS.md](PROMPTS.md).

## Fotos

As fotos são reais, do Wikimedia Commons, com licença que permite uso comercial. As licenças CC BY pedem crédito ao autor, e as legendas do [PROMPTS.md](PROMPTS.md) já trazem a linha de créditos. A lista completa está em [`assets/fotos/CREDITOS.md`](assets/fotos/CREDITOS.md).

## Licenças das fontes

Poppins, Anton, Bebas Neue, Instrument Serif, JetBrains Mono, Caveat e Great Vibes são distribuídas sob a SIL Open Font License 1.1 (uso comercial liberado).
