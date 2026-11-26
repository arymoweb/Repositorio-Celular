/* =========================================================
   AgriCode · monta a moldura de cada slide automaticamente:
   topo (@ + contador), números de linha, barra de rolagem,
   partículas e folhas desfocadas.
   ========================================================= */
(function () {
  const HANDLE = '@agricodeagencia';
  const MARCA = 'AgriCode';

  // gerador pseudo-aleatório com semente: o mesmo slide sempre sai igual
  function rng(seed) {
    let s = seed >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }

  const FOLHA = (id) => `
    <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g${id}" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="#3f8f2a"/><stop offset=".55" stop-color="#8FDC55"/><stop offset="1" stop-color="#C8F59A"/>
      </linearGradient></defs>
      <path d="M6 104 C 34 34, 112 2, 194 10 C 168 74, 92 120, 6 104 Z" fill="url(#g${id})"/>
      <path d="M14 100 C 70 78, 120 48, 176 18" stroke="#1f4d17" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"/>
    </svg>`;

  const slides = [...document.querySelectorAll('.slide')];
  slides.forEach((slide, i) => {
    const total = slides.length;
    const janela = slide.querySelector('.janela');
    if (!janela) return;
    const r = rng(1000 + i * 77);

    if (!slide.hasAttribute('data-sem-topo')) {
      const topo = document.createElement('div');
      topo.className = 'topo';
      topo.innerHTML = `<span class="pontos"><i></i><i></i><i></i></span>
        <span>${HANDLE} | <b>${MARCA}</b></span>
        <span class="contador">${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</span>`;
      janela.appendChild(topo);
    }

    const gutter = document.createElement('div');
    gutter.className = 'gutter';
    gutter.textContent = Array.from({ length: 30 }, (_, n) => String(n + 1).padStart(2, '0')).join('\n');
    janela.appendChild(gutter);

    const scroll = document.createElement('div');
    scroll.className = 'scroll';
    scroll.innerHTML = `<i style="top:${(i / total) * 100}%;height:${100 / total}%"></i>`;
    janela.appendChild(scroll);

    const qtd = +(slide.dataset.particulas ?? 34);
    if (qtd) {
      const p = document.createElement('div');
      p.className = 'particulas';
      for (let k = 0; k < qtd; k++) {
        const d = 2 + r() * 5;
        const dot = document.createElement('i');
        dot.style.cssText = `left:${r() * 100}%;top:${10 + r() * 85}%;width:${d}px;height:${d}px;opacity:${.15 + r() * .55};` +
          (r() > .7 ? `filter:blur(${1 + r() * 2}px);` : '');
        p.appendChild(dot);
      }
      janela.appendChild(p);
    }

    // <i class="folha" style="left/top/width" data-rot="20" data-blur="10"></i>
    slide.querySelectorAll('i.folha').forEach((f, k) => {
      f.innerHTML = FOLHA(`${i}-${k}`);
      f.style.transform = `rotate(${f.dataset.rot || 0}deg)`;
      f.style.filter = `blur(${f.dataset.blur ?? 10}px)`;
    });
  });

  // fileiras da lavoura em perspectiva (SVG, sem transform 3D)
  document.querySelectorAll('.lavoura, .campo').forEach((el) => {
    const W = 1000, H = 600, vx = 500, vy = -650, passo = 64;
    let pol = '';
    for (let x = -2600, k = 0; x < 3600; x += passo, k++) {
      if (k % 2) continue;
      pol += `<polygon points="${vx},${vy} ${x},${H} ${x + passo * .62},${H}"/>`;
    }
    el.insertAdjacentHTML('afterbegin',
      `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><g fill="var(--fileira, rgba(16,40,10,.55))">${pol}</g></svg>`);
  });

  document.documentElement.dataset.pronto = '1';
})();
