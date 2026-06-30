const Product = require("../models/Products"); 

// SHOW ALL PRODUCTS
const getAllProductsPage = async (req, res) => {
    try {
        const searchQuery = req.query.search || "";

        let filter = {};

        if (searchQuery) {
            filter = {
                name: {
                    $regex: searchQuery,
                    $options: "i"
                }
            };
        }

        const products = await Product.find(filter);

        res.render("products", {
            products,
            searchQuery
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        await Product.create(req.body);
        res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// EDIT PAGE
const getEditProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.render("edit-product", { product });

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {

        await Product.findByIdAndUpdate(req.params.id, req.body);

        res.redirect("/dashboard");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.params.id);

        res.redirect("/dashboard");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

module.exports = {
    getAllProductsPage,
    createProduct,
    getEditProductPage,
    updateProduct,
    deleteProduct
};