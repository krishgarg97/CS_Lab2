const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory demo data
let users = [{ id: 1, name: 'alice', balance: 1000 }];
let products = [{ id: 1, name: 'Gadget', price: 100 }];
let orders = [];

app.get('/balance', (req, res) => res.json(users[0]));
app.get('/products', (req, res) => res.json(products));
app.get('/orders', (req, res) => res.json(orders));

app.post('/purchase', (req, res) => {
  const { productId, quantity } = req.body;
  const q = parseInt(quantity, 10);
  const product = products.find(p => p.id === Number(productId));
  if (!product) return res.status(400).json({ error: 'product not found' });
  const amount = product.price * q;
  // BUSINESS-LOGIC FLAW: no check that quantity is positive
  users[0].balance -= amount;
  const order = { id: orders.length + 1, productId: product.id, quantity: q, amount };
  orders.push(order);
  res.json({ success: true, order, balance: users[0].balance });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
