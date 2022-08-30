// ------------------------ PANIER
// -- Récupération <-> Données panier dans le localStorage 
const cart = JSON.parse(localStorage.getItem("cart"));
// -- Logique du panier <-> Panier vide // Panier rempli
let isCartEmpty = (cart == null || cart.length == 0) ? true : false;
if (isCartEmpty) {
  console.log('Votre panier est vide');
} else {
  cart.forEach((item) => {
    const prodUrl = 'http://localhost:3000/api/products/' + item._id;
    fetch(prodUrl)
    .then (res => res.json())
    .then (product => {
     displayProduct (product, item.productColor, item.productQty);
     calcTotalToPay (product.price, product.productQty);
    })
  })
};

// ------------------------ FONCTIONS DU PANIER
// -- Fonction <-> Affichage des produits sur la page panier
function displayProduct (product, productColor, productQty){
  const productEl = document.createElement('article');
    productEl.classList.add('cart__item');
    productEl.setAttribute('data-id', product._id);
    productEl.setAttribute('data-color', productColor);
    productEl.innerHTML = `
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${productColor}</p>
          <p><span class="cart__item__price">${product.price}</span> €</p>
      </div>
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productQty}" onchange="setQty(event)">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem" onclick="deleteProduct(event)" >Supprimer</p>
        </div>
      </div>
    </div>`;
    const container = document.getElementById('cart__items');
    container.appendChild(productEl);
    
};

// -- Fonction <-> Calcul des prix totaux selon la quantité et le prix de chaque produit du panier
function calcTotalToPay () {
  let totalToPay = 0;
  let itemQty = 0;
  cart.forEach(item => {
    fetch('http://localhost:3000/api/products/' + item._id)
    .then(response => response.json())
    .then(product => {
      totalToPay += item.productQty * product.price;
      let totalItemPrice = document.getElementById("totalPrice");
      totalItemPrice.textContent = totalToPay;

      let itemQtyItem = document.getElementById("totalQuantity");
      itemQty += item.productQty ;
      itemQtyItem.textContent = itemQty;
    });
  });
};
calcTotalToPay();

// -- Fonction <-> Modification de la quantité de chaque produit du panier
function setQty(e) {
  let curInput = e.target;
  let newQty = curInput.value;
  let closestArticle = curInput.closest("article");
  let indexOfProduct = getProductIndex(closestArticle.getAttribute('data-id'));
  let curItem = cart[indexOfProduct];
  curItem.productQty = parseInt(newQty);
  //2- Rafraichir le panier
  refreshCart();
};

// -- Fonction <-> Suppression d'un produit du panier
function deleteProduct(e) {
  let btn = e.target;
  let closestArticle = btn.closest("article");
  let indexOfProduct = getProductIndex(closestArticle.getAttribute('data-id')); //récupérer l'index du closestArticle dans le panier (cart) grâce à son id
  cart.splice(indexOfProduct, 1);
  refreshCart();
  closestArticle.remove();
};
// -- Fonction <-> Recharger les données du panier et la page avec les modifications
function refreshCart () {
  localStorage.setItem('cart', JSON.stringify(cart)); 
  calcTotalToPay();
  location.reload();
};
// -- Fonction <-> Récupérer les produits du panier via leur index
function getProductIndex(articleId) {
  return cart.findIndex(item => item._id == articleId)
};

// ------------------------ FORMULAIRE
// Déclaration  <->  Variable formulaire et inputs
const formUser = document.querySelector('.cart__order__form');
const inputs = document.querySelectorAll('input');
// ------------------------ FONCTIONS DU FORMULAIRE

// Fonction  <-> Vérification des champs du formulaire
inputs.forEach(input => {
  input.addEventListener('change', e=> {
    verifyInputs(input)
  })
});
function verifyInputs(input) {
  let test, msg;
  const name = input.getAttribute('name');
  const inputValue = input.value;
  const errInput = document.querySelector(`#${name}ErrorMsg`)

  switch (name) {
    case 'address':
      test = /^[a-zA-ZÀ-ÿ0-9]*$/.test(inputValue);
      msg = 'Champ incorrect';
      break;
    case 'email':
      test = /^[a-zA-Z0-9_.-]+@[a-z0-9]{2,}\.[a-z]{2,}$/.test(inputValue);
      msg = 'Champ incorrect';
      break;
    default:
      test = /^[a-zA-ZÀ-ÿ]{2,}/.test(inputValue);
      msg = 'Champ incorrect';
  }
  if (!test) {
    errInput.textContent = msg;
  }
  return test;
};

// Fonction  <-> Envoi du formulaire
function sendForm() {
  // Ajout du panier dans le tableau products
  let productsOrder = [];
  if (localStorage.getItem('cart')) {
    let panier = JSON.parse(localStorage.getItem('cart'));
    if (panier) {
      panier.forEach((item) => {
        if (item != null) {
          productsOrder.push(item._id)
        }
      });
    }
  };
  // Création de l'objet qui sera envoyé à l'API
  let commandUser = {
    contact: {
      firstName: formUser.firstName.value,
      lastName: formUser.lastName.value,
      address: formUser.address.value,
      city: formUser.city.value,
      email: formUser.email.value
    },
    products: productsOrder 
  }
  console.log(commandUser);
  // Requête POST
  let orderOptions = {
    method: 'POST',
    body: JSON.stringify(commandUser),
    headers: {
      "Content-Type": "application/json"
    }
  }
  fetch('http://localhost:3000/api/products/order', orderOptions)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    window.location.href = `/front/html/confirmation.html?orderId=${data.orderId}`;
  })
};
formUser.addEventListener('submit', function (e) {
  e.preventDefault();
  sendForm();
});