// ABRIR E FECHAR MODAL DE LOGIN
const modal = document.getElementById("modal-login");
const btnEntrar = document.getElementById("btn-entrar");
const spanClose = document.querySelector(".close");

btnEntrar.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
});

spanClose.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// TROCAR SEÇÕES DO DASHBOARD
function abrirSecao(secao) {
  const conteudo = document.getElementById("secao-dinamica");

  if (secao === "agenda") {
    conteudo.innerHTML = `
      <h2>📅 Agenda de Sessões</h2>
      <ul class="item-list">
        <li>10/10 - 14h00 - Ana Souza</li>
        <li>10/10 - 16h00 - João Lima</li>
        <li>11/10 - 09h00 - Beatriz Costa</li>
      </ul>
    `;
  }

  if (secao === "pacientes") {
    conteudo.innerHTML = `
      <h2>👥 Lista de Pacientes</h2>
      <ul class="item-list">
        <li>Ana Souza - 12 anos</li>
        <li>João Lima - 10 anos</li>
        <li>Beatriz Costa - 9 anos</li>
      </ul>
    `;
  }

  if (secao === "conteudos") {
    conteudo.innerHTML = `
      <h2>📘 Conteúdos Terapêuticos</h2>
      <ul class="item-list">
        <li>Atividade: Identificação de Emoções</li>
        <li>História: O Leão e o Rato</li>
        <li>Jogo da Memória - Prevenção</li>
      </ul>
    `;
  }

  if (secao === "relatorios") {
    conteudo.innerHTML = `
      <h2>📊 Relatórios</h2>
      <ul class="item-list">
        <li>Relatório Semanal - 07/10</li>
        <li>Relatório Mensal - Setembro</li>
      </ul>
    `;
  }
}
