// Afficher panier, modif/suppr qté-item, calcul prix totaux + méthode remove, formulaire (vérif des champs) + POST
// Check expressions régulières

//Sauvegarde des choix et transmission des informations au panier via le localStorage
/*

const localPanier = JSON.parse(localStorage.getItem("panier"));
localStorage.setItem("localPanier", JSON.stringify(localPanier));
console.log(localPanier);
  for(let product of localPanier) {
    console.log(product);
    let container = document.querySelector('#cart__items');
    console.log('parent', container);
    let prodRecap = document.createElement('article');
    prodRecap.classList.add('cart__item');
    prodRecap.innerHTML = `
    <article>
    <h2> Hi ${product.id}</h2>
    </article>
    `
    container.appendChild(prodRecap);
    console.log(prodRecap);
  }
*/
