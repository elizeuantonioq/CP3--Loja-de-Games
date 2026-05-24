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

/* ===== CARRINHO ===== */

var carrinho = JSON.parse(localStorage.getItem('hg_carr') || '[]');

function salvarCarrinho() {
    localStorage.setItem('hg_carr', JSON.stringify(carrinho));
}

function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarContador() {
    var total = 0;
    carrinho.forEach(function(item) { total += item.qty; });
    document.querySelectorAll('#carrinho-contador').forEach(function(el) { el.textContent = total; });
}

function renderizarCarrinho() {
    var lista  = document.getElementById('carr-itens');
    var footer = document.getElementById('carr-footer');
    if (!lista) return;

    if (carrinho.length === 0) {
        lista.innerHTML = '<div class="carr-vazio"><i class="fa-solid fa-cart-shopping"></i><p>Seu carrinho está vazio.</p></div>';
        footer.style.display = 'none';
        return;
    }

    var html = '';
    carrinho.forEach(function(item) {
        html += '<div class="carr-item">' +
            '<span class="carr-item-nome">' + item.nome + '</span>' +
            '<div class="carr-item-controles">' +
                '<span class="carr-item-preco">' + formatarPreco(item.preco * item.qty) + '</span>' +
                '<div class="carr-qty">' +
                    '<button onclick="alterarQty(\'' + item.id + '\',-1)">−</button>' +
                    '<span>' + item.qty + '</span>' +
                    '<button onclick="alterarQty(\'' + item.id + '\',1)">+</button>' +
                '</div>' +
                '<button class="carr-remover" onclick="removerItem(\'' + item.id + '\')"><i class="fa-solid fa-trash"></i></button>' +
            '</div></div>';
    });
    lista.innerHTML = html;

    var totalValor = 0;
    carrinho.forEach(function(item) { totalValor += item.preco * item.qty; });
    document.getElementById('carr-total').textContent = formatarPreco(totalValor);
    footer.style.display = 'flex';
}

function abrirCarrinho() {
    document.getElementById('carr-painel').classList.add('aberto');
    document.getElementById('carr-overlay').classList.add('ativo');
    renderizarCarrinho();
}

function fecharCarrinho() {
    document.getElementById('carr-painel').classList.remove('aberto');
    document.getElementById('carr-overlay').classList.remove('ativo');
}

function adicionarAoCarrinho(id, nome, preco, botao) {
    var item = carrinho.find(function(i) { return i.id === id; });
    if (item) { item.qty++; } else { carrinho.push({ id: id, nome: nome, preco: preco, qty: 1 }); }
    salvarCarrinho();
    atualizarContador();

    var orig = botao.innerHTML;
    botao.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado!';
    botao.style.background = 'linear-gradient(135deg,#06B6D4,#7C3AED)';
    setTimeout(function() { botao.innerHTML = orig; botao.style.background = ''; }, 1800);
}

function alterarQty(id, variacao) {
    var item = carrinho.find(function(i) { return i.id === id; });
    if (!item) return;
    item.qty += variacao;
    if (item.qty <= 0) carrinho.splice(carrinho.indexOf(item), 1);
    salvarCarrinho(); atualizarContador(); renderizarCarrinho();
}

function removerItem(id) {
    carrinho = carrinho.filter(function(i) { return i.id !== id; });
    salvarCarrinho(); atualizarContador(); renderizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    salvarCarrinho(); atualizarContador(); renderizarCarrinho();
}

function finalizarCompra() {
    alert('Obrigado pela sua compra!');
    limparCarrinho();
    fecharCarrinho();
}

document.addEventListener('DOMContentLoaded', function() {
    atualizarContador();

    var btnAbrir = document.getElementById('btn-abrir-carrinho');
    if (btnAbrir) btnAbrir.addEventListener('click', function(e) { e.preventDefault(); abrirCarrinho(); });

    var btnFechar = document.getElementById('carr-fechar');
    if (btnFechar) btnFechar.addEventListener('click', fecharCarrinho);

    var overlay = document.getElementById('carr-overlay');
    if (overlay) overlay.addEventListener('click', fecharCarrinho);
});

/* ===== FORMULÁRIO ===== */

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