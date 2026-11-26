# Busca imagens no Wikimedia Commons (API pública), respeitando rate limit.
# uso: python buscar_commons.py "soybean field" "padlock"   (mostra tamanho e licença; [SA] = exige compartilhar igual)
import json, sys, time, urllib.parse, urllib.request, re
UA = "AgriCodeCarousel/1.0 (one-off image search for marketing slides)"
def get(url):
    for tent in range(6):
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code == 429:
                espera = int(e.headers.get("retry-after", "30")) + 3
                print(f"   (429, aguardando {espera}s)", flush=True)
                time.sleep(espera); continue
            raise
    raise SystemExit("rate limit persistente")
def busca(q, n=12):
    url = ("https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6"
           f"&gsrsearch={urllib.parse.quote(q)}&gsrlimit={n}&prop=imageinfo"
           "&iiprop=url|size|extmetadata&iiextmetadatafilter=LicenseShortName|Artist&iiurlwidth=1600&format=json")
    d = json.loads(get(url))
    out = []
    for p in d.get("query", {}).get("pages", {}).values():
        ii = p["imageinfo"][0]; m = ii.get("extmetadata", {})
        lic = m.get("LicenseShortName", {}).get("value", "")
        art = re.sub("<[^>]+>", "", m.get("Artist", {}).get("value", ""))[:40]
        out.append(dict(title=p["title"], w=ii["width"], h=ii["height"], lic=lic, artist=art, thumb=ii.get("thumburl"), page=ii.get("descriptionurl")))
    return out
if __name__ == "__main__":
    todos = {}
    for q in sys.argv[1:]:
        res = busca(q)
        todos[q] = res
        print("==", q, flush=True)
        for r in res:
            sa = " [SA]" if "SA" in r["lic"] else ""
            print(f"   {r['w']}x{r['h']:<5} {r['lic']:<14}{sa} {r['title'][5:80]}", flush=True)
        time.sleep(4)
    json.dump(todos, open("busca_resultados.json", "a"), ensure_ascii=False)
    open("busca_resultados.json", "a").write("\n")
