# Baixa miniaturas do Wikimedia Commons devagar (respeita o limite de pedidos).
# uso: python baixar_commons.py lista.txt   (cada linha: largura|Nome do arquivo.jpg, larguras: 960, 1280, 1920, 3840)
import hashlib, sys, time, os, urllib.parse, urllib.request
UA = "AgriCodeCarousel/1.0 (one-off image download for marketing slides)"
for linha in open(sys.argv[1]):
    linha = linha.strip()
    if not linha: continue
    larg, nome = linha.split("|", 1)
    n = nome.replace(" ", "_"); h = hashlib.md5(n.encode()).hexdigest(); q = urllib.parse.quote(n)
    os.makedirs("fotos_baixadas", exist_ok=True)
    dest = f"fotos_baixadas/{larg}_{n[:60]}"
    if os.path.exists(dest): print("ja existe", n, flush=True); continue
    url = f"https://upload.wikimedia.org/wikipedia/commons/thumb/{h[0]}/{h[:2]}/{q}/{larg}px-{q}"
    espera = 30
    for t in range(6):
        try:
            d = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=90).read()
            open(dest, "wb").write(d); print("OK", n, len(d), flush=True); break
        except urllib.error.HTTPError as e:
            if e.code == 429: print("429 espera", espera, n[:40], flush=True); time.sleep(espera); espera *= 2; continue
            print("ERRO", e.code, n, flush=True); break
    time.sleep(8)
print("FIM_FILA", flush=True)
