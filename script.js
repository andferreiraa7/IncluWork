document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidade do Menu Hamburguer
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Funcionalidade de Aumentar/Diminuir/Resetar Fonte
    const increaseFontButton = document.getElementById('increase-font');
    const decreaseFontButton = document.getElementById('decrease-font');
    const resetFontButton = document.getElementById('reset-font');
    const body = document.body;
    let baseFontSize = 16; // Tamanho de fonte base em pixels, correspondente ao --font-size-base no CSS

    // Tenta carregar o tamanho da fonte salvo
    const savedFontSize = localStorage.getItem('currentFontSize');
    if (savedFontSize) {
        baseFontSize = parseInt(savedFontSize);
        body.style.fontSize = `${baseFontSize}px`;
    }

    increaseFontButton.addEventListener('click', () => {
        baseFontSize += 2;
        if (baseFontSize > 24) baseFontSize = 24; // Limite máximo
        body.style.fontSize = `${baseFontSize}px`;
        localStorage.setItem('currentFontSize', baseFontSize);
    });

    decreaseFontButton.addEventListener('click', () => {
        baseFontSize -= 2;
        if (baseFontSize < 12) baseFontSize = 12; // Limite mínimo
        body.style.fontSize = `${baseFontSize}px`;
        localStorage.setItem('currentFontSize', baseFontSize);
    });

    resetFontButton.addEventListener('click', () => {
        baseFontSize = 16; // Retorna ao tamanho base
        body.style.fontSize = `${baseFontSize}px`;
        localStorage.setItem('currentFontSize', baseFontSize);
    });

    // Funcionalidade de Alto Contraste
    const toggleContrastButton = document.getElementById('toggle-contrast');
    const highContrastClass = 'high-contrast';

    // Tenta carregar a preferência de alto contraste
    if (localStorage.getItem('highContrastMode') === 'enabled') {
        body.classList.add(highContrastClass);
    }

    toggleContrastButton.addEventListener('click', () => {
        body.classList.toggle(highContrastClass);
        if (body.classList.contains(highContrastClass)) {
            localStorage.setItem('highContrastMode', 'enabled');
        } else {
            localStorage.removeItem('highContrastMode');
        }
    });

    // Rolagem suave para os links do menu e fechamento do menu em mobile
    document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Obtém a altura do cabeçalho fixo para ajustar a rolagem
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight - 10; // Subtrai a altura do header + um pequeno espaçamento

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            // Remove a classe 'active' do menu hamburguer após clicar em um link
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    // Adicionar classe 'active' ao link do menu ao rolar para a seção
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50% 0px', // Ajusta a margem para ativar a seção quando metade dela está visível
        threshold: 0 // Não é usado com rootMargin
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});