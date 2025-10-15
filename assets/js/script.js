const menu = document.getElementById("menu");
const btnCarrinho = document.getElementById("btn-carr");//variavel com botao do carrinho
const rodape = document.getElementById("foot-carrinho");//variavel com o footer
const modalCarrinho = document.getElementById("cartao-modal");//variavel com a div do carrinho 
const conteudoCarrinho = document.getElementById("conteudo");// variavel com a div dos itens que vão aparecer no carrinho
const totalCarrinho = document.getElementById("total-carr");//variavel com a quantidade total de produtos no carrinho
const finalizarCarrinho = document.getElementById("finalizar");//variavel com o botao de finalizar a compra
const fecharCarrinho = document.getElementById("fechar");//variavel com o botao de fechar o carrinho
const quantCarrinho = document.getElementById("quant-carr");//variavel com o span que diz a quantidade de itens no botao grande do carrinho

const endereco = document.getElementById("adress");//variavel que contem o item input com id adress
const nome = document.getElementById('nome-cliente');//variavel que contem o item input id nome-cliente


const errorMsgNome = document.getElementById('error-nome');//variavel que contem a msg de erro do nome
const errorMsgLocal = document.getElementById('error-local');//variacel que contem a msg de erro do local

const selectPagamento = document.getElementById('pagamentos');
const pixContainer = document.getElementById('pix-container');
const dinheiroContainer = document.getElementById('dinheiro-container');
const trocoInput = document.getElementById("ipt-troco");

const online = document.getElementById("on");
const offline = document.getElementById("off");

const carrinhoAberto = document.getElementById('carrinho-aberto');
const cliente = document.getElementById('cliente');
const btnVoltar = document.getElementById('voltar');
const avancar = document.getElementById('avancar')

const nav = document.getElementById('navbar'); //variavel que contem o elemento nav de id navbar
let mainTop = menu.offsetTop; //obtem a distância do topo do menu

let menuItens = []; //array com os itens adicionados no carrinho pelo botao de add
let valorTotal = 0// valor inicial, depois na função attCarrinho ela vai ganhar o valor do totalCarrinho

//fixar o nav bar ao rolar a pagina e passar por ele e chegar na main
//função
function fixNavbar() {
    if (window.scrollY >= mainTop) { //(window.scrollY) é maior ou igual à posição vertical do topo do elemento <main> (mainTop).
        nav.classList.add('fixed');//se a condição for realizada vai adicionar a class fixed no elemento navbar
    } else {
        nav.classList.remove('fixed');//se a condição n for realizada remove a class fixed do elemento
    }
}
//adiciona um listener para o evento de scroll na janela, e ao ocorrer tal evento vai realizar a função fixNavbar
window.addEventListener('scroll', fixNavbar);


// Função para atualizar a visibilidade do rodape btnCarrinho
function atualizarVisibilidadeBtnCarrinho() {
    if (menuItens.length === 0) {
        rodape.style.display = "none"; // Esconde se estiver vazio
        modalCarrinho.style.display = "none"
    } else {
        rodape.style.display = "flex"; // Mostra se tiver itens
    }
}
// Chama a função também quando a página carrega (caso o carrinho comece vazio)
window.addEventListener('DOMContentLoaded', atualizarVisibilidadeBtnCarrinho);


//abrir carrinho
btnCarrinho.addEventListener("click", function () {  //peguei a variavel btncarrinho e adicionei um evento nela de click, e ao clicar uma funçao é iniciada
    attCarrinho();//função criada la embaixo que insere os elementos adicionados no carrinho, esta aqui para toda vez que clicar no botao do carrinho mostrar os itens adicionados
    modalCarrinho.style.display = "flex" //conteudo da função: muda o estilo css, display, da variavel modaCarrinho para flex
})

//fechar carrinho ao clicar fora
modalCarrinho.addEventListener("click", function (event) {// adicionando um evento de click e uma função na variavel que contem o carrinho
    if (event.target === modalCarrinho) { // a funçao contem uma condição if que se o evento de click em um lugar especifico(event.target), no caso for na div que contem o carrinho, a parte cinza;
        modalCarrinho.style.display = "none"// adicionara o estilo css de display "none" ao elemento
    }
})

//botao fechar carrinho
fecharCarrinho.addEventListener("click", function () {
    modalCarrinho.style.display = "none"
})

//adicionar item no carrinho
menu.addEventListener("click", function (event) {//adiciona evento de click na main menu
    let botaoParente = event.target.closest(".botao-add");//adiciona evento de click no elemento com class .botao-add ou no elemnto mais proximo, no caso o <i>

    if (botaoParente) {//condiçaõ se botaoparente
        const name = botaoParente.getAttribute("data-name");//cria uma nova constante com o atributo data-name do botao
        const price = parseFloat(botaoParente.getAttribute("data-price"));//cria uma nova constante com o atributo data-price do botao

        //adicionar no carrinho usando a função
        addMenuItens(name, price);
    }
})

//função para adicionar no carrinho
function addMenuItens(name, price) { //função que vai adicionar itens ao array 
    const existeItem = menuItens.find(item => item.name === name);//variavel que vai contem os itens que ja foram adicionados no array, o metodo nativo find() vai percorrer cada elemento do array, e se o o nome do item for um que ja esteja no array ele vai adicionar a quantidade ao array

    if (existeItem) { //condição que vai somar a quantidade de itens caso ja exista no array
        existeItem.quantity += 1;
    } else { //se nao ele vai adicionar somente um elemento no array
        menuItens.push({
            name,
            price,
            quantity: 1,
        })
    }


    attCarrinho();//função que vai atualizar o carrinho
}

//atualizando o carrinho com uma função
function attCarrinho() {//função que vai atualizar o carrinho
    conteudoCarrinho.innerHTML = "";//innerHTML vai permitir acessar ou modificar um elemento html na variavel conteudoCarrinho, variavel que contem os itens adicionados ao carrinho, neste caso um conteudo vazio
    let total = 0;
    let totalqtd = 0;

    menuItens.forEach(item => { //forEach vai percorrer cada elemento do array
        const itemConteudo = document.createElement("div");// createElement vai permitir criar um novo elemento html
        //adicionando uma estilização ao elemento criado 
        itemConteudo.classList.add("display-flex", "justify-content-flex-start", "align-items-center", "margin-bottom-4",);
        //elemento criado sendo modificado com o innerhtml
        itemConteudo.innerHTML = `
        <div class="item-div">
            <div>
                <p class="nome-item">${item.name}</p>
                <p class="qtd-item">Qtd: ${item.quantity}</p>
                <p class="preco-item">R$ ${item.price.toFixed(2)}</p>
            </div>
        

            <button class="remove-btn" data-name="${item.name}">
                Remover
            </button>
        </div>
       `

        total += item.price * item.quantity //vai somar os totais de cada produto, o total de cada produto é o valor x quantidade
        totalqtd += item.quantity//vai somar os itens totais no carrinho

        conteudoCarrinho.appendChild(itemConteudo);//usando o appenchild na variavel conteudoCarrinho adicionamos o itemconteudo que criamos nela
    })

    valorTotal = total;

    totalCarrinho.textContent = total.toFixed(2); //textContent coloca um texto, no caso o texto vai ser o valor da variavel total

    quantCarrinho.innerHTML = totalqtd;//vai colocar a quantidade de itens no botao de abrir o carrinho

    // Atualiza a visibilidade do botão rodape após modificar o carrinho
    atualizarVisibilidadeBtnCarrinho();
}

//remover item do carrinho
conteudoCarrinho.addEventListener('click', function (event) {//evento que vai pegar o item ao clicar no botao remover
    if (event.target.classList.contains("remove-btn")) {
        const name = event.target.getAttribute("data-name")

        //função para remover o item
        removerItemCarr(name);//função criado ali em baixo que vai remover o item do carrinho e tem como paramentro a variavel name que possui o nome do item ao clicar no botao remover
    }
})

//função para remover o item do carrinho, utilizado em cima
function removerItemCarr(name) {
    const index = menuItens.findIndex(item => item.name === name);//variavel com a função findIndex, que vai procurar um index do item que for igual ao name, no array menuItens

    if (index !== -1) {//diferente de -1 pq o finIndex so retorna -1 se ele n encontrar o item, ou seja encontrando o item vai ter qualquer valor diferente de -1
        const item = menuItens[index];//constante item possui o produto que esta no arrray com indice ue foi retornado antes

        if (item.quantity > 1) {
            item.quantity -= 1;

            attCarrinho();//função que atualiza o carrinho, criada antes
            return;
        }

        menuItens.splice(index, 1);//função nativa splice() para remover o item do array
        attCarrinho();//função que atualiza o carrinho, criada antes
    }
}

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

//configuração do endereço
endereco.addEventListener("input", function (event) {//adicionando evento input a variavel endereco que contem o input
    let valorinput = event.target.value;//valor do input

    if (valorinput !== "") {//se o valor do input for diferente de vazio ele vai...
        endereco.style.border = "1px solid gray"//remover a borda vermelha do input, e coloquei uma borda cinza
        errorMsgLocal.style.visibility = "hidden"//adicionar o visibility hidden novamente a mensagem de erro
    }

});

//configuração do nome
nome.addEventListener("input", function (event) {
    let valorinput = event.target.value;//valor do input

    if (valorinput !== "") {//se o valor do input for diferente de vazio ele vai...
        nome.style.border = "1px solid gray"//remover a borda vermelha do input, e coloquei uma borda cinza
        errorMsgNome.style.visibility = "hidden"//adicionar o visibility hidden novamente a mensagem de erro

    }
})


//finalizar carrinho
finalizarCarrinho.addEventListener("click", function () {//adicionando o evento de click para mostrar a msg de erro
    let errovalidacao = false;//variavel para validar se os campos esta preenchidos

    if (menuItens.length === 0) {
        return;//se o array estiver vazio e apertar no botao nao vai acontecer nada, retirar se eu conseguir fechar o carrinho quando ele estiver vazio
    }

    if (endereco.value === "") {//se o valor do endereco for vazio, remove a visibility hidden da msg de erro
        endereco.style.border = "1px solid red";//adiciona uma borda vermelha ao input
        errorMsgLocal.style.visibility = "visible";//remove o hidden que esconde a msg de erro
        errovalidacao = true;
    }

    if (nome.value === "") {
        nome.style.border = "1px solid red";//adiciona uma borda vermelha ao input
        errorMsgNome.style.visibility = "visible";//remove o hidden que esconde a msg de erro
        errovalidacao = true;
    }

    
    // recebe a forma de pagamento selecionada
    const formaPagamento = selectPagamento.value;
    const textoPagamento = selectPagamento.options[selectPagamento.selectedIndex].text;

    // Monta a linha de pagamento baseado na opção
    let linhaPagamento = "";

    if (formaPagamento === "dinheiro") {
        const troco = trocoInput.value;
        if (troco !== "") {
            let valorTroco = troco - valorTotal;
            linhaPagamento = `PAGAMENTO: 
        *Dinheiro - Troco para R$ ${troco}
        Valor troco R$ ${valorTroco}`;
        }else {
            linhaPagamento = `*PAGAMENTO:* Dinheiro - Sem troco`;
        }
                
    } else if (formaPagamento === "pix") {
        linhaPagamento = `*PAGAMENTO:* Pix - Chave: 21969083318`;
    } else if (formaPagamento === "cartao-credito") {
        linhaPagamento = `*PAGAMENTO:* Cartão de Crédito`;
    } else if (formaPagamento === "cartao-debito") {
        linhaPagamento = `*PAGAMENTO:* Cartão de Débito`;
    }

    if (errovalidacao == true) {//se o errovalidação for true a função para aqui
        return
    }

    //enviar pedido para API wpp
    const itemPedido = menuItens.map((item) => {//nova constante que função nativa map que percorrer o arrai e cria um novo com os msm elementos porem alterados
        return (
            `
            ${item.name} - Quantidade: (${item.quantity}) Preço: R$${item.price} |
            `
        )
    }).join("");//metodo join junta todos os elementos do array em uma string e retorna essa string


    const phone = "+5521996378765";
    const msgpedido = `

        NOME DO CLIENTE: *${nome.value}*
        ENDEREÇO DE ENTREGA: *${endereco.value.toUpperCase()}*

        *--- ITENS DO PEDIDO ---*
        ${itemPedido}
    
        *TOTAL: RS: ${valorTotal}*
        ${linhaPagamento}
    `;

    const message = encodeURIComponent(msgpedido);

    window.open(`https://wa.me/${phone}? text=${message}`, "_blank");

    menuItens = [];//array vazio após enviar o pedido

    attCarrinho();//funçao para atualizar o carrinho

})



//abrir e fechar loja através do horário
function checkLojaOpen() {
    const data = new Date();
    const hora = data.getHours();
    const dia = data.getDay();

    const horaAberta = hora >= 10;//retorna true, loja aberta 
    const diaAberto = dia > 0;//retorna true, loja aberta

    // A loja está ABERTA apenas se a HORA E o DIA estiverem corretos
    return horaAberta && diaAberto; // Retorna TRUE ou FALSE

}

const aberto = checkLojaOpen();//variavel aberto vai conter a função que retorna a hora que a loja abrirá

//condição que vai fazer os botoes aparecerem caso a loja esteja aberta
if (aberto) {//se a variavel aberto for true
    offline.style.display = "none";//display da variavel offline sera none

    rodape.style.display = "block";

} else {
    online.style.display = "none";//display da variavel online sera none
    offline.style.display = "block";//display da variavel offline sera block padrao

    rodape.style.display = "none";//botao de finalizar o carrinho some

    const btnPqn = document.querySelectorAll('.botao-add');//constante que contem os elementos com class .botao-add
    if (btnPqn.length > 0) {//condicional caso a quantidade de .botao-add dentro da variavel seja maior que zero
        btnPqn.forEach(botao => {//função nativa forEach vai percorrer cada item e adicionar o estilo no parametro botao
            botao.style.display = 'none';
        })
    };


}


// MOSTRAR/OCULTAR OS CONTAINERS DE PAGAMENTO
document.addEventListener('DOMContentLoaded', function () {

    function atualizarExibicaoPagamento() {
        const valorSelecionado = selectPagamento.value;

        pixContainer.style.display = 'none';
        dinheiroContainer.style.display = 'none';

        if (valorSelecionado === 'pix') {
            pixContainer.style.display = 'block';
        } else if (valorSelecionado === 'dinheiro') {
            dinheiroContainer.style.display = 'flex';
        }
    }

    //adicionando evento de change com a função, na variavel selectpagamento
    selectPagamento.addEventListener('change', atualizarExibicaoPagamento);
    atualizarExibicaoPagamento();//chama a funnção novamente depois do evento
});
