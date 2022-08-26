const cart = JSON.parse(localStorage.getItem("cart"));
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
}


// ---------- Fonctions du panier
// -- Affichage des produits
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
}
calcTotalToPay();

// -- Modification quantité du produit
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

// -- Suppression du produit
function deleteProduct(e) {
  let btn = e.target;
  let closestArticle = btn.closest("article");
  let indexOfProduct = getProductIndex(closestArticle.getAttribute('data-id')); //récupérer l'index du closestArticle dans le panier (cart) grâce à son id
  cart.splice(indexOfProduct, 1);
  refreshCart();
  closestArticle.remove();
};
// -- Rafraîchir le panier et la page
function refreshCart () {
  localStorage.setItem('cart', JSON.stringify(cart)); 
  calcTotalToPay();
  location.reload();
};
// -- Récupérer les produits du panier via leur index
function getProductIndex(articleId) {
  return cart.findIndex(item => item._id == articleId)
}


// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------

// Déclaration de la variable formulaire
let formUser = document.querySelector('.cart__order__form');

//--// Vérification champs texte
////// FIRST NAME
formUser.firstName.addEventListener ('change',function(){
  validFirstName(this)
});
const validFirstName = function (inputFirstName) {
   // Fonction validation texte - regex
   let regexText = new RegExp (/^[a-zA-Z]/);
   let messageError = document.getElementById('firstNameErrorMsg');
   if (regexText.test(inputFirstName.value)) {
    messageError.innerHTML = "Valide"
    }
    else {
    messageError.innerHTML = "Invalide";
    }
};
////// LAST NAME
formUser.lastName.addEventListener ('change',function(){
  validLastName(this)
});
const validLastName = function (inputLastName) {
   // Fonction validation texte - regex
   let regexText = /^[a-zA-Z]/;
   let messageError = document.getElementById('lastNameErrorMsg');
   if (regexText.test(inputLastName.value)) {
    messageError.innerHTML = "Valide"
    }
    else {
    messageError.innerHTML = "Invalide";
    }
};
////// ADRESS
formUser.address.addEventListener ('change',function(){
  validAddress(this)
});
const validAddress = function (inputAddress) {
   // Fonction validation texte - regex
   let regexAddress = new RegExp (/^[a-zA-Z0-9\s]*$/);
   let messageError = document.getElementById('addressErrorMsg');
   if (regexAddress.test(inputAddress.value)) {
    messageError.innerHTML = "Valide"
    }
    else {
    messageError.innerHTML = "Invalide";
    }
};
////// CITY
formUser.city.addEventListener ('change',function(){
  validCity(this)
});
const validCity = function (inputCity) {
   // Fonction validation texte - regex
   let regexText = /^[a-zA-Z]/;
   let messageError = document.getElementById('cityErrorMsg');
   if (regexText.test(inputCity.value)) {
    messageError.innerHTML = "Valide"
    }
    else {
    messageError.innerHTML = "Invalide";
    }
};
////// EMAIL
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
  messageError.innerHTML = "Adresse e-mail non valide"
  }
};


/////////////////// Formulaire

function sendForm () {
  formUser.addEventListener('submit', function (e) {
    e.preventDefault();

/////////////////// Ajout du panier dans le tableau products
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
/////////////////// Ajout du panier dans le tableau products
    let contactObj = {
      contact: {
        firstName: formUser.firstName.value,
        lastName: formUser.lastName.value,
        address: formUser.address.value,
        city: formUser.city.value,
        email: formUser.email.value
      },
      products: productsOrder 
    }
    console.log(contactObj);

    let orderOptions = {
      method: 'POST',
      body: JSON.stringify(contactObj),
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
  })
}
sendForm();
/*
formUser.order.addEventListener ('click',function(e){
  e.preventDefault();
 submitForm();
});

async function submitForm () {
  let customerName = document.getElementById('lastName').value;
  let customerFirstName = document.getElementById('firstName').value;
  let customerCity = document.getElementById('city').value;
  let customerAddress = document.getElementById('address').value;
  let customerEmail = document.getElementById('email').value;
  let products = [];
  let contactObj;
  if (customerEmail && customerName) {
    contactObj = {
      firstName: customerFirstName,
      lastName: customerName,
      address: customerAddress,
      city: customerCity,
      email: customerEmail
    }
  };
  if (localStorage.getItem('cart')) {
    let panier = JSON.parse(localStorage.getItem('cart'));
    if (panier) {
      panier.forEach((item) => {
        if (item != null) {
          products.push(item._id)
        }
      });
    }
  };
  const orderProducts = {
    contactObj,
    products
  }
  console.log('orderproducts', orderProducts);
fetch('http://localhost:3000/api/products/order', {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({orderProducts})
})
.then((response) => {
  if (response.ok) {
    return response.json();

  }
})


};

*/