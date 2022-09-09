// -- Fonction Requête API <-> Affiche tous les produits du localhost sur la page d'accueil
function displayProdHome(){
    let baseURL ='http://localhost:3000/api/products'
    fetch(baseURL)
    .then(response => response.json())
    .then(products => {
        JSON.stringify(products);
// Création d'une boucle pour afficher tous les produits dans leur article respectif
        for(let product of products){
            let container = document.querySelector('section.items');
// Insertion des produits sur la page
            container.innerHTML += `   
            <a href="product.html?id=${product._id}">
            <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
            </article>
            </a>
            `
        }
    })
    .catch(function(err) {
        console.log('Erreur :', err)
    });
};
displayProdHome();