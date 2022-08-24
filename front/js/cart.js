// ------- Afficher panier, modif/suppr qté-item, calcul prix totaux + méthode remove, formulaire (vérif des champs) + POST
// ------- Check expressions régulières

const cart = JSON.parse(localStorage.getItem("cart"));
let isCartEmpty = (cart == null || cart.length == 0) ? true : false;
if (isCartEmpty) {
  console.log('Votre panier est vide');
} else {
  cart.forEach((item) => {
    const prodUrl = 'http://localhost:3000/api/products/' + item.idURL;
    fetch(prodUrl)
    .then (res => res.json())
    .then (product => {
     displayProduct (product, item.productColor, item.productQty);
     calcTotalToPay (product.price, product.productQty);
    })
  })
}
//
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


// -- Calcul des prix totaux
function calcTotalToPay () {
  let totalToPay = 0;
  let itemQty = 0;
  cart.forEach(item => {
    fetch('http://localhost:3000/api/products/' + item.idURL)
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
}
calcTotalToPay();


function setQty(e) {
  let curInput = e.target;
  let newQty = curInput.value;
  let closestArticle = curInput.closest("article");
  let indexOfProduct = getProductIndex(closestArticle.getAttribute('data-id'));
  let curItem = cart[indexOfProduct];
  curItem.productQty = parseInt(newQty);
  //2- Rafraichir le panier
  refreshCart();
}


function deleteProduct(e) {
  let btn = e.target;
  let closestArticle = btn.closest("article");
  let indexOfProduct = getProductIndex(closestArticle.getAttribute('data-id')); //récupérer l'index du closestArticle dans le panier (cart) grâce à son id
  cart.splice(indexOfProduct, 1);
  refreshCart();
  closestArticle.remove();
};

function refreshCart () {
  localStorage.setItem('cart', JSON.stringify(cart)); 
  calcTotalToPay();
  location.reload();
};

function getProductIndex(articleId) {
  return cart.findIndex(item => item.idURL == articleId)
}


// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

// requete POST formulaire + vérif des champs
let contact = {
  firstName: "",
  lastName: "",
  adresse: "",
  city:"",
  email: ""
};


// Regex formulaire
let formUser = document.querySelector('.cart__order__form');


// // Vérification email
formUser.email.addEventListener ('change',function(){
  validEmail(this)
});
const validEmail = function (inputEmail) {
  // Fonction validation email - regex
  let regexEmail = new RegExp (/^[a-zA-Z0-9_.-]+@[a-z0-9]{2,}\.[a-z]{2,}$/);
  // Récupération de la balise error
  let messageError = document.getElementById('emailErrorMsg');
  // Test de la regex email
  if (regexEmail.test(inputEmail.value)) {
  messageError.innerHTML = "Valide"
  }
  else {
  messageError.innerHTML = "Non Valide"
  }
};
  

let regexText = /^[a-zA-Z]/;



let textInput = document.querySelector('input[type="text"]');
let emailInput = document.querySelector('input[type="email"]');


