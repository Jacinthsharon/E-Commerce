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
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
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

// Submit Product Form (Save to MongoDB)
app.post('/add-product', upload.single('image'), async (req, res) => {
    try {
        const { product_name, category, description, material, other_info, rate, weight } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const newProduct = new Product({
            product_name,
            category,
            description,
            material,
            other_info,
            image,
            rate,  // Added rate field
            weight // Added weight field
        });

        await newProduct.save();
        res.redirect('/'); // Redirect to home page to show updated products
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
