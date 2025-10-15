const menu = document.getElementById("menu");
const btnCarrinho = document.getElementById("btn-carr");//variavel com para botao do carrinho
const modalCarrinho = document.getElementById("cartao-modal");//variavel com a div do carrinho 
const conteudoCarrinho = document.getElementById("conteudo");// variavel com a div dos itens que vão aparecer no carrinho
const totalCarrinho = document.getElementById("total-carr");//variavel com a quantidade total de produtos no carrinho
const finalizarCarrinho = document.getElementById("finalizar");//variavel com o botao de finalizar a compra
const fecharCarrinho = document.getElementById("fechar");//variavel com o botao de fechar o carrinho
const quantCarrinho = document.getElementById("quant-carr");//variavel com o span que diz a quantidade de itens no botao grande do carrinho

const endereco = document.getElementById("adress");
const errormsg = document.getElementById("error");

//variavel que contem o elemento nav de id navbar
//obtem a distância do topo do navbar

let menuItens = []; //array com os itens adicionados no carrinho pelo botao de add











// NOVAS VARIÁVEIS ADICIONADAS AQUI
const carrinhoAberto = document.getElementById('carrinho-aberto');
const cliente = document.getElementById('cliente');
const btnVoltar = document.getElementById('voltar');
const avancar = document.getElementById('avancar')


// Lógica para o efeito de girar 
avancar.addEventListener('click', () => {
    // Gira o carrinho para "fora" (esconde)
    carrinhoAberto.classList.remove('rotate-in-reverse');
    carrinhoAberto.classList.add('rotate-out');

    // Gira o cliente para "dentro" (mostra)
    cliente.classList.remove('rotate-out-reverse');
    cliente.classList.add('rotate-in');
});

// Lógica para o efeito de girar ao contrário (botão voltar)
btnVoltar.addEventListener('click', () => {
    // Gira o cliente para "fora" (esconde novamente)
    cliente.classList.remove('rotate-in');
    cliente.classList.add('rotate-out-reverse');

    // Gira o carrinho para "dentro" (mostra novamente)
    carrinhoAberto.classList.remove('rotate-out');
    carrinhoAberto.classList.add('rotate-in-reverse');
});






















//fixar o nav bar ao rolar a pagina e passar por ele
const nav = document.getElementById('navbar');
const main = document.getElementById('menu');
let mainTop = main.offsetTop;

function fixNavbar() {
  if (window.scrollY >= mainTop) {
    nav.classList.add('fixed');
  } else {
    nav.classList.remove('fixed');
  }
}

window.addEventListener('scroll', fixNavbar);
//função

//adiciona um listenet para o evento de scroll na janela



//abrir carrinho
btnCarrinho.addEventListener("click", function () {  //peguei a variavel btncarrinho e adicionei um evento nela de click, e ao clicar uma funçao é iniciada
    modalCarrinho.style.display = "flex" //conteudo da função: muda o estilo css, display, da variavel modaCarrinho para flex
})

//fechar carrinho ao clicar fora
modalCarrinho.addEventListener("click", function (event) {// adicionando um evento de click e uma função na variavel que contem o carrinho
    if (event.target === modalCarrinho){ // a funçao contem uma condição if que se o evento de click em um lugar especifico(event.target), no caso for na div que contem o carrinho, a parte cinza;
        modalCarrinho.style.display = "none"// adicionara o estilo css de display "none" ao elemento
    }
})

//botao fechar carrinho
fecharCarrinho.addEventListener("click", function () {
    modalCarrinho.style.display = "none"
})

//adicionar item no carrinho
menu.addEventListener("click", function(event){//adiciona evento de click na main menu
    let botaoParente = event.target.closest(".botao-add");//adiciona evento de click no elemento com class .botao-add ou no elemnto mais proximo, no caso o <i>
    
    if (botaoParente) {//condiçaõ se botaoparente
        const name = botaoParente.getAttribute("data-name");//cria uma nova constante com o atributo data-name do botao
        const price = parseFloat(botaoParente.getAttribute("data-price"));//cria uma nova constante com o atributo data-price do botao

        //adicionar no carrinho
        addMenuItens(name,price);
    }
})

//função para adicionar no carrinho

function addMenuItens (name, price) { //função que vai adicionar itens ao array 
    
    menuItens.push({
        name,
        price,
        quantity: 1,
    })
}