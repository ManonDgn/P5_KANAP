urlOrderId = new URLSearchParams(window.location.search).get('orderId')
function setOrderId () {
    let textIdOrder = document.querySelector('#orderId');
    textIdOrder.innerHTML = `${urlOrderId}`;
}
setOrderId();