const filtroBtn = document.getElementById("filtroBtn");
const filtroMenu = document.getElementById("filtroMenu");

filtroBtn.addEventListener("click", () => {
  filtroMenu.classList.toggle("show");
});

window.addEventListener("click", (e) => {
  if (!filtroBtn.contains(e.target) && !filtroMenu.contains(e.target)) {
    filtroMenu.classList.remove("show");
  }
});
