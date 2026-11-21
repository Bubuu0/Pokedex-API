const raiz = document.getElementById("detalhes");
const id = Number(new URLSearchParams(location.search).get("id"));

async function iniciar() {
  if (!id) return erro("Nenhum Pokémon foi escolhido.");
  try {
    const [pokemon, especie, proprios] = await Promise.all([
      getJSON(`${API}/pokemon/${id}`),
      getJSON(`${API}/pokemon-species/${id}`),
      getJSON("data/pokemons.json").catch(() => ({}))
    ]);
    const tipos = await Promise.all(pokemon.types.map((t) => getJSON(t.type.url)));
    montar(pokemon, especie, calcularFraquezas(tipos), proprios[id] || {});
  } catch (e) {
    erro("Não foi possível carregar este Pokémon.");
  }
}

function criarVoltar() {
  const voltar = el("a", "botao-voltar", "← Voltar");
  voltar.href = "index.html";
  voltar.addEventListener("click", (e) => {
    if (document.referrer.startsWith(location.origin)) { e.preventDefault(); history.back(); }
  });
  return voltar;
}

function erro(texto) {
  raiz.replaceChildren(el("p", "aviso", texto), criarVoltar());
}

function calcularFraquezas(tipos) {
  const fracos = new Set();
  const resiste = new Set();
  tipos.forEach((t) => {
    t.damage_relations.double_damage_from.forEach((x) => fracos.add(x.name));
    t.damage_relations.half_damage_from.forEach((x) => resiste.add(x.name));
    t.damage_relations.no_damage_from.forEach((x) => resiste.add(x.name));
  });
  return [...fracos].filter((n) => !resiste.has(n)).map((n) => TIPOS[n] || capitalizar(n));
}

function campo(icone, titulo, texto) {
  const bloco = el("section", "campo");
  bloco.append(
    icone === "bola" ? el("span", "campo-icone logo logo-mini") : el("span", "campo-icone", icone),
    el("h2", null, titulo + ":"),
    el("p", null, texto)
  );
  return bloco;
}

function montar(pokemon, especie, fraquezas, meu) {
  document.title = `${capitalizar(pokemon.name)} | Pokedex Universe`;

  const habitat = especie.habitat ? HABITATS[especie.habitat.name] || capitalizar(especie.habitat.name) : "Não informado";
  const habilidades = pokemon.abilities.map((a) => capitalizar(a.ability.name.replace(/-/g, " "))).join(", ");
  const metros = (pokemon.height / 10).toString().replace(".", ",");
  const kilos = (pokemon.weight / 10).toString().replace(".", ",");

  const esquerda = el("div", "det-esq");
  const logo = el("a", "logo");
  logo.href = "index.html";
  logo.setAttribute("aria-label", "Voltar para a lista");
  const cabecalho = el("div", "cabecalho-pagina");
  cabecalho.append(logo, el("h1", "titulo-pagina", "Detalhes"));

  const moldura = el("div", "det-moldura");
  const foto = el("div", "card-foto foto-grande");
  const img = el("img");
  img.src = imagemDoPokemon(pokemon);
  img.alt = capitalizar(pokemon.name);
  foto.appendChild(img);
  moldura.append(el("p", "det-nome-card", capitalizar(pokemon.name)), el("p", "det-numero", formatarNumero(pokemon.id)), foto, criarTipos(pokemon));

  esquerda.append(cabecalho, moldura,
    el("p", "det-altura", `📏 Altura: ${metros} m`), el("p", "det-altura", `⚖️ Peso: ${kilos} kg`));

  const direita = el("div", "det-dir");
  if (meu.categoria) direita.append(campo("bola", "Categoria", meu.categoria));
  direita.append(campo("🌲", "Habitat", meu.habitat || habitat));
  if (meu.alimentacao) direita.append(campo("🍎", "Alimentação", meu.alimentacao));
  if (meu.comportamento) direita.append(campo("💬", "Comportamento", meu.comportamento));
  direita.append(
    campo("💡", "Habilidades", meu.habilidades || habilidades),
    campo("🫶", "Cuidados e fraquezas", meu.cuidados ||
      (fraquezas.length ? "Sensível a ataques de: " + fraquezas.join(", ") + "." : "Nenhuma fraqueza específica."))
  );

  const grade = el("div", "det-grade");
  grade.append(esquerda, direita);
  raiz.replaceChildren(criarVoltar(), grade);
}

iniciar();
