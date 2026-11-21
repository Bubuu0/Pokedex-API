const grade = document.getElementById("grade");
const aviso = document.getElementById("aviso");
const botaoMais = document.getElementById("mais");
const campoBusca = document.getElementById("busca");
const POR_PAGINA = 12;

let todos = [];
let filtrados = [];
let mostrados = 0;
let buscaAtual = 0;

async function iniciar() {
  try {
    const dados = await getJSON(`${API}/pokemon?limit=1025`);
    todos = dados.results.map((p) => ({
      nome: p.name,
      id: Number(p.url.split("/").filter(Boolean).pop())
    }));
    filtrar();
  } catch (erro) {
    aviso.textContent = "Não foi possível carregar os Pokémon. Verifique a internet e recarregue a página.";
  }
}

function filtrar() {
  const termo = campoBusca.value.trim().toLowerCase().replace("#", "");
  filtrados = todos.filter((p) => p.nome.includes(termo) || String(p.id) === String(Number(termo)));
  grade.replaceChildren();
  mostrados = 0;
  buscaAtual++;
  carregarMais();
}

async function carregarMais() {
  const minhaBusca = buscaAtual;
  const lote = filtrados.slice(mostrados, mostrados + POR_PAGINA);
  botaoMais.hidden = true;

  if (filtrados.length === 0) {
    aviso.textContent = "Nenhum Pokémon encontrado. Tente outro nome ou número.";
    return;
  }
  aviso.textContent = "Carregando Pokémon…";

  try {
    const pokemons = await Promise.all(lote.map((p) => getJSON(`${API}/pokemon/${p.id}`)));
    if (minhaBusca !== buscaAtual) return;
    pokemons.forEach((p) => grade.appendChild(criarCard(p)));
    mostrados += lote.length;
    aviso.textContent = "";
    botaoMais.hidden = mostrados >= filtrados.length;
  } catch (erro) {
    aviso.textContent = "Erro ao carregar os cards. Tente novamente.";
    botaoMais.hidden = false;
  }
}

let espera;
campoBusca.addEventListener("input", () => {
  clearTimeout(espera);
  espera = setTimeout(filtrar, 300);
});
document.getElementById("form-busca").addEventListener("submit", (e) => {
  e.preventDefault();
  clearTimeout(espera);
  filtrar();
});
botaoMais.addEventListener("click", carregarMais);

iniciar();
