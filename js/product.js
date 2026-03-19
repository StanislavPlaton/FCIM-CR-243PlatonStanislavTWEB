window.onload = function() {
    updateCounter();
    let params = new URLSearchParams(window.location.search);
    let currentId = params.get('id');
    let container = document.getElementById('product-content');

    let foundProduct = products.find(p => p.id == currentId);

    if (foundProduct) {
        container.innerHTML = `
            <div class="product-wrapper">
                <div class="image-section"><img src="${foundProduct.image}"></div>
                <div class="info-section">
                    <h1>${foundProduct.name}</h1>
                    <div class="price-tag">${foundProduct.price} MDL</div>
                    <div class="description-block"><h3>Описание:</h3><p>${foundProduct.description}</p></div>
                    <div class="actions">
                        <button class="btn-buy" onclick="addToCart(${foundProduct.id})">В корзину</button>
                    </div>
                </div>
            </div>`;
        document.title = foundProduct.name;
    }
};