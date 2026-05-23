window.addEventListener('load', () => {
    const splash = document.getElementById('splashScreen');
    if (splash) {
        setTimeout(() => {
            splash.style.display = 'none';
        }, 3000);
    }
});

// Pega o botão hamburguer e o menu de navegação
var menuToggle = document.getElementById('menuToggle');
var navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {

    // Clicou no hamburguer: abre ou fecha o menu
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Clicou em qualquer link do menu: fecha o menu
    var linksMenu = document.querySelectorAll('.nav-link');
    linksMenu.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const description = document.getElementById('description').value;

        if (name && email && description) {
            alert(`Obrigado, ${name}! Sua mensagem foi recebida em ${email}`);
            contactForm.reset();
        }
    });
}

document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const productName = card.querySelector('h3').textContent;

        e.target.textContent = '✓ Adicionado!';
        e.target.style.background = 'linear-gradient(135deg, #06B6D4, #7C3AED)';

        setTimeout(() => {
            e.target.textContent = 'Adicionar';
            e.target.style.background = '';
        }, 2000);
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pageIn 0.5s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .highlight-card, .info-card').forEach(el => {
    observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes pageIn {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);