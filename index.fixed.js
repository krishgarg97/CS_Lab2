const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let users = [{ id: 1, name: 'alice', balance: 1000 }];
let products = [{ id: 1, name: 'Gadget', price: 100 }];
let orders = [];

app.get('/balance', (req, res) => res.json(users[0]));
app.get('/products', (req, res) => res.json(products));
app.get('/orders', (req, res) => res.json(orders));

// Utility: reset demo data to initial state (helpful for repeated demos)
app.get('/reset', (req, res) => {
  users = [{ id: 1, name: 'alice', balance: 1000 }];
  products = [{ id: 1, name: 'Gadget', price: 100 }];
  orders = [];
  res.json({ success: true, balance: users[0] });
});

app.post('/purchase', (req, res) => {
  const { productId, quantity } = req.body;
  const q = parseInt(quantity, 10);
  const product = products.find(p => p.id === Number(productId));
  if (!product) return res.status(400).json({ error: 'product not found' });
  // FIX: validate quantity is a positive integer
  if (!Number.isInteger(q) || q <= 0) {
    return res.status(400).json({ error: 'quantity must be a positive integer' });
  }
  const amount = product.price * q;
  users[0].balance -= amount;
  const order = { id: orders.length + 1, productId: product.id, quantity: q, amount };
  orders.push(order);
  res.json({ success: true, order, balance: users[0].balance });
});

app.listen(3000, () => console.log('Fixed server running on http://localhost:3000'));
