// redirecionamento simples
document.getElementById("podeBtn").addEventListener("click", () => {
  window.location.href = "pode.html";
});
document.getElementById("historiaBtn").addEventListener("click", () => {
  window.location.href = "completehistoria.html";
});
document.getElementById("memoriaBtn").addEventListener("click", () => {
  window.location.href = "memoria.html";
});

/* Toque: adiciona uma classe momentânea pra dar feedback visual em mobile */
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn=>{
  btn.addEventListener('touchstart', ()=> btn.classList.add('pressed'));
  btn.addEventListener('touchend', ()=> btn.classList.remove('pressed'));
  btn.addEventListener('mousedown', ()=> btn.classList.add('pressed'));
  btn.addEventListener('mouseup', ()=> btn.classList.remove('pressed'));
});

