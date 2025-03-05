require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const multer = require("multer");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require("./models/Product");

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving uploaded images
app.set('view engine', 'ejs');


// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Multer Configuration for File Upload
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Home Page Route (Fetch Products)
app.get("/", async (req, res) => {
    try {
        const category = req.query.category || "Office Essentials"; // Default to "Office Essentials"
        const products = await Product.find({ category }); // Fetch products for selected category
        res.render("index", { products, selectedCategory: category });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Add Product Route (Render Add Form)
app.get('/add-product', async (req, res) => {
    res.render('add');
});

app.get("/product/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Fetch product by ID
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render("single-product-affiliate", { product });
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/shop-4-column', async (req, res) => {
    try {
        const category = req.query.category || ""; // Get category from query params
        let query = {};

        if (category) {
            query.category = category; // Filter by category if selected
        }

        const products = await Product.find(query); // Fetch filtered or all products
        res.render('shop-4-column', { products, selectedCategory: category });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/mug', async (req, res) => {
    try {
        const mugs = await Product.find({ product_name: /mug/i }); // Fetch all products with "Mug" in the name
        res.render('mug', { products: mugs }); // Render the mug.ejs page with mug products
    } catch (err) {
        console.error("Error fetching mugs:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/flask', async (req, res) => {
    try {
        const flasks = await Product.find({ product_name: /flask/i }); // Case-insensitive search for "Flask"
        res.render('flask', { products: flasks });
    } catch (err) {
        console.error("Error fetching flasks:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Submit Product Form (Save to MongoDB)
app.post('/add-product', upload.single('image'), async (req, res) => {
    try {
        const { product_name, category, description, material, other_info, rate, weight, short_description, dimension } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const newProduct = new Product({
            product_name,
            category,
            description,
            material,
            other_info,
            image,
            rate,
            weight,
            short_description, // New field added
            dimension // New field added
        });

        await newProduct.save();
        if (product_name.toLowerCase().includes('mug')) {
            res.redirect(`/mug`); 
        }
        if (product_name.toLowerCase().includes('flask')) {
            return res.redirect('/flask'); 
        } 
         else {
            res.redirect('/'); 
        }
    } catch (err) {
        res.status(500).send('Error saving product');
    }
});


// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/404', (req, res) => {
    res.render('404');
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.get('/blog-grid', (req, res) => {
    res.render('blog-grid');
});

app.get('/blog-single', (req, res) => {
    res.render('blog-single');
});

app.get('/cart', (req, res) => {
    res.render('cart');
});

app.get('/check-out', (req, res) => {
    res.render('check-out');
});

app.get('/coming-soon', (req, res) => {
    res.render('coming-soon');
});

app.get('/compare', (req, res) => {
    res.render('compare');
});

app.get('/empty-cart', (req, res) => {
    res.render('empty-cart');
});

app.get('/faq', (req, res) => {
    res.render('faq');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/my-account', (req, res) => {
    res.render('my-account');
});

app.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy');
});

app.get('/shop-4-column', (req, res) => {
    res.render('shop-4-column');
});

app.get('/shop-left-sidebar', (req, res) => {
    res.render('shop-left-sidebar');
});

app.get('/single-product-affiliate', (req, res) => {
    res.render('single-product-affiliate');
});

app.get('/single-product-group', (req, res) => {
    res.render('single-product-group');
});

app.get('/single-product-variable', (req, res) => {
    res.render('single-product-variable');
});

app.get('/single-product', (req, res) => {
    res.render('single-product');
});

app.get('/wishlist', (req, res) => {
    res.render('wishlist');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on port 3000'));
