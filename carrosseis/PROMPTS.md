# Carrosséis AgriCode: o que foi extraído dos modelos e os prompts

Este documento traz:
1. a **análise** dos 3 modelos de referência (o que faz eles funcionarem);
2. **como** cada um foi adaptado para a AgriCode;
3. o **prompt mestre** para pedir novos carrosséis ao Claude;
4. **prompts por modelo** (é só preencher os campos);
5. **prompts de imagem**, se quiser trocar as fotos por imagens geradas por IA;
6. as **legendas** prontas dos 3 posts;
7. a **receita de realismo** (fotos reais, luz, sombra, sobreposição e "pixelzinhos");
8. os **créditos das fotos**.

> Foi aproveitada a estrutura visual dos modelos, não a identidade de outra agência. Cores, logo, textos, mascote e assinatura são da AgriCode.

---

## 1. Análise dos modelos de referência

### Moldura comum a todos
| Elemento | Função |
|---|---|
| Card com cantos arredondados dentro do quadro | dá cara de "tela/app" e moldura premium |
| Topo com `@perfil \| Marca` centralizado | assinatura discreta em todo slide |
| Contador `02 / 07` em pílula | mostra progresso e incentiva arrastar |
| Réguas finas nas laterais | detalhe "ferramenta de design" que passa sofisticação |
| Granulado + retícula sutil + partículas | tira o aspecto "digital chapado" |
| Elementos desfocados no 1º plano, vazando do card | profundidade (efeito de lente) |

### Capa (o gancho)
- **Kicker** em caixa alta, bem espaçado, com a 2ª metade em cor de destaque.
- **Palavra gigante** em fonte condensada pesada, branca, com brilho e leve desfoque.
- **Objeto/personagem na frente** cobrindo parte da palavra (texto atrás do objeto).
- Detalhe de apoio: letra cursiva gigante, QR code, selo ou palavra manuscrita.
- Pílula **"arrasta pro lado →"** no canto inferior.

### Slides internos
- **Título em 3 níveis**: linha leve (fina) → linha forte (negrito branco) → linha de destaque (negrito colorido e maior). Às vezes na ordem forte → destaque → leve.
- **Visual central** de um destes tipos:
  - *camadas explodidas* em perspectiva com rótulos numerados (①…⑤) e linhas-guia;
  - *mockup inclinado* (tablet/celular) mostrando o resultado;
  - *leque de 3 cards* mostrando variações.
- **Legenda** curta no rodapé com 1 palavra em destaque.

### Variante "espécime" (o post das fontes)
- Fundos alternados (escuro colorido ↔ claro).
- Kicker em fonte mono: `FONTE 1 DE 5`.
- Frase com trecho em **itálico serifado colorido**.
- **Palavra gigante** como espécime, com um objeto sobre ela.
- Legenda no formato `Nome · descrição`.
- **Nota manuscrita** em baixa opacidade ("essa é coringa kkk").
- Rodapé minúsculo com a assinatura/CTA.

### Engajamento
- CTA na legenda do post: *Comenta "PALAVRA" que eu te mando…* (gera comentário, que aumenta o alcance).

---

## 2. Como ficou na AgriCode

| Referência | AgriCode |
|---|---|
| Réguas de design nas laterais | **números de linha de código** (o "code" de AgriCode) |
| Card genérico | **janela de navegador** com os 3 pontinhos |
| — | **barra de rolagem** à direita que mostra em que slide você está |
| Flores/abelhas desfocadas | **folhas da logo** desfocadas |
| Fotos de animais geradas por IA | **fotos reais do agro** (nelore, soja ao pôr do sol, cadeado, mesa de madeira) recortadas e integradas com luz, junto com **mockups de sites e sistemas** |
| Laranja/âmbar | verde-lima da logo + âmbar do pôr do sol do banner |

**Os 3 modelos:**

| Pasta | Modelo | Tema | Slides |
|---|---|---|---|
| `01-sites-em-camadas` | **Pôr do sol** (escuro com brilho âmbar, camadas, mockups, leque) | Criação de sites | 6 |
| `02-sistemas-caderno` | **Noite** (grafite com brilho verde, cursiva + condensada) | Sistemas de gestão | 6 |
| `03-glossario-do-site` | **Céu e palha** (capa no horizonte, termos estilo espécime) | Glossário: 5 termos de site | 8 |

**Paleta**

| Nome | Hex | Uso |
|---|---|---|
| Verde-noite | `#06140D` / `#0A2316` | fundos escuros |
| Lima (logo) | `#8FDC55` | destaque principal |
| Âmbar (pôr do sol) | `#F4A93C` | destaque do modelo 1, números |
| Palha | `#F3EDDF` | fundos claros |
| Petróleo | `#123E3D` → `#0A2324` | fundos escuros do modelo 3 |
| Tinta | `#0F2419` | texto em fundo claro |

**Fontes** (gratuitas, Google Fonts): Poppins (títulos e texto), Anton e Bebas Neue (palavras gigantes), Instrument Serif itálico (destaques elegantes), Great Vibes (cursiva), JetBrains Mono (kickers e código), Caveat (notas manuscritas).

---

## 3. Prompt mestre (para o Claude)

Cole no Claude junto com os arquivos `base/agricode.css`, `base/agricode.js` e um `carrossel.html` de exemplo:

```text
Você é designer de carrosséis para o Instagram da AgriCode (@agricodeagencia),
agência de criação de sites e sistemas para o agronegócio.

Crie um carrossel em HTML usando o sistema visual anexado (agricode.css + agricode.js).
Regras:
- Cada slide é uma <section class="slide TEMA"> com uma <div class="janela"> dentro.
  Tamanho 1080×1350 (4:5). O agricode.js coloca sozinho: topo com @ e contador,
  números de linha, barra de rolagem, partículas e folhas (<i class="folha">).
- Capa: kicker espaçado em 2 cores + palavra gigante condensada (Anton/Bebas) com brilho
  + um objeto na frente cobrindo parte da palavra + pílula "arrasta pro lado →".
- Slides internos: título em 3 níveis (.t-leve, .t-forte, .t-destaque),
  um visual central (camadas explodidas com rótulos numerados, mockup inclinado
  de celular/tablet, leque de 3 cards, lista com números, antes x depois)
  e uma .legenda curta com 1 palavra em <b>.
- Visuais feitos em HTML/CSS/SVG (mockups de sites, painéis de sistema, ícones).
  Sem fotos, a não ser que eu envie.
- Último slide: banner da logo (assets/logo/agricode-banner.jpg) + CTA "Comenta PALAVRA".
- Cores: verde-noite, lima #8FDC55, âmbar #F4A93C, palha #F3EDDF.
- Linguagem: português do Brasil, direto, próximo do produtor ("bora", "tá"),
  sem prometer resultados com números que não podemos comprovar.
- Máximo de ~25 palavras por slide. Um conceito por slide.

Tema do carrossel: [TEMA]
Modelo: [Pôr do sol | Noite | Céu e palha]
Quantidade de slides: [6 a 9]
Palavra do CTA: [PALAVRA]
```

---

## 4. Prompts por modelo (preencha os colchetes)

### Modelo 1 · Pôr do sol (camadas)
```text
Use o modelo "Pôr do sol" (classe .sol) da pasta 01-sites-em-camadas como base.
Tema: [ex.: "como funciona uma loja virtual para revenda agro"]
Capa: kicker "[FRASE CURTA]" com "[FINAL EM ÂMBAR]", palavra gigante "[1 PALAVRA]",
      objeto na frente: [celular mostrando ... / tablet com ...],
      frase em itálico serifado: "[GANCHO EM 2 LINHAS]".
Slide 2 (camadas): título "[LEVE] / [FORTE] / [DESTAQUE]",
      5 camadas de baixo pra cima: [1], [2], [3], [4], [5].
Slide 3 (mockup + selos): título [...]; 3 selos: [benefício + detalhe] ×3.
Slide 4 (leque): 3 exemplos: [tipo de negócio 1], [2], [3].
Slide 5 (checklist): 5 itens [título · explicação curta].
Slide 6 (CTA): "[PERGUNTA]" + Comenta [PALAVRA].
```

### Modelo 2 · Noite (cursiva + condensada)
```text
Use o modelo "Noite" (classe .noite) da pasta 02-sistemas-caderno como base.
Tema: [ex.: "controle de rebanho no celular"]
Capa: frase "[sua ___ ainda ___ no]" com 1 palavra em itálico serifado verde,
      palavra gigante: letra inicial em cursiva (Great Vibes) + resto em Anton: "[PALAVRA?]",
      objeto na frente: [caderno / planilha impressa / quadro branco ...] com anotações
      manuscritas realistas do dia a dia do produtor.
Slide 2 (caos): cards bagunçados: [chat, arquivo, post-it, nota...] + legenda.
Slide 3 (antes x depois): 4 itens de cada lado.
Slide 4 (painel): tablet com dashboard [módulos e números de exemplo] + celular com notificação.
Slide 5 (módulos): 6 blocos com ícone, nome e 1 linha.
Slide 6 (CTA): Comenta [PALAVRA].
```

### Modelo 3 · Céu e palha (espécime / glossário / lista)
```text
Use o modelo "Céu e palha" da pasta 03-glossario-do-site como base.
Tema: [ex.: "5 integrações que todo site do agro deveria ter"]
Capa (.ceu): kicker "[N] [coisas] pra você [verbo em itálico] o seu", palavra gigante "[PALAVRA]"
      afundando no horizonte da lavoura, cursiva "[2 palavras]".
Slide 2 (.petroleo): vocativo em itálico ("Produtor,"), frase de impacto,
      comparação [ruim apagado] x [bom em destaque].
Slides 3 a 7: alterne .palha (claro) e .petroleo (escuro). Em cada um:
      kicker "TERMO X DE N", frase com 1 trecho em itálico serifado,
      palavra gigante "[TERMO]", objeto sobre a palavra [qual],
      legenda "[Termo] · explicação", nota manuscrita curta.
Último slide (.palha): "Salva esse post" + banner.
```

---

## 5. Prompts de imagem (opcional)

Os modelos de referência usam fotos realistas geradas por IA (lhama, abelha, tartaruga).
Se quiser esse efeito, gere a imagem em uma ferramenta de IA de imagem, **remova o fundo** (PNG transparente),
salve em `assets/fotos/` e coloque no slide **depois** da palavra gigante:

```html
<img class="obj" src="../assets/fotos/boi.png" style="left:240px;top:430px;width:620px">
```

Prompts sugeridos (retrato 4:5, fundo liso para recortar):

```text
Fotografia hiper-realista de um boi nelore olhando para a câmera, usando óculos escuros
estilosos e chapéu de palha, iluminação dourada de pôr do sol vindo de trás (contraluz),
fundo liso verde-escuro desfocado, profundidade de campo rasa, textura detalhada dos pelos,
estilo editorial de revista, 4:5.
```
```text
Abelha pousada em uma flor de café, macro fotografia hiper-realista, gotas de orvalho,
luz quente lateral, fundo preto liso, nitidez extrema nas asas, 4:5.
```
```text
Galo imponente de crista vermelha em pose heroica, segurando um smartphone com a asa,
luz de estúdio dramática com recorte âmbar, fundo escuro liso, hiper-realista, 4:5.
```
```text
Mão de produtor rural segurando um punhado de grãos de soja que se transformam em pixels
verdes brilhantes, fundo escuro liso, luz dourada, hiper-realista, conceito tecnologia no campo, 4:5.
```
```text
Trator verde moderno visto de frente, faróis acesos, poeira dourada no ar ao pôr do sol,
recortado sobre fundo liso escuro, fotografia publicitária hiper-realista, 4:5.
```

---

## 6. Legendas dos posts

**Post 1 · Sites em camadas**
```text
Antes de comprar, o produtor pesquisa no Google. A pergunta é: ele encontra você ou o seu concorrente? 🌱

Um site profissional é feito em camadas (hospedagem, código, design, conteúdo e SEO) e precisa funcionar direitinho no celular, onde o seu cliente está.

Comenta "SITE" que a gente te chama no direct.

#agronegocio #agro #criacaodesites #marketingagro #tecnologianoagro #agricode

📷 Fotos (editadas): United Soybean Board, agriculturasp, Jeff Weese e Natalka Ukraine, via Wikimedia Commons (CC BY 2.0/4.0).
```

**Post 2 · Sistemas**
```text
Sua gestão ainda roda no caderno? 📒

Pedido no WhatsApp, estoque na planilha, financeiro no papel… e a informação se perde no meio do caminho.
Um sistema sob medida junta tudo num painel só, da sede ao campo.

Comenta "SISTEMA" que a gente te mostra como funciona.

#agronegocio #gestaorural #sistemas #agrotech #tecnologianoagro #agricode

📷 Fotos (editadas): Trougnouf, United Soybean Board, agriculturasp e Jeff Weese, via Wikimedia Commons (CC BY 2.0/4.0).
```

**Post 3 · Glossário do site**
```text
Domínio, hospedagem, SEO, SSL, responsivo… parece outra língua, né? 😅

Separamos os 5 termos que todo dono de negócio do agro precisa entender antes de contratar um site.

Salva pra consultar depois e manda pra quem precisa ver.

#agronegocio #agro #site #marketingdigital #tecnologianoagro #agricode

📷 Fotos (editadas): United Soybean Board, agriculturasp, Jeff Weese, R. Henrik Nilsson e Natalka Ukraine, via Wikimedia Commons (CC BY 2.0/4.0).
```

---

## 7. Receita de realismo (o que faz parecer foto de verdade)

Cada slide é montado em camadas, de trás para frente:

| # | Camada | Como foi feito | Arquivo/classe |
|---|---|---|---|
| 1 | **Foto de fundo** | foto real com tratamento de cor (brilho, contraste, sépia), às vezes desfocada para dar profundidade | `.foto-fundo` / `.foto-fundo.textura` |
| 2 | **Véus** | gradiente escuro no topo (para o título), vinheta nas bordas, brilho de pôr do sol ou tinta de cor (petróleo) | `.veu.topo-escuro`, `.veu.vinheta`, `.veu.brilho-sol`, `.veu.tinta-petroleo` |
| 3 | **Contraluz** | mancha de luz quente atrás do objeto principal | `.contraluz`, `.luz-obj` |
| 4 | **Palavra gigante** | fonte condensada com brilho e leve desfoque | `.gigante`, `.palavra` |
| 5 | **Objeto recortado na frente** | foto sem fundo (rembg) + luz de borda + sombra de contato | `ferramentas/recortar_fundo.py`, `ferramentas/luz_de_borda.py`, `.recorte` |
| 6 | **Primeiro plano** | pedaço de foto desfocado na frente de tudo (soja, folhas) | `.frente-soja`, `.folha` |
| 7 | **UI flutuante** | barra de busca/cards com sombra longa e borda clara | `.busca-flutua`, `.chip` |
| 8 | **Pixelzinhos** | retícula de pontos (meio-tom) + linhas finas + granulado por cima de tudo | `.janela::before` e `.janela::after` |

**Passo a passo para trocar a foto principal:**
1. Ache a foto (Wikimedia Commons, Unsplash, Pexels ou gerada por IA). Prefira fundo simples e luz parecida com a do slide.
2. Tire o fundo: `python ferramentas/recortar_fundo.py isnet-general-use foto.jpg recorte.png`
3. Aplique a luz de borda do lado de onde vem a luz da cena: `python ferramentas/luz_de_borda.py recorte.png assets/fotos/novo.png direita 0.9`
4. Troque o `src` da imagem no slide e ajuste `left/top/width`. Deixe parte do objeto **na frente da palavra gigante** e parte **atrás de um primeiro plano** (é isso que dá a sensação de profundidade).

**Prompt de realismo (para pedir ao Claude ou a um designer):**
```text
Monte o slide em camadas: foto real de fundo com cor tratada e levemente desfocada;
véu escuro no topo para o título; luz quente atrás do objeto principal;
palavra gigante condensada; objeto real recortado NA FRENTE da palavra, com luz de borda
vinda da mesma direção do sol do fundo e sombra de contato no chão;
um elemento desfocado em primeiro plano cobrindo a base do objeto;
por cima de tudo, retícula de pontinhos (meio-tom) e granulado sutil.
As cores do objeto precisam combinar com a luz do fundo (pôr do sol = mais quente e escuro).
```

---

## 8. Créditos das fotos

As fotos são do **Wikimedia Commons**, com licenças que permitem uso comercial (CC0, domínio público ou CC BY).
Licenças **CC BY** pedem crédito: as legendas da seção 6 já trazem a linha de créditos, e a lista completa está em [`assets/fotos/CREDITOS.md`](assets/fotos/CREDITOS.md).
As fotos foram recortadas, recoloridas e combinadas (isso conta como modificação, e o crédito informa isso).

