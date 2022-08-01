// Requête API <-> Affiche tous les produits sur la page d'accueil
const baseURL ='http://localhost:3000/api/products'
    fetch(baseURL)
    .then(response => response.json())
    .then(products => {
        JSON.stringify(products);
        for(let product of products){
            let container = document.querySelector('section.items');
            let prod = document.createElement('article');
            prod.classList.add('items')
            prod.innerHTML = `
            <article>
            <a href="product.html?id=${product._id}">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            </a>
            </article>
            `
            container.appendChild(prod)
        }
    });

//
var urlProduit = "http://127.0.0.1:5500/front/html/product.html?id=${product.id}";
var url = new URL(urlProduit);
var idUrl = url.searchParams.get("id");
/*
function Produits() {
fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    for(let val of value) {
        const container = document.querySelector('section.items');
        const prod = document.createElement('article');
        prod.innerHTML = "<a href='product.html?id-${value.id}'><h3>${value.id}</h3></a>"
        container.appendChild(prod);
    }
    
    console.log(value)
  })
  .catch(function(err) {
    console.error();
  })
}
Produits();
//
*/
/*
function produitsAccueil() {
    fetch('http://localhost:3000/api/products')
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        for (let elt of response){
        const container = document.querySelector('section.items');

        const article = document.createElement('article');
        article.classList.add('article');
        article.innerHTML = abec
        container.appendChild(article)
    }
}
}
produitsAccueil();
*/