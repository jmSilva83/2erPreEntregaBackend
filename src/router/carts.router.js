// import { Router } from 'express';
// import CartManager from '../managers/CartManager.js';

// const router = Router();
// const manager = new CartManager();

// router.get('/:cid', async (req, res) => {
//   const cartId = parseInt(req.params.cid);
//   if (isNaN(cartId)) {
//     return res
//       .status(400)
//       .send('Invalid cart ID ヽ(°〇°)ﾉ please try another.');
//   }

//   try {
//     const productCart = await manager.showProductCart(cartId);
//     if (!productCart) {
//       return res
//         .status(404)
//         .send('Product Cart not found at this time (￢_￢)');
//     }
//     res.send(productCart);
//   } catch (error) {
//     res.status(500).send('Error retrieving product cart (ᗒᗣᗕ)');
//   }
// });

// router.post('/', async (req, res) => {
//   const { productId, quantity } = req.body;
//   if (!productId || typeof quantity !== 'number') {
//     return res.status(400).send('Product and quantity are required (⊙_⊙)');
//   }

//   try {
//     const newCart = await manager.addProductCart({ productId, quantity });
//     res.status(201).send(newCart);
//   } catch (error) {
//     res.status(500).send('Product Cart not added (ᗒᗣᗕ)');
//   }
// });

// router.post('/:cid/product/:pid', async (req, res) => {
//   const { cid, pid } = req.params;
//   const { quantity } = req.body;
//   const cartId = parseInt(cid);
//   const productId = parseInt(pid);

//   if (
//     isNaN(cartId) ||
//     isNaN(productId) ||
//     !quantity ||
//     typeof quantity !== 'number'
//   ) {
//     return res.status(400).send('Invalid input data (⊙_⊙)');
//   }

//   try {
//     const cart = await manager.showProductCart(cartId);
//     if (!cart) {
//       return res.status(404).send('Cart not found (￢_￢)');
//     }

//     const productInCart = cart.products.find((p) => p.id === productId);
//     if (!productInCart) {
//       return res.status(400).send('Product not found in the cart (⊙_⊙)');
//     }

//     await manager.updateCart(cartId, productId, quantity);
//     res.status(200).send('Product Cart updated ＼(＾▽＾)／');
//   } catch (error) {
//     res.status(500).send('Product Cart not updated (ᗒᗣᗕ)');
//   }
// });

// export default router;
//hasta aca fue la primer preentrega

import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager();

router.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    if (isNaN(cartId)) {
        return res.status(400).send("Invalid cart ID");
    }
    try {
        const productCart = await manager.showProductCart(cartId);
        if (!productCart) {
            return res.status(404).send("Product Cart not found");
        }
        res.send(productCart);
    } catch (error) {
        res.status(500).send("Error retrieving product cart");
    }
});

router.post('/', async (req, res) => {
    const { product } = req.body;
    if (!product) {
        return res.status(400).send("Product is required to add to cart");
    }
    try {
        await manager.addProductCart(req.body);
        res.status(201).send("Product Cart added correctly");
    } catch (error) {
        res.status(500).send("Product Cart not added");
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cartId = parseInt(cid);
    const productId = parseInt(pid);
    if (isNaN(cartId) || isNaN(productId) || !quantity || typeof quantity !== "number") {
        return res.status(400).send("Invalid input data");
    }
    try {
        await manager.updateCart(cartId, productId, quantity);
        res.status(200).send("Product Cart updated");
    } catch (error) {
        res.status(500).send("Product Cart not updated");
    }
});

export default router;
