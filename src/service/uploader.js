// import multer from 'multer';
// import __dirname from '../utils.js';

// const storage = multer.diskStorage({
//     //Carpeta de destino
//     destination:function(req,file,cb){
//         let dinamicFolder;
//         switch(req.baseUrl){
//             case "/api/products":
//                 dinamicFolder = "products"
//         }
//         return cb(null,`${__dirname}/public/files/${dinamicFolder}`)
//     },
//     //El nombre final del archivo a cargar
//     filename: function(req,file,cb){
//         return cb(null,`${Date.now()}-${file.originalname}`)
//     }
// })

// const uploader = multer({storage});

// export default uploader;

// import multer from 'multer';
// import __dirname from '../utils.js';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let dinamicFolder;
//     switch (req.baseUrl) {
//       case "/api/products":
//         dinamicFolder = "products";
//         break;
//       // Puedes agregar más casos aquí para diferentes rutas
//       default:
//         dinamicFolder = "uploads";
//     }
//     cb(null, `${__dirname}/public/files/${dinamicFolder}`);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const uploader = multer({ storage });

// export default uploader;


import fs from 'fs';
import multer from 'multer';
import __dirname from '../utils.js';

const ensureDirectoryExistence = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dinamicFolder;
    switch (req.baseUrl) {
      case "/api/products":
        dinamicFolder = "products";
        break;
      default:
        dinamicFolder = "uploads";
    }
    const dirPath = `${__dirname}/public/files/${dinamicFolder}`;
    ensureDirectoryExistence(dirPath);
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploader = multer({ storage });

export default uploader;
