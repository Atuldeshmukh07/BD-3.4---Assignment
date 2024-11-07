const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

//                      Shopping Cart Operations

// Endpoint 1: Add an Item to the Cart.
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
  { productId: 3, name: 'Computer', price: 92000, quantity: 2 },
];

app.get('/cart/add', (req, res) => {
  let newProduct = {
    productId: parseInt(req.query.productId),
    name: req.query.name,
    price: parseInt(req.query.price),
    quantity: parseInt(req.query.quantity),
  };
  cart.push(newProduct);
  res.json({ cart });
});

// Endpoint 2: Edit Quantity of an Item in the Cart.

function addQuantityOfAnItem(productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = addQuantityOfAnItem(productId, quantity);
  res.json(result);
});

// Endpoint 3: Delete an Item from the Cart.
function deleteProductId(cart, productId) {
  return cart.productId !== productId;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cart) => deleteProductId(cart, productId));
  res.json(result);
});

// Endpoint 4: Read Items in the Cart.
function readItems(cart) {
  return cart;
}

app.get('/cart', (req, res) => {
  let result = readItems(cart);
  res.json(cart);
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart.
function totalQuantityOfProducts(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = totalQuantityOfProducts(cart);
  res.json({ totalQuantity: result });
});

// Endpoint 6: Calculate Total Price of Items in the Cart.
function totalPriceOfAllProducts(cart) {
  totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let result = totalPriceOfAllProducts(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
