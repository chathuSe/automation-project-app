
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let items = [];
let currentId = 1;

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123') {
    res.json({ token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = { id: currentId++, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  if (index > -1) {
    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.status(204).send();
});

app.listen(5000, () => console.log('Server running on port 5000'));
