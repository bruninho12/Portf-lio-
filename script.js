document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // PROTEÇÕES ANTI-CLONAGEM
  // ============================================

  // Desabilita menu de contexto (botão direito)
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    showToast("⚠️ Conteúdo protegido por direitos autorais", "error");
    return false;
  });

  // Desabilita teclas de desenvolvedor
  document.addEventListener("keydown", function (e) {
    // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
    if (
      e.keyCode === 123 ||
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
      (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83))
    ) {
      e.preventDefault();
      showToast("🔒 Função desabilitada por segurança", "error");
      return false;
    }

    // Ctrl+A (selecionar tudo)
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault();
      showToast("📝 Seleção total desabilitada", "error");
      return false;
    }

    // Ctrl+C, Ctrl+V, Ctrl+X em áreas protegidas
    if (
      e.ctrlKey &&
      (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 88)
    ) {
      const target = e.target;
      if (
        target.classList.contains("no-select") ||
        target.closest(".no-select")
      ) {
        e.preventDefault();
        showToast("⚠️ Cópia não permitida nesta seção", "error");
        return false;
      }
    }
  });

  // Detecta tentativas de scraping/automação
  let rapidClicks = 0;
  let lastClickTime = 0;

  document.addEventListener("click", function () {
    const now = Date.now();
    if (now - lastClickTime < 100) {
      rapidClicks++;
      if (rapidClicks > 10) {
        showToast("🤖 Comportamento suspeito detectado", "error");
        // Log para analytics (opcional)
        console.warn("Possível bot detectado");
      }
    } else {
      rapidClicks = 0;
    }
    lastClickTime = now;
  });

  // Protege contra seleção de texto em dispositivos mobile
  document.addEventListener("selectstart", function (e) {
    if (
      e.target.classList.contains("no-select") ||
      e.target.closest(".no-select")
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Adiciona proteção a imagens quando carregadas
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("dragstart", function (e) {
      e.preventDefault();
      showToast("🖼️ Imagem protegida contra download", "error");
      return false;
    });

    // Adiciona classe de proteção
    img.classList.add("protected-image");
  });

  // Detecta DevTools aberto (método avançado)
  let devtools = { open: false, orientation: null };
  const threshold = 160;

  setInterval(() => {
    if (
      window.outerHeight - window.innerHeight > threshold ||
      window.outerWidth - window.innerWidth > threshold
    ) {
      if (!devtools.open) {
        devtools.open = true;
        console.clear();
        console.warn(
          "🔒 AVISO: Este conteúdo está protegido por direitos autorais."
        );
        console.warn(
          "📧 Para licenciamento, entre em contato: souzacostabruno009@gmail.com"
        );
        showToast("⚠️ DevTools detectado - Conteúdo protegido", "error");
      }
    } else {
      devtools.open = false;
    }
  }, 500);

  // Adiciona aviso de copyright no console
  console.log(
    "%c🛡️ PORTFÓLIO PROTEGIDO",
    "color: #00ccff; font-size: 20px; font-weight: bold;"
  );
  console.log(
    "%c© 2025 Bruno Souza - Todos os direitos reservados",
    "color: #ff6b35; font-size: 14px;"
  );
  console.log(
    "%c📧 Para licenciamento: souzacostabruno009@gmail.com",
    "color: #4caf50; font-size: 12px;"
  );
  console.log(
    "%c⚠️  Cópia não autorizada pode resultar em ação legal",
    "color: #f44336; font-size: 12px;"
  );

  // Security: Clear sensitive localStorage on page unload
  window.addEventListener("beforeunload", function () {
    // Keep only non-sensitive data
    const allowedKeys = ["lastFormSubmission"];
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !allowedKeys.includes(key)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  });

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
    // Add timestamp for security
    const timestampField = document.getElementById("form-timestamp");
    if (timestampField) {
      timestampField.value = new Date().toISOString();
    }

    form.addEventListener("submit", function (e) {
      // Security validation
      const honeyPot = document.querySelector('input[name="_honey"]');
      if (honeyPot && honeyPot.value !== "") {
        e.preventDefault();
        showToast("Erro de segurança detectado.", "error");
        return false;
      }

      // Rate limiting - prevent rapid submissions
      const lastSubmission = localStorage.getItem("lastFormSubmission");
      const now = Date.now();
      if (lastSubmission && now - parseInt(lastSubmission) < 30000) {
        // 30 seconds
        e.preventDefault();
        showToast(
          "Por favor, aguarde 30 segundos antes de enviar novamente.",
          "error"
        );
        return false;
      }

      // Validação básica
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = document.getElementById("email");
      const nome = document.getElementById("nome");
      const projeto = document.getElementById("tipo-projeto");

      // Verifica campos obrigatórios
      if (!nome.value.trim()) {
        e.preventDefault();
        showToast("Por favor, preencha seu nome.", "error");
        nome.focus();
        return false;
      }

      // Basic input sanitization
      if (nome.value.trim().length < 2 || nome.value.trim().length > 100) {
        e.preventDefault();
        showToast("Nome deve ter entre 2 e 100 caracteres.", "error");
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
        showToast("Por favor, selecione o tipo de projeto.", "error");
        projeto.focus();
        return false;
      }

      // Store submission time
      localStorage.setItem("lastFormSubmission", now.toString());

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
  const navigationLinks = document.querySelectorAll("nav a");

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navigationLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll);

  // Mobile Menu Toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navOverlay = document.getElementById("navOverlay");
  const mobileNavLinks = document.querySelectorAll(".nav-menu a");

  function toggleMobileMenu() {
    const isActive = navMenu.classList.contains("active");

    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    navMenu.classList.add("active");
    navOverlay.classList.add("active");
    navToggle.classList.add("active");
    navToggle.querySelector("i").classList.remove("fa-bars");
    navToggle.querySelector("i").classList.add("fa-times");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }

  function closeMobileMenu() {
    navMenu.classList.remove("active");
    navOverlay.classList.remove("active");
    navToggle.classList.remove("active");
    navToggle.querySelector("i").classList.remove("fa-times");
    navToggle.querySelector("i").classList.add("fa-bars");
    document.body.style.overflow = ""; // Restore scrolling
  }

  // Event listeners
  if (navToggle) {
    navToggle.addEventListener("click", toggleMobileMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", closeMobileMenu);
  }

  // Close menu when clicking on nav links
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // Close menu on resize if screen becomes larger
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  // Make showToast globally available
  window.showToast = showToast;
});
