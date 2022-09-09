// ------------------------ CONFIRMATION DE COMMANDE

// -- Interface URL Search Params <-> Récupération de l'id de la commande pour l'associer à l'URL
urlOrderId = new URLSearchParams(window.location.search).get('orderId');

// -- Fonction <-> Affichage du numéro de commande sur la page
function setOrderId () {
    let textIdOrder = document.querySelector('#orderId');
    textIdOrder.innerHTML = `${urlOrderId}`;
};
setOrderId();