const API = "https://pokeapi.co/api/v2";

const TIPOS = {
  normal: "Normal", fire: "Fogo", water: "Água", electric: "Eletricidade", grass: "Grama",
  ice: "Gelo", fighting: "Lutador", poison: "Veneno", ground: "Terrestre", flying: "Voar",
  psychic: "Psíquico", bug: "Inseto", rock: "Pedra", ghost: "Fantasma", dragon: "Dragão",
  dark: "Sombrio", steel: "Aço", fairy: "Fada"
};

const HABITATS = {
  cave: "Cavernas", forest: "Florestas", grassland: "Campos", mountain: "Montanhas",
  rare: "Locais raros", "rough-terrain": "Terrenos acidentados", sea: "Mar",
  urban: "Áreas urbanas", "waters-edge": "Beira de rios e lagos"
};

async function getJSON(url) {
  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error("Erro " + resposta.status);
  return resposta.json();
}

const capitalizar = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const formatarNumero = (id) => "#" + String(id).padStart(4, "0");
const imagemDoPokemon = (p) =>
  p.sprites.other["official-artwork"].front_default || p.sprites.front_default;

function el(tag, classe, texto) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texto !== undefined) e.textContent = texto;
  return e;
}

function criarTipos(pokemon) {
  const lista = el("div", "tipos");
  pokemon.types.forEach((t) => lista.appendChild(el("span", "tipo", TIPOS[t.type.name] || capitalizar(t.type.name))));
  return lista;
}

const favoritos = {
  lista() {
    try { return JSON.parse(localStorage.getItem("favoritos")) || []; } catch { return []; }
  },
  tem(id) { return this.lista().includes(id); },
  alternar(id) {
    const l = this.lista();
    const i = l.indexOf(id);
    if (i < 0) l.push(id); else l.splice(i, 1);
    try { localStorage.setItem("favoritos", JSON.stringify(l)); } catch {}
    return i < 0;
  }
};

function criarCard(pokemon, aoMudarFavorito) {
  const card = el("article", "card");

  const foto = el("div", "card-foto");
  const img = el("img");
  img.src = imagemDoPokemon(pokemon);
  img.alt = capitalizar(pokemon.name);
  img.loading = "lazy";
  foto.appendChild(img);

  const linha = el("div", "card-linha");
  const titulo = el("h2", "card-nome");
  const link = el("a", null, capitalizar(pokemon.name));
  link.href = `detalhes.html?id=${pokemon.id}`;
  titulo.appendChild(link);

  const fav = el("button", "fav");
  fav.type = "button";
  const marcar = (ativo) => {
    fav.classList.toggle("ativo", ativo);
    fav.setAttribute("aria-pressed", ativo);
    fav.setAttribute("aria-label", (ativo ? "Remover dos salvos: " : "Salvar: ") + pokemon.name);
  };
  marcar(favoritos.tem(pokemon.id));
  fav.addEventListener("click", () => {
    const ativo = favoritos.alternar(pokemon.id);
    marcar(ativo);
    if (aoMudarFavorito) aoMudarFavorito(ativo, card);
  });
  linha.append(titulo, fav);

  card.append(foto, linha, el("p", "card-numero", formatarNumero(pokemon.id)), criarTipos(pokemon));
  return card;
}
