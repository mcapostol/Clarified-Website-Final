document.addEventListener("DOMContentLoaded", () => {
  const burger   = document.querySelector(".mobile-nav-toggle");
  const dropdown = document.querySelector(".mobile-nav-dropdown");

  if (burger && dropdown) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      dropdown.classList.toggle("open");
    });
  }

  // language switch
  dropdown.querySelectorAll("[data-lang-switch]").forEach(btn => {
    btn.addEventListener("click", e => {
      const lang = e.currentTarget.dataset.langSwitch;
      localStorage.setItem("lang", lang);
      location.reload();
    });
  });
});
