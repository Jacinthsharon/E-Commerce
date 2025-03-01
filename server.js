const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, Images)
app.use(express.static('public'));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
