/* script/translate.js */

/* 1. Inițializăm i18next cu backend‑ul ce citește fișierele JSON */
i18next
  .use(i18nextHttpBackend)               // încarcă /locales/{{lng}}/translation.json
  .use(i18nextBrowserLanguageDetector)   // detectează ?lang= sau setările browserului
  .init(
    {
      fallbackLng: 'ro',                 // dacă n‑are traducere, revine la română
      debug: false,                      // pune true dacă vrei să vezi loguri în consolă
      backend: {
        loadPath: `${getBase()}/locales/{{lng}}/translation.json`
      }
    },
    renderPage
  );

/* 2. Aplicăm textele după ce s‑au încărcat */
function renderPage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    // dacă valoarea conține [alt] sau [placeholder] o tratăm separat
    const key = el.dataset.i18n;
    if (key.startsWith('[')) {
      // pattern: [attr]path.to.key
      const attr  = key.slice(1, key.indexOf(']'));
      const i18Key = key.slice(key.indexOf(']') + 1);
      el.setAttribute(attr, i18next.t(i18Key));
    } else {
      el.innerHTML = i18next.t(key);
    }
     /* marchează steagul activ */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.langSwitch === i18next.language);
  });
  });

  // actualizează atributul lang din <html>
  document.documentElement.lang = i18next.language;
}

/* 3. Tratează butoanele data-lang-switch="en|fr|de|ro" */
document.querySelectorAll('[data-lang-switch]').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.langSwitch;
    i18next.changeLanguage(lang, renderPage);
    // actualizează URL‑ul cu ?lang=xx pentru bookmark/share
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url);
  });
});

/* Helper pt. GitHub Pages (dacă ai repo subfolder) */
function getBase() {
  // ex: /Clarified-Website-Final sau / când rulezi local
  const parts = window.location.pathname.split('/');
  if (parts.length > 2) return `/${parts[1]}`;  // repo root
  return '';
}
/* ======== Hide header on scroll ========= */
let lastScrollY = window.scrollY;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;

  if (currentY > lastScrollY && currentY > 80) {
    // scroll în jos → ascunde
    header.classList.add('hide-header');
  } else {
    // scroll în sus → arată
    header.classList.remove('hide-header');
  }

  lastScrollY = currentY;
});