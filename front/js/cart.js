// ------- Afficher panier, modif/suppr qté-item, calcul prix totaux + méthode remove, formulaire (vérif des champs) + POST
// ------- Check expressions régulières

// Déclaration de la variable qui stocke les données dans le localStorage
const cart = JSON.parse(localStorage.getItem("cart"));
localStorage.setItem("cart", JSON.stringify(cart));
// HTML = classe et article pour appeler les objets
// fonction qui permet d'afficher tous les produits du local storage
function displayCart (){
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

// -- function modifyQty () {};
// modifyQty ();
// addEventListener sur l'input Quantité
// modif DOM + localStorage

// -- function deleteQty () {};
// deleteQty ();
// addEventListener sur le bouton Supprimer + element.closest() pour le cibler selon id + couleur
// modif DOM + localStorage


// -- function calcPrices () {};
// calcPrices () {};