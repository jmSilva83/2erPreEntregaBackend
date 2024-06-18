// import { Router } from 'express';
// import ProductManager from '../managers/productManager.js';

// const router = Router();
// const manager = new ProductManager();

// router.get('/', async (req, res) => {
//   try {
//     const products = await manager.getProducts();
//     if (products.length === 0) {
//       return res.status(404).send('No products found at this time (￢_￢)');
//     }
//     res.send(products);
//   } catch (error) {
//     res.status(500).send('Error retrieving products (ᗒᗣᗕ)');
//   }
// });

// router.get('/:pid', async (req, res) => {
//   const idProduct = parseInt(req.params.pid);
//   if (isNaN(idProduct)) {
//     return res
//       .status(400)
//       .send('Invalid product ID ヽ(°〇°)ﾉ please try another.');
//   }
//   try {
//     const product = await manager.showProducts(idProduct);
//     if (!product) {
//       return res
//         .status(404)
//         .send('Product not found at this time (￢_￢) please try later.');
//     }
//     res.send(product);
//   } catch (error) {
//     res.status(500).send('Error retrieving product (ᗒᗣᗕ)');
//   }
// });

// router.post('/', async (req, res) => {
//   const {
//     title,
//     description,
//     code,
//     price,
//     status,
//     stock,
//     category,
//     thumbnails,
//   } = req.body;

//   if (
//     !title ||
//     !description ||
//     !code ||
//     price === undefined ||
//     stock === undefined ||
//     category === undefined
//   ) {
//     return res
//       .status(400)
//       .send('All fields are required except thumbnails ＼(〇_ｏ)／');
//   }

//   if (
//     typeof title !== 'string' ||
//     typeof description !== 'string' ||
//     typeof code !== 'string' ||
//     typeof price !== 'number' ||
//     typeof stock !== 'number' ||
//     typeof category !== 'string' ||
//     (thumbnails && !Array.isArray(thumbnails))
//   ) {
//     return res.status(400).send('Incorrect data types, please try again');
//   }

//   try {
//     await manager.createProducts({
//       title,
//       description,
//       code,
//       price,
//       status,
//       stock,
//       category,
//       thumbnails,
//     });
//     res.status(201).send('Product created correctly ＼(＾▽＾)／');
//   } catch (error) {
//     res.status(500).send('Product not created (ᗒᗣᗕ)');
//   }
// });

// router.put('/:pid', async (req, res) => {
//   const idProduct = parseInt(req.params.pid);
//   if (isNaN(idProduct)) {
//     return res.status(400).send('Invalid product ID');
//   }

//   const {
//     title,
//     description,
//     code,
//     price,
//     status,
//     stock,
//     category,
//     thumbnails,
//   } = req.body;

//   if (
//     (title && typeof title !== 'string') ||
//     (description && typeof description !== 'string') ||
//     (code && typeof code !== 'string') ||
//     (price !== undefined && typeof price !== 'number') ||
//     (stock !== undefined && typeof stock !== 'number') ||
//     (category !== undefined && typeof category !== 'number') ||
//     (thumbnails && !Array.isArray(thumbnails))
//   ) {
//     return res
//       .status(400)
//       .send('Incorrect data types, please enter the required ones');
//   }

//   try {
//     await manager.updateProducts(idProduct, req.body);
//     res.status(200).send('Product updated ＼(＾▽＾)／');
//   } catch (error) {
//     res.status(500).send('Product not updated (ᗒᗣᗕ)');
//   }
// });

// router.delete('/:pid', async (req, res) => {
//   const idProduct = parseInt(req.params.pid);
//   if (isNaN(idProduct)) {
//     return res.status(400).send('Invalid product ID (￢_￢;)');
//   }
//   try {
//     await manager.deleteProduct(idProduct);
//     res.status(200).send('Product deleted (´。＿。｀)');
//   } catch (error) {
//     res.status(500).send('Product not deleted <(￣ ﹌ ￣)>');
//   }
// });

// export default router;
//hasta aca fue la primera preentrega

// import { Router } from 'express';
// import { productsService } from '../managers/index.js';
// import uploader from '../service/uploader.js';
// import __dirname from '../utils.js';

// const router = Router();

// router.get('/', async (req, res) => {
//   const products = await manager.getProducts();
//   res.json(products);
// });

// router.get('/products/:pid',async(req,res)=>{
//   const product = await productsService.getProductById(req.params.vid);
//   if(!product){
//       return res.render("404");
//   }
//   res.render('realTimeProducts',{
//       product,
//       mainImage:product.thumbnails.find(thumbnail=>thumbnail.main)
//   })
// })

// router.post('/', uploader.array('thumbnails', 3), async (req, res) => {
//   console.log('Connected with product router :) ');
//   const product = req.body;
//   try {
//     const newProduct = {
//       title: product.title,
//       description: product.description,
//       code: product.code,
//       price: product.price,
//       stock: product.stock,
//       category: product.category,
//       thumbnails: [],
//     };
//     for (let i = 0; i < req.files.length; i++) {
//       newProduct.thumbnails.push({
//         mimetype: req.files[i].mimetype,
//         path: `/files/products/${req.files[i].filename}`,
//         main: i == 0,
//       });
//     }
//     const result = await productsService.createProduct(newProduct);
//     res.send({ status: 'success', payload: result });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .send({ status: 'error', message: 'Error creating the product' });
//   }
// });

// router.delete('/:pid', async (req, res) => {
//   const productId = parseInt(req.params.pid);
//   const deletedProduct = await manager.deleteProduct(productId);
//   if (deletedProduct) {
//     const io = getIO();
//     io.emit('remove-product', productId);
//     res.json(deletedProduct);
//   } else {
//     res.status(404).json({ error: 'Product not found' });
//   }
// });

// export default router;

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
    // Obtener el producto a eliminar
    const product = await productsService.getProductById(productId);
    if (!product) {
      return res
        .status(404)
        .send({ status: 'error', message: 'Product not found' });
    }

    // Eliminar imágenes asociadas
    product.thumbnails.forEach((thumbnail) => {
      const thumbnailPath = path.join(
        __dirname,
        '../../public',
        thumbnail.path
      );
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    });

    // Eliminar el producto
    await productsService.deleteProduct(productId);

    // Emitir evento de eliminación de producto
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
