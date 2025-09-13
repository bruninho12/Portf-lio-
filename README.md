# J&B COSTA - Portfolio Corporativo

![J&B COSTA Logo](img/site-advogado.png)

Este é o portfólio corporativo da J&B COSTA, uma empresa especializada em soluções digitais, desenvolvimento web, design e marketing digital. O site apresenta informações sobre a empresa, seus serviços, projetos recentes e formas de contato.

## 🚀 Demonstração

O site está disponível em: [https://jebcosta.com.br](https://jebcosta.com.br)

## ✨ Funcionalidades

- **Design Moderno e Profissional**: Interface atraente e contemporânea
- **Layout Totalmente Responsivo**: Adaptação perfeita para smartphones, tablets e desktops
- **Modo Escuro/Claro**: Alternância entre temas para melhor experiência do usuário
- **Animações de Scroll AOS**: Efeitos visuais suaves durante a navegação
- **Navegação Intuitiva**: Menu de navegação claro com destaque para a seção atual
- **Seções Bem Estruturadas**: Sobre nós, Serviços, Projetos e Contato
- **Formulário de Contato**: Com validação de dados e feedback visual
- **Botão "Voltar ao Topo"**: Para facilitar a navegação em páginas longas
- **Otimização SEO Básica**: Meta tags e estrutura semântica
- **Acessibilidade**: Navegação por teclado e atributos ARIA
- **Performance Otimizada**: Carregamento rápido e eficiente

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estruturação semântica do conteúdo
- **CSS3**: Estilização avançada com variáveis CSS, flexbox e grid
- **JavaScript**: Interatividade e animações personalizadas
- **AOS.js**: Biblioteca para animações de scroll
- **Font Awesome**: Ícones vetoriais
- **Google Fonts**: Tipografia moderna e profissional

## 📂 Estrutura do Projeto

```
├── index.html         # Página principal
├── styles.css         # Estilos CSS
├── script.js          # JavaScript para interatividade
├── README.md          # Documentação do projeto
└── img/               # Diretório de imagens
    ├── site-advogado.png
    ├── site-advogado-phone.png
    ├── site-dentista.png
    └── site-dentista-ipad.png
```

## 📋 Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para carregamento de fontes e bibliotecas externas)

## 🔧 Instalação e Uso

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/portfolio-jebcosta.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd portfolio-jebcosta
   ```

3. Abra o arquivo `index.html` em seu navegador ou utilize uma extensão como Live Server no VS Code.

## ⚙️ Personalização

- Atualize informações da empresa no `index.html`
- Modifique cores e estilos através das variáveis CSS em `styles.css`:
  ```css
  :root {
    --primary-color: #00ccff;
    --primary-dark: #0099cc;
    --secondary-color: #004488;
    /* ... */
  }
  ```
- Substitua as imagens na pasta `img/` por imagens dos seus próprios projetos
- Ajuste as animações e efeitos em `script.js`

## 📊 Analytics e SEO

Para implementar o Google Analytics, adicione o seguinte código antes do fechamento da tag `</head>`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=SEU-ID-AQUI"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "SEU-ID-AQUI");
</script>
```

## 📱 Responsividade

O site está otimizado para os seguintes breakpoints:

- **Dispositivos móveis**: < 480px
- **Tablets**: 481px - 768px
- **Desktops**: 769px - 992px
- **Telas grandes**: > 993px

## 📄 Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

## 📬 Contato

- **Email**: contato@jebcosta.com.br
- **Website**: [jebcosta.com.br](https://jebcosta.com.br)
- **LinkedIn**: [linkedin.com/company/jebcosta](https://linkedin.com/company/jebcosta)

---

© 2025 J&B COSTA - Soluções Digitais | Todos os direitos reservados
