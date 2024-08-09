const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Sample data
let items = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' },
];

// Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Get a single item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});

// Create a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    item.name = req.body.name;
    res.json(item);
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
    items = items.filter(i => i.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
