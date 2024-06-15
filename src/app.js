// import express from 'express';
// import productsRouter from './router/products.router.js';
// import cartsRouter from './router/carts.router.js';
// import __dirname from './utils.js';

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(express.json());

// app.use('/api/products', productsRouter);
// app.use('/api/carts', cartsRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
//hasta aca llega la preentrega 1

// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import { create } from 'express-handlebars';
// import productsRouter from './router/products.router.js';
// import cartsRouter from './router/carts.router.js';
// import viewsRouter from './router/views.router.js';
// import { initializeSocket } from './managers/socketManager.js';
// import __dirname from './utils.js';
// import path from 'path';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
// initializeSocket(io);

// const PORT = process.env.PORT || 8080;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const hbs = create({
//   extname: '.handlebars',
//   defaultLayout: 'main',
//   layoutsDir: path.join(__dirname, 'views/layouts'),
//   partialsDir: path.join(__dirname, 'views/partials'),
// });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/products', productsRouter);
// app.use('/api/carts', cartsRouter);
// app.use('/', viewsRouter);

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // src/app.js

// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import { create } from 'express-handlebars';
// import productsRouter from './router/products.router.js';
// import cartsRouter from './router/carts.router.js';
// import viewsRouter from './router/views.router.js';
// import { initializeSocket } from './managers/socketManager.js';
// import __dirname from './utils.js';
// import path from 'path';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
// initializeSocket(server);

// const PORT = process.env.PORT || 8080;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const hbs = create({
//     extname: '.handlebars',
//     defaultLayout: 'main',
//     layoutsDir: path.join(__dirname, 'views/layouts'),
//     partialsDir: path.join(__dirname, 'views/partials'),
// });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/products', productsRouter);
// app.use('/api/carts', cartsRouter);
// app.use('/', viewsRouter);

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './router/views.router.js';
import productsRouter from './router/products.router.js';
import cartsRouter from './router/carts.router.js';
import __dirname from './utils.js';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = new Server(server);

// Setup view engine
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

// Middleware setup
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next)=>{
  req.io = io;
  next();
})

// Routes setup
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

io.on('connection',socket=>{
  console.log("Socket conectado");
  })