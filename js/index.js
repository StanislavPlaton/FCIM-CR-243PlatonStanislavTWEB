window.onload = function() {
    updateCounter();
    let grid = document.getElementById('new-arrivals');
    if (!grid) return;

    let html = "";
    for (let i = 0; i < 3; i++) {
        let p = products[i];
        html += `
            <div class="card">
                <img src="${p.image}" alt="img">
                <h3>${p.name}</h3>
                <span class="price">${p.price} MDL</span>
                <br><br>
                <button class="btn" onclick="addToCart(${p.id})">В корзину</button>
                <a href="pages/product.html?id=${p.id}" class="btn-details">Детали</a>
            </div>
        `;
    }
    grid.innerHTML = html;
};