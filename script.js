document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const currentYear = document.getElementById("currentYear");

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  if (menuToggle && mainNav) {
    const menuIcon = menuToggle.querySelector("i");
    const mobileLayout = window.matchMedia("(max-width: 680px)");

    const setMenuOpen = (isOpen) => {
      mainNav.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu",
      );

      if (menuIcon) {
        menuIcon.classList.toggle("fa-xmark", isOpen);
        menuIcon.classList.toggle("fa-bars", !isOpen);
      }
    };

    menuToggle.addEventListener("click", () => {
      setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuOpen(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mainNav.classList.contains("open")) {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    });

    mobileLayout.addEventListener("change", () => setMenuOpen(false));
  }
});
