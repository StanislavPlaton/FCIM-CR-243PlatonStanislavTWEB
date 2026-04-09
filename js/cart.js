window.onload = async function() {
    updateCounter();
    await loadProductsFromDB();
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

if (container) {
        container.innerHTML = html || "<h3>Корзина пуста</h3>";
    }
    if (totalElement) {
        totalElement.innerText = "Итого: " + totalSum + " MDL";
}
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

async function sendOrder() {
    const nameInput = document.getElementById('order-name');
    const phoneInput = document.getElementById('order-phone');
    const addressInput = document.getElementById('order-address');

    const userData = localStorage.getItem('user');
    
    if (!userData) {
        alert("Пожалуйста, войдите в аккаунт для оформления заказа.");
        window.location.href = '../login.html';
        return;
    }
    
    const parsedUser = JSON.parse(userData);

    const currentUserId = parsedUser.id || (parsedUser.user ? parsedUser.user.id : null);
    
    if (!currentUserId) {
        alert("Ошибка авторизации. Пожалуйста, перезайдите в аккаунт.");
        return;
    }

    let cartIds = JSON.parse(localStorage.getItem('myCart')) || [];

    if (cartIds.length === 0) {
        alert("Ваша корзина пуста!");
        return;
    }

    if (!nameInput.value || !phoneInput.value || !addressInput.value) {
        alert("Пожалуйста, заполните все поля для доставки.");
        return;
    }

    let totalSum = 0;
    let purchasedItems = [];

    cartIds.forEach(id => {
        let p = products.find(item => item.id == id);
        if (p) {
            totalSum += p.price;
            purchasedItems.push(p.name); 
        }
    });

    let itemsString = purchasedItems.join(', ');

 const orderData = {
        customer_name: nameInput.value,
        phone: phoneInput.value,
        address: addressInput.value,
        total_price: totalSum,
        user_id: currentUserId,
        items_list: itemsString
    };

    try {
        const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (response.ok) {
            alert(`Заказ успешно оформлен!`);
            
            localStorage.removeItem('myCart');
            updateCounter();
            
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 500);
        } else {
            alert("Ошибка при сохранении заказа: " + result.error);
        }
    } catch (error) {
        console.error("Ошибка сети:", error);
        alert("Не удалось связаться с сервером. Проверьте, запущен ли Node.js.");
    }
}