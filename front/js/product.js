// Récupération de l'URL ID Produit
const currentUrl = new URL (document.URL);
const idURL = currentUrl.searchParams.get('id');
const idProductURL = 'http://localhost:3000/api/products/' + idURL ;

// Fonction d'affichage des produits selon leur ID
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

// Variable bouton
let buttonAddToCart = document.getElementById('addToCart');
buttonAddToCart.addEventListener('click', addProdToCart);

// FONCTION D'AJOUT AU PANIER

// si panier vide
    // ajoute le produit au panier
// si panier n'est pas vide
    // pour chaque produit du panier
        // si le produit existe déjà (id et couleur)
            // ajoute la nouvelle quantité
        // enregistre la nouvelle quantité dans panier
    // si le produit est différent du produit existant
        // ajoute le produit dans le panier


function addProdToCart (){
    let productQty = parseInt(document.getElementById('quantity').value);
    let productColor = document.getElementById('colors').value;
    let productOn = {productColor, productQty, idURL};
    let savedCart = JSON.parse(localStorage.getItem("cart"));
    let cart = [];

    if (savedCart == null || savedCart.length == 0) {
        cart.push(productOn);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    else {
        let productExist = false;
        for (let i = 0 ; i < savedCart.length ; i++) {
            if (savedCart[i].idURL == productOn.idURL && savedCart[i].productColor == productOn.productColor) {
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





    /*
// Si le panier n'est pas vide
    if (savedCart != null) {
// regarde l'id et la couleur de chaque produit dans le panier
    let productExist = false;
        for (let i = 0 ; i < savedCart.length ; i++) {
// SI l'id et la couleur sont pareils
            if (savedCart[i].idURL == productOn.idURL && savedCart[i].productColor == productOn.productColor) {
// le produit existe, ajoute la nouvelle quantité à l'existante
                productExist = true;
                savedCart[i].productQty = parseInt(productOn.productQty) + parseInt(savedCart[i].productQty);
                console.log('panier idem ajout qte:', cart);
                panier.push(savedCart[i]);
            }
            else {
// sinon, ajoute le produit dans panier
                cart.push(productOn);
                localStorage.setItem("cart", JSON.stringify(cart));
            };
        };
// Sinon (le panier est nul)
    } else {
// ajoute le produit dans panier
        cart.push(productOn);
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log('panier nul ajout :', cart);
    }
};


*/




/*
function addProductToCart () {
    addToCart.onclick = () => {
        var savedCart = JSON.parse(localStorage.getItem("panier"));
        var panier = [];
        var selectProd = [{
            "quantity": parseInt(quantity.value),
            "colors": colors.value,
            "id": idURL
        }];
        console.log(savedCart);
        if (savedCart == null || savedCart.length == 0) {
            localStorage.setItem('panier', JSON.stringify(selectProd));
        } else {
            var exist = false;
            for (var i = 0 ; i < savedCart.length ; i++) {
                console.log("d1", savedCart);
                console.log("d2", selectProd);
                if (savedCart[i].id == selectProd[0].id && savedCart[i].colors == selectProd[0].colors) {
                    console.log("d3 - ok");
                    exist = true;
                    savedCart[i].quantity = parseInt(selectProd[0].quantity) + parseInt(savedCart[i].quantity);
                    //localStorage.setItem('panier', JSON.stringify(selectProd));
                }
            }
            for (var i = 0 ; i < savedCart.length ; i++) {
                panier.push(savedCart[i]);
            };
            if (!exist) {
                panier.push(selectProd[0]);
            }
            localStorage.setItem('panier', JSON.stringify(panier));
        };
    }
};
addProductToCart();
/*


// const et let only
/*
function addProductToCart () {
    addToCart.onclick = () => {
        var savedCart = JSON.parse(localStorage.getItem("panier"));
        var panier = [];
        var selectProd = {
            "quantity": parseInt(quantity.value),
            "colors": colors.value,
            "id": idURL
        };
        var exist = false;
        if (savedCart == null || savedCart.length == 0) {
            localStorage.setItem('panier', JSON.stringify(selectProd));
        } else {
            for (var i = 0 ; i < savedCart.length ; i++) {
                if (savedCart[i].id == selectProd.id && savedCart[i].colors == selectProd.colors) {
                    exist = true;
                    savedCart[i].quantity = parseInt(selectProd.quantity) + parseInt(savedCart[i].quantity);
                    //localStorage.setItem('panier', JSON.stringify(selectProd));
                }
            }
            for (var j = 0 ; j < savedCart.length ; j++) {
                panier.push(savedCart[j]);
            };
            if (!exist) {
                panier.push(selectProd);
            }
            localStorage.setItem('panier', JSON.stringify(panier));
        };
//
/*
function addProductToCart () {
    addToCart.onclick = () => {
        var savedCart = JSON.parse(localStorage.getItem("panier"));
        var panier = [];
        var selectProd = [{
            "quantity": parseInt(quantity.value),
            "colors": colors.value,
            "id": idURL
        }];
        console.log(savedCart);
        if (savedCart == null || savedCart.length == 0) {
            localStorage.setItem('panier', JSON.stringify(selectProd));
        } else {
            var exist = false;
            for (var i = 0 ; i < savedCart.length ; i++) {
                console.log("d1", savedCart);
                console.log("d2", selectProd);
                if (savedCart[i].id == selectProd[0].id && savedCart[i].colors == selectProd[0].colors) {
                    console.log("d3 - ok");
                    exist = true;
                    savedCart[i].quantity = parseInt(selectProd[0].quantity) + parseInt(savedCart[i].quantity);
                    //localStorage.setItem('panier', JSON.stringify(selectProd));
                }
            }
            for (var i = 0 ; i < savedCart.length ; i++) {
                panier.push(savedCart[i]);
            };
            if (!exist) {
                panier.push(selectProd[0]);
            }
            localStorage.setItem('panier', JSON.stringify(panier));
        };
*/

       // if(panier != null) {
       //     panier = [];
       // }
       // get item sur le prod save 
       // si existant

        /*localStorage.setItem('selectProd', JSON.stringify(selectProd));
        panier.push(selectProd);
        localStorage.setItem('panier', JSON.stringify(panier));
        var newProduct = true;
        panier.forEach(function (verif) {
            if ((verif.id === selectProd.id)&&(verif.colors === selectProd.colors)) {
                newProduct = false;
                selectProd.quantity += verif.quantity;
            } else {
                localStorage.setItem('selectProd', JSON.stringify(selectProd));
                panier.push(selectProd);
                localStorage.setItem('panier', JSON.stringify(panier));
            };
        });*/


/*
        savedCart.forEach(function (verif) {
        if ((verif.id === productSelect.id)&&(verif.colors === productSelect.colors)) {
            newProduct = false;
            productSelect.quantity += verif.quantity;
            localStorage.setItem('productSelect', JSON.stringify(productSelect));
        }
        });
    if (newProduct) {
        localStorage.setItem('productSelect', JSON.stringify(productSelect));
        productsOptions.push(productSelect);
        localStorage.setItem('productsOptions', JSON.stringify(productsOptions));
    };
        if(savedCart == null) {
            savedCart = [];
        }
        if ((selectProd.id == selectProd.id) && (selectProd.colors == selectProd.colors)) {
            localStorage.setItem("selectProd", document.getElementById('quantity'));
            selectProd.quantity.value = selectProd.quantity.value += document.getElementById('quantity'.value);
            localStorage.setItem("selectProd", JSON.stringify(selectProd));
            savedCart.push(selectProd);
            console.log(savedCart);
            localStorage.setItem("panier", JSON.stringify(savedCart));
            
        };
        
    };
};
addProductToCart();

/*
// Variable bouton
let buttonAddToCart = document.getElementById('addToCart');
buttonAddToCart.addEventListener('click', addProdToCart);

function addProdToCart (){
    var productSelect = {
        "quantity": document.getElementById('quantity').value,
        "colors": document.getElementById('colors').value,
        "id": idURL
    };
    var productsOptions = [];
    var newProduct = true;
    productsOptions.forEach(function (verif) {
        if ((verif.id === productSelect.id)&&(verif.colors === productSelect.colors)) {
            newProduct = false;
            productSelect.quantity += verif.quantity;
            localStorage.setItem('productSelect', JSON.stringify(productSelect));
        }
        });
    if (newProduct) {
        localStorage.setItem('productSelect', JSON.stringify(productSelect));
        productsOptions.push(productSelect);
        localStorage.setItem('productsOptions', JSON.stringify(productsOptions));
    };
};
    //localStorage.setItem('productSelect', JSON.stringify(productSelect));
    //productsOptions.push(productSelect);
    //localStorage.setItem('productsOptions', JSON.stringify(productsOptions));

*/
/*
let buttonAddToCart = document.getElementById('addToCart');
buttonAddToCart.addEventListener('click', addProdToCart);

function addProdToCart (){
    let productsOptions = [];
    let productSelect = {
        "quantity": document.getElementById('quantity').value,
        "colors": document.getElementById('colors').value,
        "id": idURL
    };
    let foundProduct = productsOptions.find( productSelect => productSelect.id === productSelect.id);
    console.log(foundProduct);
    if (foundProduct == undefined) {
        productSelect.quantity ++;
        localStorage.setItem('productSelect', JSON.stringify(productSelect));
        productsOptions.push(productSelect);
        localStorage.setItem('productsOptions', JSON.stringify(productsOptions));

    } else {
        localStorage.setItem('productSelect', JSON.stringify(productSelect));
        productsOptions.push(productSelect);
        localStorage.setItem('productsOptions', JSON.stringify(productsOptions));
    }
};

*/
/*
let buttonAddToCart = document.getElementById('addToCart');
buttonAddToCart.addEventListener('click', addProdToCart);

function addProdToCart (){
    let productsOptions = [];
    let productSelect = {
        "quantity": document.getElementById('quantity').value,
        "colors": document.getElementById('colors').value,
        "id": idURL
    };
    let foundProduct = productsOptions.find( prod => productSelect.id === idURL);
    console.log(foundProduct);
    if (foundProduct != undefined) {
        productSelect.quantity ++;
        localStorage.setItem('productSelect', JSON.stringify(productSelect));
        productsOptions.push(productSelect);
        localStorage.setItem('productsOptions', JSON.stringify(productsOptions));
    } else {
        localStorage.setItem('productSelect', JSON.stringify(productSelect));
        productsOptions.push(productSelect);
        localStorage.setItem('productsOptions', JSON.stringify(productsOptions));
    }
    
*/






/*
let buttonAddToCart = document.getElementById('addToCart');
function addProductToCart () {
    buttonAddToCart.onclick = () => {
        let savedCart = [];
        let selectProd = {
            "quantity": document.getElementById('quantity').value,
            "colors": document.getElementById('colors').value,
            "id": idURL
        };
        localStorage.setItem("selectProd", JSON.stringify(selectProd));
        savedCart.push(selectProd);
        localStorage.setItem("userChoice", JSON.stringify(savedCart));
        let newProd = 
        savedCart.forEach(currentItem => {
            console.log(selectProd.id);
            let idPresent = false;
            if (selectProd.id === newProd.id){
                idPresent = true;
                currentItem.quantity += selectedProd.quantity;
            }

        })
        /*
        localStorage.setItem("selectProd", JSON.stringify(selectProd));
        savedCart.push(selectProd);
        localStorage.setItem("userChoice", JSON.stringify(savedCart));
        
    };
};

addProductToCart();
*/

/*
// Création de la variable qui gère le bouton
let buttonAddToCart = document.getElementById('addToCart');

// Données à récupérer dans le local storage
let selectProd = {
    "quantity": quantity.value,
    "colors": colors.value,
    "id": idURL
};
localStorage.setItem("options", JSON.stringify(selectProd));
let selectedProduct = [];

// Stockage des produits dans le local stoage via le bouton
buttonAddToCart.addEventListener('click', addToCart);

// Création de la fonction d'ajout au panier
function addToCart (){
    localStorage.setItem("options", JSON.stringify(selectProd));
    selectedProduct.push(selectProd);
    localStorage.setItem("panier", JSON.stringify(selectedProduct));
};
addToCart();
*/
/*
//
function addProductToCart () {
    addToCart.onclick = () => {
        let savedCart = JSON.parse(localStorage.getItem("panier"));
        var panier = [];
        var selectProd = {
            "quantity": quantity.value,
            "colors": colors.value,
            "id": idURL
        };
        // comparer id nouveau produit avec la propriété ID de mes objets dans mon panier
        // prop find pour comparer id ?
        // SI même ID : alors ++qté et (Si même couleur) ++ // SINON …
        console.log(savedCart);
        console.log(localStorage.get);
        if(savedCart == null) {
            savedCart = [];
        }
        if ((selectProd.id == selectProd.id) && (selectProd.colors == selectProd.colors)) {
            localStorage.setItem("selectProd", document.getElementById('quantity'));
            selectProd.quantity.value = selectProd.quantity.value += document.getElementById('quantity'.value);
            localStorage.setItem("selectProd", JSON.stringify(selectProd));
            savedCart.push(selectProd);
            console.log(savedCart);
            localStorage.setItem("panier", JSON.stringify(savedCart));
            
        };
        
    };
};
addProductToCart();
*/

/*
function addProductToCart () {
    addToCart.onclick = () => {
        let savedCart = JSON.parse(localStorage.getItem("userChoice"));
        var selectProd = {
            "quantity": quantity.value,
            "colors": colors.value,
            "id": idURL
        };
        if(savedCart == null) {
            savedCart = [];
        }
        localStorage.setItem("selectProd", JSON.stringify(selectProd));
        savedCart.push(selectProd);
        localStorage.setItem("userChoice", JSON.stringify(savedCart));
        if (selectProd == selectProd) {
            selectProd.quantity++;
        }
    };
};
addProductToCart();
*/

/*
//
function addProductToCart () {
    addToCart.onclick = () => {
        let savedCart = JSON.parse(localStorage.getItem("userChoice"));
        var selectProd = {
            "quantity": quantity.value,
            "colors": colors.value,
            "id": idURL
        };
        if(savedCart == null) {
            savedCart = [];
        }
        localStorage.setItem("selectProd", JSON.stringify(selectProd));
        savedCart.push(selectProd);
        localStorage.setItem("userChoice", JSON.stringify(savedCart));
    };
};
addProductToCart();
*/