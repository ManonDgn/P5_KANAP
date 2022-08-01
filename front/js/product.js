
// Déclaration des variables product.html
    const imgProd = document.querySelector('.item__img');
    const titleProd = document.querySelector('title');
    const priceProd = document.querySelector('price');
    const descriptionProd = document.querySelector('description');
    const colorsProd = document.querySelector('colors');
    const quantityProd = document.querySelector('quantity');

// Auto remplissage de la page produit
const baseURL ='http://localhost:3000/api/products'
    fetch(baseURL)
    .then(response => response.json())
    .then(products => {
        JSON.stringify(products);
        for(let product of products){
            const imgProd = document.querySelector('.item__img');
            imgProd.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
            const titleProd = document.getElementById('title');
            titleProd.textContent = product.name;
            const priceProd = document.getElementById('price');
            priceProd.textContent = product.price;
            const descriptionProd = document.getElementById('description');
            descriptionProd.textContent = product.description;
            const colorsProd = document.getElementById('colors');
        }
    });
    