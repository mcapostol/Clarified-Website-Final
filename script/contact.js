document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const msgBox = document.getElementById("form-msg");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Remove existing alerts
      document.querySelectorAll(".form-alert").forEach(el => el.remove());

      // Get form elements
      const nameInput = contactForm.querySelector('[name="entry.845252004"]');
      const emailInput = contactForm.querySelector('[name="entry.1093538046"]');
      const subjectInput = contactForm.querySelector('[name="entry.75109367"]');
      const messageInput = contactForm.querySelector('[name="entry.514430117"]');

      // Get field values
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      let valid = true;

      function showError(input, msg) {
        const alert = document.createElement("div");
        alert.className = "form-alert";
        alert.style.color = "red";
        alert.style.marginBottom = "10px";
        alert.style.fontSize = "14px";
        alert.innerText = msg;
        input.insertAdjacentElement("beforebegin", alert);
        valid = false;
      }

      // Validate fields
      if (!name) showError(nameInput, "Name is required");
      if (!email) {
        showError(emailInput, "Email is required");
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        showError(emailInput, "Please enter a valid email");
      }
      if (!subject) showError(subjectInput, "Subject is required");
      if (!message) {
        showError(messageInput, "Message is required");
      } else if (message.length > 1000) {
        showError(messageInput, "Message must be under 1000 characters");
      }

      if (!valid) return;

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Prepare form data for Google Forms
      const formData = new FormData(contactForm);

      fetch("https://docs.google.com/forms/d/e/1FAIpQLSdghT9sf1BUUe2rCHz9V8uEWy0jH6-eb7jhzLuvgWDUnMReyw/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData
      })
        .then(() => {
          contactForm.reset();
          if (msgBox) {
            msgBox.style.color = "#4CAF50";
            msgBox.textContent = "Message sent successfully!";
            msgBox.style.display = "block";
          }
        })
        .catch(() => {
          if (msgBox) {
            msgBox.style.color = "#f44336";
            msgBox.textContent = "There was an error sending your message. Please try again.";
            msgBox.style.display = "block";
          }
        })
        .finally(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          
          // Hide message after 5 seconds
          if (msgBox) {
            setTimeout(() => {
              msgBox.style.display = "none";
            }, 5000);
          }
        });
    });
  }
});
/*  script/contact.js  */
document.addEventListener("DOMContentLoaded", () => {
  const form   = document.getElementById("contact-form");
  const status = document.getElementById("form-msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();               // opreşte redirect-ul
    status.className = "form-msg";    // reset stil
    status.textContent = "Se trimite…";
    status.style.display = "block";

    try {
      const res = await fetch(form.action, {
        method : "POST",
        body   : new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        status.textContent = "Mulțumim! Mesajul a fost trimis.";
        status.classList.add("success");
        form.reset();                 // golește câmpurile
      } else {
        throw new Error("Server error");
      }
    } catch (err) {
      status.textContent =
        "Ups! Nu am putut trimite mesajul. Încearcă din nou sau scrie-ne direct la office@clarified.ro.";
      status.classList.add("error");
    }
  });
});
