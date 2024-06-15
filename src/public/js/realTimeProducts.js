// Connect to the Socket.IO server
const socket = io();

const form = document.getElementById('product-form');  // Get the product form element
const productsList = document.getElementById('products-list');  // Get the products list container

// Event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent the form from submitting the traditional way
    
    // Get form data
    const newProduct = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value,
        thumbnails: []
    };

    socket.emit('new-product', newProduct);  // Emit the new product to the server

    form.reset();  // Reset the form
});

// Listen for 'update-products' event from the server
socket.on('update-products', (product) => {
    const productElement = document.createElement('li');  // Create a new product element
    productElement.id = `product-${product.id}`;
    productElement.innerText = `${product.title} - ${product.price}`;
    productsList.appendChild(productElement);  // Add the product element to the products list
});

// Listen for 'remove-product' event from the server
socket.on('remove-product', (productId) => {
    const productElement = document.getElementById(`product-${productId}`);  // Get the product element by ID
    if (productElement) {
        productsList.removeChild(productElement);  // Remove the product element from the list
    }
});
