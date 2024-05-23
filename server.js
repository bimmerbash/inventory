const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_FILE = 'inventory.json';

app.use(bodyParser.json());
app.use(express.static('public'));

// Function to read the inventory from the file
const readInventory = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { inventoryNumber: 0 };
    }
};

// Function to write the inventory to the file
const writeInventory = (inventory) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(inventory), 'utf8');
};

// Endpoint to get the current inventory number
app.get('/api/inventory', (req, res) => {
    const inventory = readInventory();
    res.json(inventory);
});

// Endpoint to update the inventory number
app.post('/api/inventory', (req, res) => {
    const { inventoryNumber } = req.body;
    const inventory = { inventoryNumber };
    writeInventory(inventory);
    res.json(inventory);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
