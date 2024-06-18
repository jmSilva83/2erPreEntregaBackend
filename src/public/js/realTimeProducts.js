const socket = io();
console.log('connected from socket');

const productsForm = document.getElementById('productsForm');
const productsList = document.getElementById('products-list');

productsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(productsForm);
  fetch('/api/products', {
    method: 'POST',
    body: data,
  });
  productsForm.reset();
});

socket.on('newProduct', (data) => {
  const productElement = document.createElement('div');
  productElement.className = 'card';
  productElement.id = `product-${data.id}`;
  productElement.style.backgroundImage = `url(${data.thumbnails[0].path})`;
  productElement.style.backgroundSize = 'cover';
  productElement.style.backgroundPosition = 'center';
  productElement.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <img src="${data.thumbnails[0].path}" alt="${data.title}" style="max-width: 100%;">
        <p><strong>Price:</strong> $${data.price}</p>
        <p><strong>Stock:</strong> ${data.stock}</p>
        <p><strong>Code:</strong> ${data.code}</p>
        <p><strong>Category:</strong> ${data.category}</p>
        <button class="delete-btn" data-id="${data.id}">Delete</button>
    `;
  productsList.appendChild(productElement);
});
