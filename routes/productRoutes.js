const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/auth");

const {
    getAllProductsPage,
    createProduct,
    getEditProductPage,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// Products page
router.get("/", getAllProductsPage);

// Add product
router.post("/add", isAdmin, createProduct);

// Edit page
router.get("/edit/:id", isAdmin, getEditProductPage);

// Update product
router.post("/update/:id", isAdmin, updateProduct);

// Delete product
router.get("/delete/:id", isAdmin, deleteProduct);

module.exports = router;