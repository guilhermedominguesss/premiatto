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
     extras           -> (opcional) o que acompanha o kit além das bandejas
                         (ex.: carvão, pão de alho). Aparece em destaque abaixo da lista.
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
    preco: 289.90, // <- PREÇO
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
    preco: 183.90,
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
    preco: 108.90,
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
    preco: 156.90,
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
    preco: 135.90,
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
   KITS CHURRASCO — mesmos campos dos kits semanais
   -------------------------------------------------------------------------- */
const KITS_CHURRASCO = [
  {
    id: "churrasco-1",
    nome: "Kit Churrasco 1",
    subtitulo: "",
    preco: 304.90, // <- PREÇO
    bandejas: 10,
    gramasPorBandeja: 600,
    itens: [
      "Bife de chorizo Angus",
      "Miolo de alcatra Angus",
      "Linguiça TC Belvedere",
      "Ancho suíno",
      "Tulipa na mostarda",
      "Filé da coxa",
      "Costela borboleta Angus",
      "Bife de Ancho Angus",
      "Medalhão suíno",
      "Picanha suína"
    ],
    extras: ["1 carvão 4kg"],
    foto: "img/kit-churrasco-1.jpg", // <- FOTO
    badge: "",
    destaque: false
  },
  {
    id: "churrasco-2",
    nome: "Kit Churrasco 2",
    subtitulo: "",
    preco: 152.90,
    bandejas: 5,
    gramasPorBandeja: 600,
    itens: [
      "Tulipa temperada",
      "Panceta suína temperada",
      "Linguiça TC",
      "Bife de chorizo temperado",
      "Bife de Ancho temperado"
    ],
    extras: ["1 pão de alho Santa Massa 400g"],
    foto: "img/kit-churrasco-2.jpg",
    badge: "",
    destaque: false
  }
];

/* --------------------------------------------------------------------------
   KITS HAMBÚRGUER — não são em bandejas, então usam campos próprios:
     especificacao -> texto da linha de especificação (use " · " para separar)
     porUnidade    -> calcula "ou R$ X por ..." (quantidade e nome da unidade)
     precoDe       -> (opcional) preço antigo, exibido riscado: "de R$ 66,90 por"
   -------------------------------------------------------------------------- */
const KITS_HAMBURGUER = [
  {
    id: "hamburguer-promocao",
    nome: "Kit Hambúrguer Promoção",
    subtitulo: "De segunda a quarta",
    preco: 56.90, // <- PREÇO
    precoDe: 66.90,
    especificacao: "6 hambúrgueres · 150g cada",
    porUnidade: { quantidade: 6, nome: "hambúrguer" },
    itens: [
      "6 pães",
      "12 fatias de bacon",
      "12 fatias de queijo cheddar ou prato",
      "6 hambúrgueres de costela com 150g"
    ],
    foto: "img/kit-hamburguer.jpg", // <- FOTO
    badge: "PROMOÇÃO",
    destaque: false
  },
  {
    id: "hamburguer",
    nome: "Kit Hambúrguer",
    subtitulo: "De quarta a domingo",
    preco: 66.90,
    especificacao: "6 hambúrgueres · 150g cada",
    porUnidade: { quantidade: 6, nome: "hambúrguer" },
    itens: [
      "6 pães",
      "12 fatias de bacon",
      "12 fatias de queijo cheddar ou prato",
      "6 hambúrgueres de costela com 150g"
    ],
    foto: "img/kit-hamburguer.jpg",
    badge: "",
    destaque: false
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
