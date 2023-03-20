/* Itens do cárdapio */
const cardInfo = [
    {
        title: 'Hamburguer artesanal X-picanha',
        image: 'img/1.png',
        price: '25.50',

        topic: 'xsalada'
    },
    {
        title: 'X-salada bacon',
        image: 'img/2.png',
        price: '30.00',

        topic: 'xsalada'
    },
    {
        title: 'X-salada baixo teor',
        image: 'img/3.png',
        price: '18.00',

        topic: 'xsalada'
    },
    {
        title: 'Coxinha de Frango',
        image: 'img/4.png',
        price: '6.00',

        topic: 'coxinha'
    },
    {
        title: 'Combo 2x Picanha',
        image: 'img/5.png',
        price: '70.00',

        topic: 'combo'
    },
    {
        title: 'Combo 3x Picanha',
        image: 'img/6.png',
        price: '95.00',

        topic: 'combo'
    },
    {
        title: 'Combo X-picanha + batatas fritas',
        image: 'img/7.png',
        price: '40.00',

        topic: 'combo'
    },
    {
        title: 'Combo X-picanha + coxinha',
        image: 'img/8.png',
        price: '80.00',

        topic: 'combo'
    },
    {
        title: 'Coca cola 2L',
        image: 'img/COCA COLA 2L.png',
        price: '10.00',

        topic: 'bebidas'
    },
    {
        title: 'Kuat 2L',
        image: 'img/KUAT 2L.png',
        price: '8.00',

        topic: 'bebidas'
    },
    {
        title: 'Sukita laranja 2L',
        image: 'img/SUKITA LARANJA 2L.png',
        price: '8.00',

        topic: 'bebidas'
    }
];

/* Tópicos cárdapio */
const cardXsalada = document.getElementById("xsalada");
const cardCoxinha = document.getElementById("coxinha");
const cardCombo = document.getElementById("combo");
const cardBebidas = document.getElementById("bebidas");

const indeces = []

/* Cria itens cárdapio e add ao tópico */
for (let i = 0; i < cardInfo.length; i++) {
    // cria os elementos HTML para cada card
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    const imgElement = document.createElement('img');
    imgElement.src = cardInfo[i].image;

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content-card');

    const titleElement = document.createElement('p');
    titleElement.classList.add('title', 'text--medium');
    titleElement.textContent = cardInfo[i].title;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const priceElement = document.createElement('p');
    priceElement.classList.add('price', 'text--medium');
    priceElement.textContent = cardInfo[i].price;

    // adiciona os elementos HTML ao DOM
    imageDiv.appendChild(imgElement);
    contentDiv.appendChild(titleElement);
    infoDiv.appendChild(priceElement);
    contentDiv.appendChild(infoDiv);
    cardDiv.appendChild(imageDiv);
    cardDiv.appendChild(contentDiv);

    if (cardInfo[i].topic.includes('xsalada')) {
        cardXsalada.appendChild(cardDiv);
    } else if (cardInfo[i].topic.includes('coxinha')) {
        cardCoxinha.appendChild(cardDiv);
    } else if (cardInfo[i].topic.includes('combo')) {
        cardCombo.appendChild(cardDiv);
    } else if (cardInfo[i].topic.includes('bebidas')) {
        cardBebidas.appendChild(cardDiv);
    }

    indeces.push()
}

/* Search */
const searchInput = document.getElementById("search")
const cardContainer = document.querySelector('#card-container');




searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredItems = cardInfo.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm);
    });
    if (filteredItems == false) {
        cardContainer.innerHTML = "Não encontrado"
    } else {
        displayItems(filteredItems)
    }
});



function displayItems(items) {
    const cardsGroup = document.createElement('div');
    cardsGroup.classList.add('cards')
    
    cardContainer.innerHTML = '';
    cardsGroup.innerHTML = '';
    cardContainer.appendChild(cardsGroup);

    // adiciona o item filtrado ao DOM
    items.forEach((item) => {
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
            `
        cardsGroup.appendChild(card);
    });


}

/* const modalOverlay = document.querySelector(".modal-overlay");*/

let overlay = document.querySelector(".modal-overlay");
let modal = document.querySelector(".modal");

const closeModal = document.querySelector(".close-modal");  

const modalContent = document.querySelector(".modal-content");

const openModal = () => {
    document.body.classList.add('modal-open');
    overlay.style.display = 'flex'
    modal.style.display = 'flex'
    setTimeout(() => { document.addEventListener('click', handleClickOutside, false) }, 200);
}

const handleClickOutside = (event) => {
    let overlay = document.querySelector(".modal-overlay");
    let modal = document.querySelector(".modal");

    if (!modal.contains(event.target)) {
        document.body.classList.remove('modal-open');
        modal.style.display = 'none';
        overlay.style.display = 'none';
        document.removeEventListener('click', handleClickOutside, false);
    }
}

closeModal.addEventListener("click", () => {
    document.body.classList.remove('modal-open');
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.removeEventListener('click', handleClickOutside, false);
});

const cards = document.querySelectorAll(".card");

let qtddProduto = document.getElementById("qtdd")

let cardSelecionado = null;

let valorFinal;
let valor;

cards.forEach((card) => {
  card.addEventListener("click", () => {

    const title = card.querySelector(".title").textContent;
    const image = card.querySelector(".image img").src;
    const price = card.querySelector(".price").textContent;

    // preencha o modal com as informações do card
    modalContent.querySelector(".title").textContent = title;
    modalContent.querySelector(".image").src = image
    modalContent.querySelector(".price").textContent = price;

    qtddProduto.addEventListener('input', () =>{

        valor = qtddProduto.value;
        valorFinal = price * valor;

        modalContent.querySelector(".price").textContent = valorFinal
    
    })

    cardSelecionado = card;
    valorFinal = price;
    qtddProduto.value = 1;
    valor = 1;

    // exiba o modal
    openModal()
  });
});

const finalizarPedido = document.getElementById("finalizar")

finalizarPedido.addEventListener('click', () => {
    contadorPedido++
    valorPedido.innerHTML = contadorPedido;

    document.body.classList.remove('modal-open');
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.removeEventListener('click', handleClickOutside, false);

    addItemCarrinho(cardSelecionado)      
})


const valorPedido = document.getElementById("value_pedido")
let contadorPedido = 0;
console.log(contadorPedido)

const Bottoncarrinho = document.getElementById("carrinho")

let carrinhoAberto = true;

Bottoncarrinho.addEventListener('click', () => {
  if (carrinhoAberto) {
    // Se o carrinho estiver fechado, adicione os itens e exiba o carrinho
    document.getElementById("page").style.marginRight = '0';
    document.getElementById("cart-sidebar").style.right = '-300px';
    carrinhoAberto = false;
  } else if(!carrinhoAberto){
    // Se o carrinho estiver aberto, remova os itens e oculte o carrinho
    document.getElementById("page").style.marginRight = '300px';
    document.getElementById("cart-sidebar").style.right = '0px';
    carrinhoAberto = true;
  }
});

const li = document.getElementById("listCar");

function addItemCarrinho(card){
  const title = card.querySelector('.title').textContent;

  const item = document.createElement('li');
  item.classList.add('item');
  item.innerHTML = `<span class="name-item">${valor}x - ${title}</span><span class="valor-item">R$${valorFinal}</span>`;
  
  li.appendChild(item);

  newValor()
}

const valorItems = document.getElementById("valorItems");

let somaTotal = 0;
function newValor(){
  somaTotal += parseFloat(valorFinal);
  valorItems.innerText = somaTotal;
};

