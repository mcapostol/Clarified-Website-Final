// script/nav.js
document.addEventListener("DOMContentLoaded", () => {
  const toggle   = document.querySelector(".menu-toggle");   // buton hamburger
  const mobileEl = document.getElementById("mobileMenu");    // nav mobil

  if (toggle && mobileEl) {
    toggle.addEventListener("click", () => {
      mobileEl.classList.toggle("show"); // adaugă / scoate clasa .show
    });
  }

  // Schimbare limbă din meniul mobil
  mobileEl?.querySelectorAll("[data-lang-switch]")?.forEach(btn => {
    btn.addEventListener("click", e => {
      const lang = e.currentTarget.dataset.langSwitch;
      window.localStorage.setItem("lang", lang);   // ex: ro / en / fr / de
      location.reload();                           // reîncarcă cu noua limbă
    });
  });
});
