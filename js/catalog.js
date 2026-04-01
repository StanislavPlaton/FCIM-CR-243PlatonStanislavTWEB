window.onload = async function() {
    updateCounter();

    await loadProductsFromDB();

    let grid = document.getElementById('catalog-grid');
    if (!grid) return;

    let htmlContent = "";

    for (let i = 0; i < products.length; i++) {
        let p = products[i];

        htmlContent += `
            <div class="card">
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <span class="price">${p.price} MDL</span>
                <br><br>
                <button class="btn" onclick="addToCart(${p.id})">В корзину</button>
                
                <a href="product.html?id=${p.id}" class="btn-details" 
                   style="color: #ff6600; font-weight: bold; margin-left: 10px; text-decoration: none;">
                   Детали
                </a>
            </div>
        `;
    }
    grid.innerHTML = htmlContent;
};