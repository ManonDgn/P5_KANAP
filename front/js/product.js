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


function addProductToCart () {
    addToCart.onclick = () => {
        var userChoice = [];
        var selectProd = {
                quantity: quantity.value,
                colors: colors.value,
                id: idURL
            };
        console.log(userChoice);
        console.log(selectProd);
        var existingSelectProd = JSON.parse(localStorage.getItem("userChoice"));
        if(existingSelectProd== null) existingSelectProd = [];
        localStorage.setItem("selectProd", JSON.stringify(selectProd));
        existingSelectProd.push(selectProd);
        localStorage.setItem("userChoice", JSON.stringify(existingSelectProd));
    };
};
addProductToCart();
