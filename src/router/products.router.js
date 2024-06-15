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
import __dirname from '../utils.js';

const router = Router();

router.get('/', async (req, res) => {
  const products = await productsService.getProducts();
  res.json(products);
});

router.get('/products/:pid', async (req, res) => {
  const product = await productsService.getProductById(parseInt(req.params.pid));
  if (!product) {
    return res.render("404");
  }
  res.render('realTimeProducts', {
    product,
    mainImage: product.thumbnails.find(thumbnail => thumbnail.main)
  });
});

router.post('/', uploader.array('thumbnails', 3), async (req, res) => {
  console.log('Connected with product router :) ');
  const product = req.body;
  try {
    const newProduct = {
      title: product.title,
      description: product.description,
      code: product.code,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
      category: product.category,
      thumbnails: []
    };
    for (let i = 0; i < req.files.length; i++) {
      newProduct.thumbnails.push({
        mimetype: req.files[i].mimetype,
        path: `/files/products/${req.files[i].filename}`,
        main: i === 0
      });
    }
    const result = await productsService.createProduct(newProduct); // Aquí se crea el producto
    res.send({ status: 'success', payload: result });
  } catch (error) {
    console.log('Error creating the product:', error.message);
    res.status(500).send({ status: 'error', message: 'Error creating the product' });
  }
});


router.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const deletedProduct = await productsService.deleteProduct(productId);
  if (deletedProduct) {
    const io = getIO();
    io.emit('remove-product', productId);
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

export default router;
