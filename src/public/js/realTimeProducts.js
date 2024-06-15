// Connect to the Socket.IO server
const socket = io();
console.log("Conectado desde el front");

const form = document.getElementById('product-form');
const productsList = document.getElementById('products-list');

// Event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Create a FormData object
    const formData = new FormData(form);

    fetch('/api/products', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            socket.emit('new-product', data.payload);
        } else {
            console.error('Error al agregar el producto:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al agregar el producto:', error.message);
    });

    form.reset();
});

// Listen for 'update-products' event from the server
socket.on('update-products', (product) => {
    const productElement = document.createElement('div');
    productElement.className = 'card';
    productElement.id = `product-${product.id}`;
    productElement.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <p><strong>Code:</strong> ${product.code}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <button class="delete-btn" data-id="${product.id}">Delete</button>
    `;
    productsList.appendChild(productElement);
});

// Listen for 'remove-product' event from the server
socket.on('remove-product', (productId) => {
    const productElement = document.getElementById(`product-${productId}`);
    if (productElement) {
        productsList.removeChild(productElement);
    }
});
