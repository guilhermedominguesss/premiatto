/* ==========================================================================
   CONFIGURAÇÕES — edite aqui
   ========================================================================== */

// WhatsApp: 55 (Brasil) + DDD + número, somente dígitos.
const WHATSAPP_NUMERO = "5541984682323";

// Mensagem do botão flutuante e dos demais botões gerais.
const MSG_GERAL = "Olá! Vim pelo catálogo da Premiatto e gostaria de fazer um pedido.";

// Mensagem do botão de cada kit. {nome} e {preco} são preenchidos automaticamente.
const MSG_KIT = "Olá! Vim pelo catálogo da Premiatto e quero pedir o {nome} (R$ {preco}). Pode me passar mais informações?";

// Instagram
const INSTAGRAM_URL = "https://www.instagram.com/casadecarnespremiattocuritiba/";
const INSTAGRAM_USUARIO = "@casadecarnespremiattocuritiba";

/* ==========================================================================
   A partir daqui não é necessário editar.
   ========================================================================== */

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const numero = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const escapeHTML = (str) =>
  String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const linkWhatsApp = (mensagem) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;

// "5541984682323" -> "(41) 98468-2323"
function telefoneFormatado(num) {
  const local = num.replace(/\D/g, "").replace(/^55/, "");
  const m = local.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : num;
}

// Preço com "R$" e centavos menores: <R$><249><,90>
function precoHTML(valor) {
  const partes = moeda.formatToParts(valor);
  const pegar = (...tipos) => partes.filter((p) => tipos.includes(p.type)).map((p) => p.value).join("");
  return `
    <span class="price__cur">${pegar("currency")}</span>
    <span class="price__int">${pegar("integer", "group")}</span>
    <span class="price__dec">${pegar("decimal", "fraction")}</span>`;
}

const RE_ANGUS = /\s*\bangus\b\s*/i;

function itemHTML(item) {
  if (!RE_ANGUS.test(item)) return `<li>${escapeHTML(item)}</li>`;
  // O selo ANGUS substitui a palavra no texto, para não repetir.
  const texto = item.replace(RE_ANGUS, " ").trim();
  return `<li><span>${escapeHTML(texto)}</span><span class="tag-angus" title="Carne Angus">ANGUS</span></li>`;
}

function kitHTML(kit, i) {
  const num = String(i + 1).padStart(2, "0");
  const bandejas = Number(kit.bandejas) || 0;
  const porBandeja = bandejas ? moeda.format(kit.preco / bandejas) : "";
  const mensagem = MSG_KIT.replace("{nome}", kit.nome).replace("{preco}", numero.format(kit.preco));
  const classes = ["kit", "reveal", kit.destaque ? "kit--destaque" : ""].join(" ").trim();
  const itens = kit.itens || [];
  const extras = kit.extras || [];

  return `
  <article class="${classes}" id="kit-${escapeHTML(kit.id)}" aria-labelledby="kit-${escapeHTML(kit.id)}-nome">
    <header class="kit__head">
      <span class="kit__num" aria-hidden="true">${num}</span>
      <div class="kit__titles">
        ${kit.subtitulo ? `<p class="kit__sub">${escapeHTML(kit.subtitulo)}</p>` : ""}
        <h3 class="kit__name" id="kit-${escapeHTML(kit.id)}-nome">${escapeHTML(kit.nome)}</h3>
      </div>
    </header>

    <div class="kit__media${kit.foto ? "" : " is-empty"}">
      ${kit.badge ? `<span class="badge">${escapeHTML(kit.badge)}</span>` : ""}
      ${kit.foto ? `<img class="kit__img" src="${escapeHTML(kit.foto)}" alt="Bandejas do ${escapeHTML(kit.nome)}" loading="lazy" decoding="async" width="1200" height="800">` : ""}
    </div>

    <div class="kit__body">
      <div>
        <p class="price" aria-label="Preço: ${moeda.format(kit.preco)}">${precoHTML(kit.preco)}</p>
        ${porBandeja ? `<p class="per-tray">ou <strong>${porBandeja}</strong> por bandeja</p>` : ""}
      </div>

      <p class="specs">
        <svg class="icon" aria-hidden="true"><use href="#i-bandeja"></use></svg>
        <span>${bandejas} bandejas <span class="specs__sep">·</span> ${escapeHTML(kit.gramasPorBandeja)}g cada</span>
      </p>

      <div>
        <p class="items__label"><span>O que vem no kit</span><span>${itens.length} itens</span></p>
        <ul class="items">${itens.map(itemHTML).join("")}</ul>
      </div>

      ${extras.length ? `
      <div class="extras">
        <p class="extras__label">Acompanha</p>
        <ul>${extras.map((x) => `<li>${escapeHTML(x)}</li>`).join("")}</ul>
      </div>` : ""}

      <a class="btn btn--ouro btn--block" href="${linkWhatsApp(mensagem)}" target="_blank" rel="noopener">
        <svg class="icon" aria-hidden="true"><use href="#i-whatsapp"></use></svg>
        Pedir este kit
      </a>
    </div>
  </article>`;
}

/* ---------- Renderização ---------- */
function renderizar() {
  const passos = typeof COMO_PEDIR !== "undefined" ? COMO_PEDIR : [];

  // Cada grupo vira uma seção da página e um conjunto de botões na barra do topo
  const grupos = [
    { lista: "#kits-lista", rotulo: "Kit", kits: typeof KITS !== "undefined" ? KITS : [] },
    { lista: "#churrasco-lista", rotulo: "Churrasco", kits: typeof KITS_CHURRASCO !== "undefined" ? KITS_CHURRASCO : [] }
  ];

  grupos.forEach((g) => {
    const lista = $(g.lista);
    if (lista) lista.innerHTML = g.kits.map(kitHTML).join("");
    if (lista && !g.kits.length) lista.closest("section").hidden = true;
  });

  $("#kitnav-track").innerHTML = grupos
    .filter((g) => g.kits.length)
    .map((g) =>
      g.kits
        .map((kit, i) => `<a class="chip" href="#kit-${escapeHTML(kit.id)}" data-alvo="kit-${escapeHTML(kit.id)}">${g.rotulo} ${i + 1}</a>`)
        .join(""))
    .join(`<span class="kitnav__sep" aria-hidden="true"></span>`);

  $("#passos-lista").innerHTML = passos
    .map((p, i) => `
      <li class="step reveal">
        <span class="step__num" aria-hidden="true">${i + 1}</span>
        <div>
          <h3 class="step__title">${escapeHTML(p.titulo)}</h3>
          <p class="step__text">${escapeHTML(p.texto)}</p>
        </div>
      </li>`)
    .join("");

  // Links gerais de WhatsApp, Instagram e ano
  $$("[data-wa]").forEach((a) => {
    a.href = linkWhatsApp(MSG_GERAL);
    a.target = "_blank";
    a.rel = "noopener";
  });
  $$("[data-wa-numero]").forEach((el) => (el.textContent = telefoneFormatado(WHATSAPP_NUMERO)));
  $("#link-instagram").href = INSTAGRAM_URL;
  $("#instagram-usuario").textContent = INSTAGRAM_USUARIO;
  $("#ano").textContent = new Date().getFullYear();
}

/* ---------- Fotos: fade-in ao carregar, placeholder se faltar ---------- */
function prepararFotos() {
  $$(".kit__img").forEach((img) => {
    const media = img.parentElement;
    const ok = () => { img.classList.add("is-loaded"); media.classList.add("has-photo"); };
    const falhou = () => { img.remove(); media.classList.add("is-empty"); };
    if (img.complete) (img.naturalWidth ? ok() : falhou());
    else {
      img.addEventListener("load", ok, { once: true });
      img.addEventListener("error", falhou, { once: true });
    }
  });
}

/* ---------- Logo do hero: fallback em texto + fundo igual ao canto da logo ---------- */
function prepararLogo() {
  const logo = $(".hero__logo");
  if (!logo) return;

  const semLogo = () => {
    logo.hidden = true;
    $(".wordmark").hidden = false;
    $$(".footer__logo").forEach((el) => (el.hidden = true));
  };

  // Se a logo tiver fundo próprio (canto opaco), o hero assume exatamente essa cor.
  // Obs.: só funciona com o site publicado (http/https). Abrindo o arquivo direto
  // no computador, vale a cor definida em --hero-bg no style.css.
  const lerCanto = () => {
    try {
      const c = document.createElement("canvas");
      c.width = logo.naturalWidth;
      c.height = logo.naturalHeight;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(logo, 0, 0);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      if (a === 255) {
        const cor = `rgb(${r}, ${g}, ${b})`;
        document.documentElement.style.setProperty("--hero-bg", cor);
      }
    } catch (_) { /* arquivo local: mantém a cor do CSS */ }
  };

  if (logo.complete) (logo.naturalWidth ? lerCanto() : semLogo());
  else {
    logo.addEventListener("load", lerCanto, { once: true });
    logo.addEventListener("error", semLogo, { once: true });
  }
}

/* ---------- Navegação: destaca o kit visível ---------- */
function prepararNavegacao() {
  const track = $("#kitnav-track");
  const chips = $$(".chip", track);
  const kits = chips.map((c) => document.getElementById(c.dataset.alvo));
  let ativo = null;

  const ativar = (chip) => {
    if (chip === ativo) return;
    chips.forEach((c) => {
      c.classList.toggle("is-active", c === chip);
      c.toggleAttribute("aria-current", c === chip);
    });
    ativo = chip;
    if (chip && track.scrollWidth > track.clientWidth) {
      const left = chip.offsetLeft - (track.clientWidth - chip.offsetWidth) / 2;
      track.scrollTo({ left, behavior: "smooth" });
    }
  };

  let agendado = false;
  const atualizar = () => {
    agendado = false;
    const linha = window.innerHeight * 0.4;
    let atual = null;
    kits.forEach((kit, i) => {
      if (kit && kit.getBoundingClientRect().top <= linha) atual = chips[i];
    });
    const ultimo = kits[kits.length - 1];
    if (ultimo && ultimo.getBoundingClientRect().bottom < linha) atual = null;
    ativar(atual);
  };

  window.addEventListener("scroll", () => {
    if (!agendado) { agendado = true; requestAnimationFrame(atualizar); }
  }, { passive: true });
  window.addEventListener("resize", atualizar, { passive: true });
  chips.forEach((chip) => chip.addEventListener("click", () => ativar(chip)));
  atualizar();
}

/* ---------- Animação de entrada ao rolar ---------- */
function prepararReveal() {
  const itens = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    itens.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  itens.forEach((el) => io.observe(el));
}

/* ---------- Início ---------- */
renderizar();
prepararFotos();
prepararLogo();
prepararNavegacao();
prepararReveal();
