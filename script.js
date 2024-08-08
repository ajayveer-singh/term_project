let products = []; // This will hold the product data after fetching

// Fetch product data from a JSON file
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data; // Store the fetched product data in the products array
        displayProducts(products); // Display the products on the page
    })
    .catch(error => console.error('Error fetching products:', error));

// Display products on the page
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        cartItems.innerHTML += `
            <div>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</div>
        `;
        total += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = `Total: $${total.toFixed(2)}`;
}

document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Checkout unsuccessful.');
    } else {
        alert('Checkout got succeeded.');
        localStorage.clear();
        cart = [];
        displayCart();
    }
});

// Clear Cart functionality
document.getElementById('clear-cart').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Cart is already empty.');
    } else {
        cart = [];
        localStorage.removeItem('cart');
        displayCart();
        // alert('Cart has been cleared.');
    }
});

// Display cart on page load
displayCart();
