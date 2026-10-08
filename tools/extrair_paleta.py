"""
Extrai a paleta da logo (img/logo.png) para o catálogo Premiatto.

  - Dourado dominante          -> --ouro
  - Dourado mais luminoso      -> --ouro-claro
  - Dourado escurecido         -> --ouro-escuro (fim do gradiente)
  - Cor do pixel do canto      -> --hero-bg (só se a logo tiver fundo opaco)

Uso:
    pip install pillow
    python tools/extrair_paleta.py            # só mostra as cores
    python tools/extrair_paleta.py --aplicar  # grava em style.css
"""
import colorsys
import re
import sys
from collections import Counter
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
LOGO = RAIZ / "img" / "logo.png"
CSS = RAIZ / "style.css"
FUNDO_PADRAO = "#0B0B0B"  # --preto, usado quando a logo é transparente


def para_hex(rgb):
    return "#{:02X}{:02X}{:02X}".format(*(max(0, min(255, round(c))) for c in rgb))


def luminancia(rgb):
    r, g, b = rgb
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def misturar(rgb, alvo, t):
    return tuple(c + (a - c) * t for c, a in zip(rgb, alvo))


def media(pixels):
    return tuple(sum(canal) / len(pixels) for canal in zip(*pixels))


def eh_dourado(r, g, b):
    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    # matiz entre ~25° e ~58°, com saturação e brilho mínimos
    return 0.07 <= h <= 0.16 and s >= 0.28 and v >= 0.35


def extrair():
    img = Image.open(LOGO).convert("RGBA")

    # Fundo: pixel do canto superior esquerdo
    r, g, b, a = img.getpixel((0, 0))
    fundo = para_hex((r, g, b)) if a == 255 else None

    # Amostra reduzida para acelerar
    amostra = img.copy()
    amostra.thumbnail((260, 260))
    dados = amostra.tobytes()
    pixels = [tuple(dados[i:i + 4]) for i in range(0, len(dados), 4)]
    dourados = [(r, g, b) for r, g, b, a in pixels if a > 200 and eh_dourado(r, g, b)]

    if not dourados:
        sys.exit("Nenhum tom dourado encontrado na logo. Mantenha os valores padrão do CSS.")

    # Tom dominante: agrupa em faixas de 16 níveis e pega a faixa mais frequente
    faixa = lambda p: (p[0] // 16, p[1] // 16, p[2] // 16)
    dominante = Counter(map(faixa, dourados)).most_common(1)[0][0]
    ouro = media([p for p in dourados if faixa(p) == dominante])

    # Claro: média dos 15% dourados mais luminosos
    ordenados = sorted(dourados, key=luminancia)
    ouro_claro = media(ordenados[int(len(ordenados) * 0.85):])
    if luminancia(ouro_claro) - luminancia(ouro) < 25:
        ouro_claro = misturar(ouro, (255, 255, 255), 0.35)

    ouro_escuro = misturar(ouro, (0, 0, 0), 0.25)

    return {
        "--ouro": para_hex(ouro),
        "--ouro-claro": para_hex(ouro_claro),
        "--ouro-escuro": para_hex(ouro_escuro),
        "--hero-bg": fundo or FUNDO_PADRAO,
    }, fundo, len(dourados)


def aplicar(cores):
    css = CSS.read_text(encoding="utf-8")
    bloco = re.search(r"/\* paleta:inicio.*?/\* paleta:fim \*/", css, re.S)
    if not bloco:
        sys.exit("Marcadores 'paleta:inicio' / 'paleta:fim' não encontrados no style.css.")
    trecho = bloco.group(0)
    for var, valor in cores.items():
        trecho = re.sub(rf"({re.escape(var)}:\s*)#[0-9A-Fa-f]{{6}}", rf"\g<1>{valor}", trecho)
    CSS.write_text(css[:bloco.start()] + trecho + css[bloco.end():], encoding="utf-8")


def main():
    if not LOGO.exists():
        sys.exit(f"Logo não encontrada em {LOGO}")

    cores, fundo, total = extrair()
    print(f"Pixels dourados analisados: {total}")
    print("Fundo da logo:", fundo if fundo else "transparente (hero usa --preto)")
    for var, valor in cores.items():
        print(f"  {var}: {valor};")

    if "--aplicar" in sys.argv:
        aplicar(cores)
        print("\nstyle.css atualizado.")
    else:
        print("\nPara gravar no style.css: python tools/extrair_paleta.py --aplicar")


if __name__ == "__main__":
    main()
