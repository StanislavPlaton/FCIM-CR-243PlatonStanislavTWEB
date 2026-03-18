let products = [
    {
        id: 1,
        name: "ASUS ROG Strix G16",
        price: 32900,
        image: "https://xstore.md/images/htag/asus-rog-strix-g16-g614.jpg",
        description: "Описание"
    },
    {
        id: 2,
        name: "RTX 4090 GIGABYTE",
        price: 24500,
        image: "https://xstore.md/images/product/2023/02/xstore.md-Plac%C4%83-video-Gigabyte-GeForce-RTX-4090-Gaming-OC.jpg",
        description: "Описание"
    },
    {
        id: 3,
        name: "Intel Core i7-14700K",
        price: 8900,
        image: "https://c1.neweggimages.com/ProductImage/19-118-466-01.jpg",
        description: "Описание"
    },
    {
        id: 4,
        name: "Samsung Odyssey G5",
        price: 5400,
        image: "https://xstore.md/images/product/2024/03/Samsung-Odyssey-G5-S32CG55--LS32CG550EIXCI---1-.jpg",
        description: "Описание"
    },
    {
        id: 5,
        name: "Kingston Fury 32GB",
        price: 2600,
        image: "https://xstore.md/images/product/2025/01/memorie-ram-kingston-fury-beast-kf432c16bb1k232-4-xstore-md-81.jpg",
        description: "Описание"
    },
    {
        id: 6,
        name: "SSD Samsung 990 PRO",
        price: 4200,
        image: "https://xstore.md/images/product/2023/03/xstore.md-SSD-Samsung-990-PRO-MZ-V9P1T0BW.png",
        description: "Описание"
    },
    {
        id: 7,
        name: "Logitech G Pro X",
        price: 2800,
        image: "https://resource.logitechg.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png?v=1",
        description: "Описание"
    },
    {
        id: 8,
        name: "HyperX Alloy Origins",
        price: 1900,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSSWTL9mNqstWUhwcj9gPhz94rz3KhiVQQnQ&s",
        description: "Описание"
    },
    {
        id: 9,
        name: "MacBook Pro 16",
        price: 52000,
        image: "https://xstore.md/images/product/thumbs/2026/01/apple-macbook-pro-16-2021-mk1a3-space-gray-xstore-md-4.jpg",
        description: "Описание"
    },
    {
        id: 10,
        name: "SteelSeries Arctis 7",
        price: 3100,
        image: "https://geek.md/image/catalog/products/14815-G/SteelSeries%20Arctis%207%20Black%202019%2061505%20(10).webp",
        description: "Описание"
    }
];



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

window.onload = function() {
    updateCounter();
};