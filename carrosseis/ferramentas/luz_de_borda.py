# Integra um recorte numa cena em contraluz: escurece, aquece e cria luz de borda (rim light).
# uso: python luz_de_borda.py entrada.png saida.png  [lado: direita|esquerda|topo] [forca]
import sys
import numpy as np
from PIL import Image, ImageFilter
ent, sai = sys.argv[1], sys.argv[2]
lado = sys.argv[3] if len(sys.argv) > 3 else "direita"
forca = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
im = Image.open(ent).convert("RGBA")
a = im.getchannel("A")
arr = np.asarray(im).astype(np.float32)
h, w = a.size[1], a.size[0]
A = arr[..., 3] / 255
# endurece o alpha (tira "fantasmas" semitransparentes do fundo)
A = np.clip((A - 0.25) / 0.6, 0, 1); A = A * A * (3 - 2 * A)
arr[..., 3] = A * 255
a = Image.fromarray((A * 255).astype(np.uint8))
# borda interna: alpha menos alpha desfocado (só dentro do objeto)
r = max(4, int(min(w, h) * 0.018))
blur = np.asarray(a.filter(ImageFilter.GaussianBlur(r))).astype(np.float32) / 255
borda = np.clip((A - blur) * 3.2, 0, 1) * A
# direção da luz
x = np.linspace(0, 1, w)[None, :]; y = np.linspace(0, 1, h)[:, None]
if lado == "direita": d = np.clip(x * 1.4 - 0.2, 0, 1) * (1 - 0.4 * y)
elif lado == "esquerda": d = np.clip((1 - x) * 1.4 - 0.2, 0, 1) * (1 - 0.4 * y)
else: d = np.clip(1 - y * 1.6, 0, 1)
d = 0.35 + 0.65 * d
rgb = arr[..., :3]
# contraluz: objeto mais escuro e quente no corpo
corpo = (0.80 - 0.22 * (1 - d)) * forca + (1 - forca)
rgb = rgb * corpo[..., None] * np.array([1.04, 0.97, 0.88])
# luz de borda (screen)
cor = np.array([255, 178, 96], np.float32)
k = (borda * d * 0.95 * forca)[..., None]
rgb = 255 - (255 - rgb) * (1 - k * cor / 255)
arr[..., :3] = np.clip(rgb, 0, 255)
Image.fromarray(arr.astype(np.uint8), "RGBA").save(sai, optimize=True)
print("ok", sai)
