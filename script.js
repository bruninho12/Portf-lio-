document.addEventListener("DOMContentLoaded", () => {
  // Inicializa animações AOS
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  });

  // Dark mode toggle
  const toggle = document.getElementById("dark-mode-toggle");
  const icon = document.getElementById("dark-mode-icon");

  // Verifica preferência salva no localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (icon) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      toggle?.setAttribute("aria-label", "Alternar modo claro");
      toggle?.setAttribute("title", "Alternar modo claro");
    }
  }

  toggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      toggle.setAttribute("aria-label", "Alternar modo claro");
      toggle.setAttribute("title", "Alternar modo claro");
      localStorage.setItem("theme", "dark");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      toggle.setAttribute("aria-label", "Alternar modo escuro");
      toggle.setAttribute("title", "Alternar modo escuro");
      localStorage.setItem("theme", "light");
    }
  });

  // Navegação suave para todos os links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Botão de voltar ao topo
  const backToTopButton = document.getElementById("back-to-top");

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", scrollFunction);

  backToTopButton?.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Validação e envio do formulário
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validação avançada
      let valid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = document.getElementById("email");

      if (email && !emailRegex.test(email.value)) {
        alert("Por favor, insira um endereço de e-mail válido.");
        email.focus();
        valid = false;
        return;
      }

      if (!form.checkValidity()) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        valid = false;
        return;
      }

      if (valid) {
        // Simula o envio do formulário com feedback visual
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        setTimeout(() => {
          alert(
            "Mensagem enviada com sucesso! Entraremos em contato em breve."
          );
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 1500);
      }
    });
  }

  // Adiciona classe de ativo ao item de navegação atual com base na rolagem
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll);
});
