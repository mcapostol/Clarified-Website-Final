/*  script/contact.js  –  AJAX cu FormSubmit  */
document.addEventListener("DOMContentLoaded", () => {
  const form   = document.getElementById("contact-form");
  const status = document.getElementById("form-msg");

  // mici utilitare pentru feedback vizual
  const show = (msg, type) => {
    status.textContent = msg;
    status.className   = `form-msg ${type}`;   // .success | .error | ""
    status.style.display = "block";
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();                // opreşte redirect-ul nativ
    show("Se trimite…", "");

    try {
      const res = await fetch(form.action, {
        method : "POST",
        body   : new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (!res.ok) throw new Error("Server");
      show("Mulțumim! Mesajul a fost trimis.", "success");
      form.reset();                    // curăţă câmpurile
      //  Dacă vrei să ascunzi formularul după succes: form.style.display = "none";
    } catch (err) {
      show(
        "Ups! Nu am putut trimite mesajul. Încearcă din nou "
        + "sau scrie-ne direct la office@clarified.ro.",
        "error"
      );
    }
  });
});
