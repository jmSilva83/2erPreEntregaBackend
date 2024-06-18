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

// Añadir event listener al botón de eliminar
const deleteButton = productElement.querySelector('.delete-btn');
deleteButton.addEventListener('click', () => {
  console.log(`Deleting product with ID: ${data.id}`); // Verifica que el clic se detecta correctamente
  fetch(`/api/products/${data.id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        console.log(`Product with ID: ${data.id} deleted successfully`);
      } else {
        console.error(`Failed to delete product with ID: ${data.id}`);
      }
    })
    .catch(error => console.error('Error:', error));
});
});

socket.on('deleteProduct', (productId) => {
const productElement = document.getElementById(`product-${productId}`);
if (productElement) {
  productElement.remove();
}
});