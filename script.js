const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    primaryNav.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const newsTrack = document.querySelector(".news-track");
const sliderButtons = document.querySelectorAll(".slider-button");

if (newsTrack && sliderButtons.length) {
  const updateSliderButtons = () => {
    const maxScroll = newsTrack.scrollWidth - newsTrack.clientWidth;
    sliderButtons.forEach((button) => {
      const direction = Number(button.dataset.direction);
      button.disabled = direction < 0
        ? newsTrack.scrollLeft <= 1
        : newsTrack.scrollLeft >= maxScroll - 1;
    });
  };

  sliderButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const firstCard = newsTrack.querySelector(".news-card");
      if (!firstCard) return;
      const gap = Number.parseFloat(getComputedStyle(newsTrack).columnGap) || 0;
      const distance = firstCard.getBoundingClientRect().width + gap;
      newsTrack.scrollBy({ left: Number(button.dataset.direction) * distance, behavior: "smooth" });
    });
  });

  newsTrack.addEventListener("scroll", updateSliderButtons, { passive: true });
  window.addEventListener("resize", updateSliderButtons);
  updateSliderButtons();
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm instanceof HTMLFormElement && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Merci ! Le formulaire est valide. L’envoi sera disponible après configuration du contact.";
    formStatus.classList.add("is-success");
  });

  contactForm.addEventListener("input", () => {
    formStatus.textContent = "";
    formStatus.classList.remove("is-success");
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
