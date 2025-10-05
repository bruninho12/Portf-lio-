// Garante que o AOS é inicializado corretamente
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  });
});
