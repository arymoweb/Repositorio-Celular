// Exporta cada .slide dos carrosséis como PNG 1080 × 1350.
// Uso:  node carrosseis/render.cjs            (todos)
//       node carrosseis/render.cjs 02         (só as pastas que começam com "02")
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const RAIZ = __dirname;
const filtro = process.argv[2] || '';

(async () => {
  const pastas = fs.readdirSync(RAIZ)
    .filter((d) => /^\d\d-/.test(d) && d.startsWith(filtro))
    .filter((d) => fs.existsSync(path.join(RAIZ, d, 'carrossel.html')));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1500 }, deviceScaleFactor: 1 });

  for (const pasta of pastas) {
    const html = path.join(RAIZ, pasta, 'carrossel.html');
    const saida = path.join(RAIZ, pasta, 'png');
    fs.rmSync(saida, { recursive: true, force: true });
    fs.mkdirSync(saida, { recursive: true });

    await page.goto('file://' + html);
    await page.waitForFunction(() => document.documentElement.dataset.pronto === '1');
    await page.evaluate(() => document.fonts.ready);

    const slides = await page.$$('.slide');
    const arquivos = [];
    for (let i = 0; i < slides.length; i++) {
      const nome = path.join(saida, `${String(i + 1).padStart(2, '0')}.png`);
      await slides[i].screenshot({ path: nome });
      arquivos.push(nome);
    }

    // folha de contato (prévia de todos os slides lado a lado)
    const imgs = arquivos.map((f) => `<img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}">`).join('');
    const prev = await browser.newPage({ viewport: { width: 1640, height: 800 }, deviceScaleFactor: 1 });
    await prev.setContent(`<style>body{margin:0;background:#141414;padding:24px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
      img{width:100%;border-radius:10px;display:block}</style>${imgs}`);
    await prev.screenshot({ path: path.join(saida, 'previa.jpg'), fullPage: true, type: 'jpeg', quality: 82 });
    await prev.close();

    console.log(`${pasta}: ${slides.length} slides → ${path.relative(process.cwd(), saida)}`);
  }
  await browser.close();
})();
