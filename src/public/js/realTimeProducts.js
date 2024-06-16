// Connect to the Socket.IO server
const socket = io();
console.log('Conectado desde el front');

const productForm = document.getElementById('product-form');
const productsList = document.getElementById('products-list');


productForm.addEventListener('submit', event => {
  event.preventDefault();

  const data = new FormData(productForm);
  //Enviar como JSON, ejemplo
  // const obj = {}
  // data.forEach((value,key)=>obj[key]=value);

  fetch('/api/products', {
    method: 'POST',
    body: FormData,
  })
  
  productForm.reset();
});

// Listen for 'update-products' event from the server
socket.on('newProduct', formData => {
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
