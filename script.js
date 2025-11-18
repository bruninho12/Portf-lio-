document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.getElementById("preloader");

  // Hide preloader after page loads
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
      // Remove from DOM after animation
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 500);
    }, 1000); // Show for at least 1 second
  });

  // Lazy Loading Implementation
  const lazyImages = document.querySelectorAll(".lazy-load");

  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.classList.add("loading");

            // Create a new image to preload
            const img = new Image();
            img.onload = () => {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove("loading");
              lazyImage.classList.add("loaded");
              lazyImageObserver.unobserve(lazyImage);
            };
            img.src = lazyImage.dataset.src;
          }
        });
      },
      {
        rootMargin: "50px 0px", // Start loading 50px before entering viewport
      }
    );

    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach((lazyImage) => {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.classList.add("loaded");
    });
  }

  // Toast Notification System
  function showToast(message, type = "success") {
    // Remove existing toast
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-${
          type === "success"
            ? "check-circle"
            : type === "error"
            ? "exclamation-circle"
            : "info-circle"
        }"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add("show"), 100);

    // Hide toast after 4 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Inicializa animações AOS
  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
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
      // Validação básica
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = document.getElementById("email");
      const nome = document.getElementById("nome");
      const projeto = document.getElementById("projeto");

      // Verifica campos obrigatórios
      if (!nome.value.trim()) {
        e.preventDefault();
        showToast("Por favor, preencha seu nome.", "error");
        nome.focus();
        return false;
      }

      if (!email.value.trim() || !emailRegex.test(email.value)) {
        e.preventDefault();
        showToast("Por favor, insira um e-mail válido.", "error");
        email.focus();
        return false;
      }

      if (!projeto.value.trim()) {
        e.preventDefault();
        showToast("Por favor, descreva seu projeto.", "error");
        projeto.focus();
        return false;
      }

      // Se chegou aqui, está válido
      showToast("📧 Enviando mensagem...", "info");

      // Mostra loading no botão
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const btnText = submitBtn.querySelector(".btn-text");
        const btnLoading = submitBtn.querySelector(".btn-loading");

        if (btnText && btnLoading) {
          submitBtn.disabled = true;
          btnText.style.display = "none";
          btnLoading.style.display = "inline-block";
        }
      }

      // Permite o envio do formulário
      return true;
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

  // Make showToast globally available
  window.showToast = showToast;
});
