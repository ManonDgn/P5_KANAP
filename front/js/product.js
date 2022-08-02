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
            const imgProd = document.querySelector('.item__img');
            imgProd.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
            const titleProd = document.getElementById('title');
            titleProd.textContent = product.name;
            const priceProd = document.getElementById('price');
            priceProd.textContent = product.price;
            const descriptionProd = document.getElementById('description');
            descriptionProd.textContent = product.description;
            const listeColorsProd = document.getElementById('colors');
            const colorsProd = product.colors;
            colorsProd.forEach(color=> {
                const colorOption = document.createElement('option');
                colorOption.textContent = color ;
                listeColorsProd.appendChild(colorOption)
            })

    })
}
displayProduct();