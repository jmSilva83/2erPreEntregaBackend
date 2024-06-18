// import multer from 'multer';
// import __dirname from '../utils.js';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let dinamicFolder;
//     switch (req.baseUrl) {
//       case '/api/products':
//         dinamicFolder = 'products';
//     }
//     return cb (null,`${__dirname}/public/files/${dinamicFolder}`);
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const uploader = multer({ storage });

// export default uploader;

import multer from 'multer';
import path from 'path';
import __dirname from '../utils.js';
import { productsService } from '../managers/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dynamicFolder;
    switch (req.baseUrl) {
      case '/api/products':
        dynamicFolder = 'products';
        break;
      // Add other cases for different routes if needed
    }
    return cb(null, path.join(__dirname, '/public/files/', dynamicFolder));
  },
  filename: async function (req, file, cb) {
    const productId = req.body.productId || req.params.productId;
    const productName = await productsService.getProductById(productId);

    const originalFilename = file.originalname;
    const combinedFilename = `${productName}-${originalFilename}`;

    return cb(null, combinedFilename);
  },
});

const uploader = multer({ storage });

export default uploader;
