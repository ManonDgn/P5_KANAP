// ------- Afficher panier, modif/suppr qté-item, calcul prix totaux + méthode remove, formulaire (vérif des champs) + POST
// ------- Check expressions régulières

// -- Sauvegarde du panierLocal
function saveCartLocal(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// -- Récupération du panierLocal
function getCartLocal() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  }
  else { 
    return JSON.parse(cart);
  };
};

// -- Affichage des produits du panier local storage
function displayCart (){
  let cart = getCartLocal();
  for (let productOn of cart) {
    let prodURL ='http://localhost:3000/api/products/' + productOn.idURL;
    fetch(prodURL)
    .then(response => response.json())
    .then(productCart => {
      JSON.stringify(productCart);
        let container = document.querySelector('#cart__items');
        let prodDisplay = document.createElement('article');
        prodDisplay.innerHTML = `
          <article class="cart__item" data-id="${productOn.idURL}" data-color="${productOn.productColor}">
          <div class="cart__item__img">
            <img src="${productCart.imageUrl}" alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${productCart.name}</h2>
              <p>${productOn.productColor}</p>
              <p>${productCart.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productOn.productQty}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
          </article>
        `;
        container.appendChild(prodDisplay);
    });
  };
};
displayCart ();

// -- Calcul des prix totaux
function calcTotalToPay () {
  let cart = getCartLocal();
  let totalToPay = 0;
  let itemQty = 0;
  for (let productOn of cart) {
    let prodURL ='http://localhost:3000/api/products/' + productOn.idURL;
    fetch(prodURL)
    .then(response => response.json())
    .then(product => {
      totalToPay += productOn.productQty * product.price;
      let totalItemPrice = document.getElementById("totalPrice");
      totalItemPrice.textContent = totalToPay;

      let itemQtyItem = document.getElementById("totalQuantity");
      itemQty += productOn.productQty ;
      itemQtyItem.textContent = itemQty;
    });
  }
}
calcTotalToPay();



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




// -- Suppression d'un article via l'ID et couleur

/*
let buttonDeleteProd = document.getElementsByClassName('deleteItem');
console.log(buttonDeleteProd);
function test(btn) {
  btn.addEventListener('click', (e) => {
    console.log('btn cliqué');
  })
}
for (let btn of buttonDeleteProd) {
  console.log((btn));
  test(btn);
}
*/
/*
let buttonDeleteProds = document.getElementsByClassName('deleteItem');
for (let v = 0 ; v < buttonDeleteProds.length ; v++) {
  let buttonDelete = buttonDeleteProds[v];
  buttonDelete.addEventListener('click', function removeItem(idURL, productColor){
    let cart = getCartLocal();
    let newCart = cart.filter(item => item.idURL != idURL && item.productColor != productColor);
    localStorage.setItem("cart", JSON.stringify(newCart));
  });
};
*/
/*
let buttonDeleteProds = document.getElementsByClassName('deleteItem');
for (let v = 0 ; v < buttonDeleteProds.length ; v++) {
  let buttonDelete = buttonDeleteProds[v];
  buttonDelete.addEventListener('click', function deleteProd(){
  let closestArticle = buttonDeleteProd.closest("section > article");
    localStorage.removeItem('closestArticle');
    saveCartLocal();
  });
};

let buttonDeleteProds = document.getElementsByClassName('deleteItem');
for (let v = 0 ; v < buttonDeleteProds.length ; v++) {
  let buttonDelete = buttonDeleteProds[v];
  buttonDelete.addEventListener('click', function deleteProd(){
    let cart = getCartLocal();
    for (n = 0 ; n < cart.length ; n++) {
      localStorage.removeItem(cart[n]);
      saveCartLocal(cart);
    }
  });

};
let buttonDeleteProd = document.querySelector('deleteItem');
buttonDeleteProd.addEventListener('click', removeProduct);
function removeProduct(product) {
  let cart = getCartLocal();
  for (n = 0 ; n < buttonDeleteProd.length ; n++) {
    cart = cart.filter(p => p.idURL == product.idURL && p.productColor == product.color);
    saveCartLocal(cart);
  }
  
};

// -- Modification des quantités




let buttonModifyQty = document.getElementsByClassName('itemQuantity').value;
let cart = getCartLocal();
function modifyQty() {
  for (n = 0 ; n < buttonModifyQty.length ; n++) {
  // console.log(cart[n].productQty);
  console.log(buttonModifyQty[n].value);
  }
};
let buttonModifyQty = document.getElementsByClassName('itemQuantity');
buttonModifyQty.addEventListener('change', modifyQty)

function modifyQty() {
  let cart = getCartLocal();
  for (n = 0 ; n < cart.length ; n++) {
    let cartProd = cart[n].find(cartProd => cartProd.idURL == idURL && cartProd.productColor == productColor);
    if (cartProd) {
      cartProd.productQty =+ productQty;
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }
}

function modifyQty () {
  let cart = getCartLocal();
  for (n = 0 ; n < cart.length ; n++) {
    cartProduct[n] = cart.filter(p => p.idURL != product.idURL && p.productColor != product.color);
    if (cartProduct[n] != undefined) {
      cartProduct[n].productQty =+ productQty;
    }
  }
  saveCartLocal(cart);
}



// -- function modifyQty () {};
// modifyQty ();
// addEventListener sur l'input Quantité
// modif DOM + localStorage





let buttonModifyQty = document.getElementsByClassName('itemQuantity');
buttonModifyQty.addEventListener('change', modifyQty);

function modifyQty () {
};



*/

