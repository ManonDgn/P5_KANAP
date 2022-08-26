// -- Récupération de l'URL ID Produit
const currentUrl = new URL (document.URL);
const _id = currentUrl.searchParams.get('id');
const idProductURL = 'http://localhost:3000/api/products/' + _id ;

// -- Fonction d'affichage des produits selon leur ID
function displayProduct (){
    fetch(idProductURL)
    .then(response => response.json())
    .then(product => {
        JSON.stringify(product);
        let imgProd = document.querySelector('.item__img');
        let titleProd = document.getElementById('title');
        let priceProd = document.getElementById('price');
        let descriptionProd = document.getElementById('description');
        let listeColorsProd = document.getElementById('colors');
        let colorsProd = product.colors;
        imgProd.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        titleProd.textContent = product.name;
        priceProd.textContent = product.price;
        descriptionProd.textContent = product.description;
        colorsProd.forEach(color=> {
            let colorOption = document.createElement('option');
            colorOption.textContent = color ;
            listeColorsProd.appendChild(colorOption)
        });
    });
}
displayProduct();


//

// -- Variable bouton et déclenchement fonction addProdToCart au clic
let buttonAddToCart = document.getElementById('addToCart');
buttonAddToCart.addEventListener('click', addProdToCart);

// -- Fonction d'ajout des produits au panier
function addProdToCart (){
// variables de l'objet produit
    let productQty = parseInt(document.getElementById('quantity').value);
    let productColor = document.getElementById('colors').value;
// objet produit
    let productOn = {productColor, productQty, _id};
// panier sauvegardé
    let savedCart = JSON.parse(localStorage.getItem("cart"));
// panier
    let cart = [];

// si la quantité est à 0 ou que la couleur n'est pas sélectionnée, affiche une alerte et n'enregistre pas le produit
// sinon
// si panier vide
// ajoute le produit au panier
// sinon le panier n'est pas vide
// pour chaque produit du panier
    // si le produit existe déjà (id et couleur)
        // ajoute la nouvelle quantité
    // enregistre la nouvelle quantité dans panier
    // si le produit est différent du produit existant
        // ajoute le produit dans le panier
    if (productColor <= 0 || productQty <= 0) {
        alert("la couleur et la quantité ne sont pas sélectionnés")
    } else {
        if (savedCart == null || savedCart.length == 0) {
            cart.push(productOn);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    
        else {
            let productExist = false;
            for (let i = 0 ; i < savedCart.length ; i++) {
                if (savedCart[i]._id == productOn._id && savedCart[i].productColor == productOn.productColor) {
                    productExist = true;
                    savedCart[i].productQty = parseInt(productOn.productQty) + parseInt(savedCart[i].productQty);
                }
                cart.push(savedCart[i]);
                localStorage.setItem('cart', JSON.stringify(cart));
            };
            if (!productExist) {
                cart.push(productOn);
                localStorage.setItem('cart', JSON.stringify(cart));
            }; 
        };
    };
    
};
