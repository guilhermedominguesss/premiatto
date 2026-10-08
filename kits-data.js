/* ==========================================================================
   PREMIATTO — DADOS DO CATÁLOGO
   --------------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar no dia a dia.
   A página é montada automaticamente a partir daqui.

   Campos de cada kit:
     id               -> identificador (usado no link #kit-1, #kit-2...)
     nome             -> nome exibido e usado na mensagem do WhatsApp
     subtitulo        -> (opcional) linha pequena acima do nome. Deixe "" se não quiser.
     preco            -> NÚMERO, com ponto como separador decimal. Ex.: 249.90
     bandejas         -> quantidade de bandejas (o preço por bandeja é calculado sozinho)
     gramasPorBandeja -> peso de cada bandeja, em gramas
     itens            -> lista de cortes, um por linha. Itens com "Angus" no nome
                         ganham automaticamente o selo ANGUS.
     foto             -> caminho da foto (veja img/README.txt). Se a foto não existir,
                         aparece um fundo elegante com a logo, sem imagem quebrada.
     badge            -> (opcional) selo sobre a foto. Ex.: "FIT", "NOVO", "MAIS PEDIDO".
     destaque         -> true deixa o cartão com acabamento diferenciado.
   ========================================================================== */

const KITS = [
  {
    id: 1,
    nome: "Kit Semanal 1",
    subtitulo: "",
    preco: 249.90, // <- PREÇO
    bandejas: 10,
    gramasPorBandeja: 600,
    itens: [
      "Carré suíno",
      "Filé de peito de frango",
      "Medalhão de frango",
      "Coxinha da asa de frango",
      "Moída de patinho Angus",
      "Bife de patinho Angus",
      "Almôndegas Angus",
      "Linguiça TC Belvedere",
      "Strogonoff de patinho Angus",
      "Strogonoff de frango"
    ],
    foto: "img/kit-1.jpg", // <- FOTO
    badge: "",
    destaque: false
  },
  {
    id: 2,
    nome: "Kit Semanal 2",
    subtitulo: "",
    preco: 182.90,
    bandejas: 8,
    gramasPorBandeja: 500,
    itens: [
      "Setinho Angus",
      "Bife de coxão mole",
      "Músculo sem osso",
      "Bife carpaccio",
      "Filé de peito à milanesa",
      "Ancho suíno",
      "Bisteca empanada",
      "Hambúrguer de costela (combo com 6 unidades)"
    ],
    foto: "img/kit-2.jpg",
    badge: "",
    destaque: false
  },
  {
    id: 3,
    nome: "Kit Semanal 3",
    subtitulo: "",
    preco: 106.90,
    bandejas: 5,
    gramasPorBandeja: 600,
    itens: [
      "Coxinha da asa de frango",
      "Filé de peito de frango",
      "Coxão mole (bife) Angus",
      "Patinho moído Angus",
      "Carré suíno"
    ],
    foto: "img/kit-3.jpg",
    badge: "",
    destaque: false
  },
  {
    id: 4,
    nome: "Kit Semanal 4",
    subtitulo: "",
    preco: 152.90,
    bandejas: 5,
    gramasPorBandeja: 600,
    itens: [
      "Patinho (bife) Angus",
      "Bife de carpaccio Angus",
      "Almôndegas Angus",
      "Setinho c/ osso em cubos Angus",
      "Costela bovina em cubos Angus"
    ],
    foto: "img/kit-4.jpg",
    badge: "",
    destaque: false
  },
  {
    id: 5,
    nome: "Kit Fit da Semana",
    subtitulo: "Kit Semanal 5",
    preco: 129.90,
    bandejas: 5,
    gramasPorBandeja: 500,
    itens: [
      "Strogonoff de patinho",
      "Bife de patinho",
      "Carne moída de patinho",
      "Filé de frango",
      "Strogonoff de frango"
    ],
    foto: "img/kit-5.jpg",
    badge: "FIT",
    destaque: true
  }
];

/* --------------------------------------------------------------------------
   COMO PEDIR — os 3 passos exibidos no fim da página (textos editáveis)
   -------------------------------------------------------------------------- */
const COMO_PEDIR = [
  {
    titulo: "Escolha seu kit",
    texto: "Veja os kits da semana e escolha o que combina com a sua rotina."
  },
  {
    titulo: "Chame no WhatsApp",
    texto: "Toque em “Pedir este kit”. A mensagem já vai pronta com o kit escolhido."
  },
  {
    titulo: "Combine pagamento e entrega",
    texto: "Acertamos com você a forma de pagamento e o melhor dia para receber."
  }
];
