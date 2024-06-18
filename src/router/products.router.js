import { Router } from 'express';
import { productsService } from '../managers/index.js';
import uploader from '../service/uploader.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await productsService.getProducts();
    res.send(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res
      .status(500)
      .send({ status: 'error', message: 'Error fetching products' });
  }
});

router.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productsService.getProductById(productId);
    if (!product) {
      return res.render('404');
    }
    res.render('realTimeProducts', {
      product,
      mainImage: product.thumbnails.find((thumbnail) => thumbnail.main),
    });
  } catch (error) {
    console.error('Error fetching product details:', error.message);
    res.render('500');
  }
});

router.post('/', uploader.array('thumbnails', 3), async (req, res) => {
  console.log(req.file);
  const product = req.body;
  try {
    const newProduct = {
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      stock: product.stock,
      category: product.category,
      thumbnails: [],
    };

    for (let i = 0; i < req.files.length; i++) {
      newProduct.thumbnails.push({
        mimetype: req.files[i].mimetype,
        path: `/files/products/${req.files[i].filename}`,
        main: i == 0,
      });
    }

    const result = await productsService.createProduct(newProduct);
    req.io.emit('newProduct', result);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', error: error });
  }
});

router.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
try {
    const product = await productsService.getProductById(productId);
    if (!product) {
      return res
        .status(404)
        .send({ status: 'error', message: 'Product not found' });
    }

    await productsService.deleteProduct(productId);
    req.io.emit('deleteProduct', productId);
    res.send({ status: 'success', message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res
      .status(500)
      .send({ status: 'error', message: 'Error deleting product' });
  }
});

export default router;
