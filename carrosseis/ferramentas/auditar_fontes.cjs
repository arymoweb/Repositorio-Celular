// Auditoria de fontes: lista textos que o navegador desenhou com fonte "reserva"
// (glifo que não existe na fonte escolhida, ex.: setas, ✓, ★) e textos que vazam da caixa.
// uso: node carrosseis/ferramentas/auditar_fontes.cjs
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const RAIZ = path.join(__dirname, '..');
const PERMITIDAS = ['Poppins', 'Anton', 'Bebas Neue', 'Instrument Serif', 'JetBrains Mono', 'Caveat', 'Great Vibes'];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1500 } });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  let problemas = 0;
  for (const pasta of fs.readdirSync(RAIZ).filter((d) => /^\d\d-/.test(d))) {
    await page.goto('file://' + path.join(RAIZ, pasta, 'carrossel.html'));
    await page.waitForFunction(() => document.documentElement.dataset.pronto === '1');
    await page.evaluate(() => document.fonts.ready);
    // marca todo elemento que tem texto próprio
    const n = await page.evaluate(() => {
      let i = 0;
      document.querySelectorAll('.slide *').forEach((el) => {
        const proprio = [...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim());
        if (proprio) el.setAttribute('data-aud', i++);
      });
      return i;
    });
    const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
    for (let i = 0; i < n; i++) {
      const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: `[data-aud="${i}"]` });
      if (!nodeId) continue;
      const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
      const ruins = fonts.filter((f) => !PERMITIDAS.some((p) => f.familyName.includes(p)));
      if (ruins.length) {
        const info = await page.evaluate((k) => {
          const el = document.querySelector(`[data-aud="${k}"]`);
          const s = [...document.querySelectorAll('.slide')].indexOf(el.closest('.slide')) + 1;
          return { s, txt: el.textContent.trim().slice(0, 60) };
        }, i);
        problemas++;
        console.log(`${pasta} slide ${info.s}: "${info.txt}" → ${ruins.map((f) => `${f.familyName} (${f.glyphCount} glifos)`).join(', ')}`);
      }
    }
  }
  console.log(problemas ? `\n${problemas} trechos com fonte reserva` : 'Nenhuma fonte reserva encontrada.');
  await browser.close();
})();
