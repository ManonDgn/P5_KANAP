// Requête API <-> Affiche tous les produits sur la page d'accueil
function displayProdHome(){
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
}
displayProdHome();