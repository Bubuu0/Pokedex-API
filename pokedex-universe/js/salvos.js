const grade = document.getElementById("grade");
const aviso = document.getElementById("aviso");

function verificarVazio() {
  aviso.textContent = grade.children.length
    ? ""
    : "Você ainda não salvou nenhum Pokémon. Toque no marcador de um card para salvar.";
}

async function iniciar() {
  const ids = favoritos.lista();
  if (!ids.length) return verificarVazio();
  try {
    const pokemons = await Promise.all(ids.map((id) => getJSON(`${API}/pokemon/${id}`)));
    pokemons.forEach((p) => grade.appendChild(criarCard(p, (ativo, card) => {
      if (!ativo) { card.remove(); verificarVazio(); }
    })));
    aviso.textContent = "";
  } catch (erro) {
    aviso.textContent = "Não foi possível carregar os salvos. Tente novamente.";
  }
}

iniciar();
