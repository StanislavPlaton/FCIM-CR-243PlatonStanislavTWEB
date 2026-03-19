window.onload = function() {
    updateCounter();
    renderCart();
};

function renderCart() {
    let cartIds = JSON.parse(localStorage.getItem('myCart')) || [];
    let container = document.getElementById('cart-items');
    let totalElement = document.getElementById('total-price');
    let totalSum = 0;
    let html = "";

    cartIds.forEach((id, index) => {
        let p = products.find(item => item.id == id);
        if (p) {
            totalSum += p.price;
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <img src="${p.image}" width="50">
                        <b>${p.name}</b>
                    </div>
                    <div class="cart-item-controls">
                        <span>${p.price} MDL</span>
                        <button class="remove-btn" onclick="removeItem(${index})">×</button>
                    </div>
                </div>`;
        }
    });

    container.innerHTML = html || "<h3>Корзина пуста</h3>";
    totalElement.innerText = "Итого: " + totalSum + " MDL";
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('myCart'));
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    renderCart();
    updateCounter();
}

function clearCart() {
    localStorage.removeItem('myCart');
    renderCart();
    updateCounter();
}