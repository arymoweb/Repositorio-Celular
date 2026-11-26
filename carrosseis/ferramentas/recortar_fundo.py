# Remove o fundo das fotos (rembg) e salva PNG transparente recortado justo.
# uso: python recortar_fundo.py isnet-general-use entrada.jpg saida.png   (pip install "rembg[cpu]")
import sys
from PIL import Image
from rembg import remove, new_session
modelo, ent, sai = sys.argv[1:4]
am = len(sys.argv) > 4 and sys.argv[4] == "am"
img = Image.open(ent).convert("RGB")
out = remove(img, session=new_session(modelo), alpha_matting=am,
             alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=12, alpha_matting_erode_size=8)
bb = out.getchannel("A").point(lambda v: 255 if v > 20 else 0).getbbox()
out.crop(bb).save(sai)
print("ok", sai, out.crop(bb).size)
