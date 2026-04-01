let products = []; 

async function loadProductsFromDB() {
    try {
        let response = await fetch('http://localhost:3000/products');
        
        products = await response.json(); 
        console.log("Товары с сервера успешно загружены:", products);
    } catch (error) {
        console.error("Ошибка при связи с сервером:", error);
    }
}



function addToCart(id) {
    let cart = localStorage.getItem('myCart');
    
    if (cart == null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    cart.push(id);

    localStorage.setItem('myCart', JSON.stringify(cart));
    
    updateCounter();
}

function updateCounter() {
    let cart = localStorage.getItem('myCart');
    let count = 0;
    
    if (cart != null) {
        let cartArray = JSON.parse(cart);
        count = cartArray.length;
    }
    
    let counterElement = document.getElementById('cart-count');
    if (counterElement != null) {
        counterElement.innerText = count;
    }
}