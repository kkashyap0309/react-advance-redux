import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const PORT = 4000;

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/cart', async (req, res) => {
  const fileContent = await fs.readFile('./data/user-cart.json');

  const cartData = JSON.parse(fileContent);

  res.status(200).json({ cart: cartData });
});

// app.get('/user-places', async (req, res) => {
//   const fileContent = await fs.readFile('./data/user-places.json');

//   const places = JSON.parse(fileContent);

//   res.status(200).json({ places });
// });

app.put('/user-cart-product', async (req, res) => {
  const cart = req.body.cart;

  await fs.writeFile('./data/user-cart.json', JSON.stringify(cart));

  res.status(200).json({ message: 'cart updated!' });
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(PORT, () => {
  console.log(`App Started on Port ${PORT}`);
});
