const nav = document.getElementById('mainNav');
let navTop = nav.offsetTop; // Obtém a distância do topo do navbar

function fixNavbar() {
    if (window.scrollY >= navTop) {
        nav.classList.add('fixed');
    } else {
        nav.classList.remove('fixed');
    }
}

// Adiciona um listener para o evento de scroll da janela
window.addEventListener('scroll', fixNavbar);