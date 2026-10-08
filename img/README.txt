PREMIATTO — FOTOS DO CATÁLOGO
=============================

Coloque nesta pasta os arquivos com EXATAMENTE estes nomes:

  logo.png    Logo da Premiatto (escudo dourado). Usada no topo, no rodapé,
              no ícone da aba e na prévia ao compartilhar o link.
              Ideal: PNG com fundo transparente, ao menos 800 x 800 px.

  kit-1.jpg   Foto do Kit Semanal 1
  kit-2.jpg   Foto do Kit Semanal 2
  kit-3.jpg   Foto do Kit Semanal 3
  kit-4.jpg   Foto do Kit Semanal 4
  kit-5.jpg   Foto do Kit Fit da Semana (Kit 5)

DICAS PARA AS FOTOS DOS KITS
  - Formato horizontal, proporção 3:2 (ex.: 1500 x 1000 px).
    A foto é recortada automaticamente para caber, mas o centro precisa
    mostrar as bandejas.
  - Fundo escuro ou neutro combina melhor com o catálogo.
  - Tente manter cada arquivo abaixo de 300 KB (use https://squoosh.app
    para comprimir). Fotos leves abrem mais rápido no celular.

Se uma foto não existir, a página mostra um fundo escuro elegante com a logo,
sem imagem quebrada.

Quer usar outro nome ou formato (ex.: kit-1.webp)? Altere o campo "foto"
do kit no arquivo kits-data.js.

PALETA
  Depois de colocar a logo.png aqui, rode (com Python + Pillow instalados):
      python tools/extrair_paleta.py --aplicar
  O dourado do site passa a ser o dourado exato da sua logo.
