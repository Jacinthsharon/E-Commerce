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

// Route for "Water Bottle" products
app.get('/water-bottle', async (req, res) => {
    try {
        const waterBottles = await Product.find({ product_name: /water bottle/i }); // Case-insensitive search
        res.render('water-bottle', { products: waterBottles });
    } catch (err) {
        console.error("Error fetching water bottles:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Sipper" products
app.get('/sipper', async (req, res) => {
    try {
        const sippers = await Product.find({ product_name: /sipper/i }); // Case-insensitive search
        res.render('sipper', { products: sippers });
    } catch (err) {
        console.error("Error fetching sippers:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Trophy" products under Awards category
app.get('/trophy', async (req, res) => {
    try {
        const trophies = await Product.find({ product_name: /trophy/i }); // Case-insensitive search
        res.render('trophy', { products: trophies });
    } catch (err) {
        console.error("Error fetching trophies:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Award" products
app.get('/awards', async (req, res) => {
    try {
        const awards = await Product.find({ product_name: /award/i }); // Case-insensitive search
        res.render('awards', { products: awards });
    } catch (err) {
        console.error("Error fetching awards:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Certificate" products
app.get('/certificate', async (req, res) => {
    try {
        const certificates = await Product.find({ product_name: /certificate/i }); // Case-insensitive search
        res.render('certificate', { products: certificates });
    } catch (err) {
        console.error("Error fetching certificates:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Badge" products
app.get('/badge', async (req, res) => {
    try {
        const badges = await Product.find({ product_name: /badge/i }); // Case-insensitive search
        res.render('badge', { products: badges });
    } catch (err) {
        console.error("Error fetching badges:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Eco-Friendly" products
app.get('/eco-friendly', async (req, res) => {
    try {
        const ecoProducts = await Product.find({ product_name: /eco-friendly/i }); // Case-insensitive search
        res.render('eco-friendly', { products: ecoProducts });
    } catch (err) {
        console.error("Error fetching eco-friendly products:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "T-Shirt" products
app.get('/t-shirt', async (req, res) => {
    try {
        const tshirts = await Product.find({ product_name: /t-shirt/i }); // Case-insensitive search
        res.render('t-shirt', { products: tshirts });
    } catch (err) {
        console.error("Error fetching t-shirts:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Cap" products
app.get('/cap', async (req, res) => {
    try {
        const caps = await Product.find({ product_name: /cap/i }); // Case-insensitive search
        res.render('cap', { products: caps });
    } catch (err) {
        console.error("Error fetching caps:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Pen Drive" products
app.get('/pendrive', async (req, res) => {
    try {
        const pendrives = await Product.find({ product_name: /pen\s?drive/i }); // Case-insensitive search for 'Pen Drive' or 'Pendrive'
        res.render('pendrive', { products: pendrives });
    } catch (err) {
        console.error("Error fetching pen drives:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Headphone" products
app.get('/headphone', async (req, res) => {
    try {
        const headphones = await Product.find({ product_name: /headphone/i }); // Case-insensitive search
        res.render('headphone', { products: headphones });
    } catch (err) {
        console.error("Error fetching headphones:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Power Bank" products
app.get('/power-bank', async (req, res) => {
    try {
        const powerBanks = await Product.find({ product_name: /power bank/i }); // Case-insensitive search
        res.render('power-bank', { products: powerBanks });
    } catch (err) {
        console.error("Error fetching power banks:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Earbuds" products
app.get('/earbuds', async (req, res) => {
    try {
        const earbuds = await Product.find({ product_name: /earbuds/i }); // Case-insensitive search
        res.render('earbuds', { products: earbuds });
    } catch (err) {
        console.error("Error fetching earbuds:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Mobile Stand" products
app.get('/mobile-stand', async (req, res) => {
    try {
        const mobileStands = await Product.find({ product_name: /mobile stand/i }); // Case-insensitive search
        res.render('mobile-stand', { products: mobileStands });
    } catch (err) {
        console.error("Error fetching mobile stands:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Gift Hamper" products
app.get('/gift-hamper', async (req, res) => {
    try {
        const giftHampers = await Product.find({ product_name: /gift hamper/i }); // Case-insensitive search
        res.render('gift-hamper', { products: giftHampers });
    } catch (err) {
        console.error("Error fetching gift hampers:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Coaster" products
app.get('/coasters', async (req, res) => {
    try {
        const coasters = await Product.find({ product_name: /coaster/i }); // Case-insensitive search
        res.render('coasters', { products: coasters });
    } catch (err) {
        console.error("Error fetching coasters:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Key Chains" products
app.get('/key-chains', async (req, res) => {
    try {
        const keyChains = await Product.find({ product_name: /key\s?chain/i }); // Case-insensitive search
        res.render('key-chains', { products: keyChains });
    } catch (err) {
        console.error("Error fetching key chains:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Wall Art" products
app.get('/wall-art', async (req, res) => {
    try {
        const wallArtProducts = await Product.find({ product_name: /wall art/i }); // Case-insensitive search
        res.render('wall-art', { products: wallArtProducts });
    } catch (err) {
        console.error("Error fetching wall art:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Frames" products
app.get('/frames', async (req, res) => {
    try {
        const frames = await Product.find({ product_name: /frame/i }); // Case-insensitive search
        res.render('frames', { products: frames });
    } catch (err) {
        console.error("Error fetching frames:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Clock" products
app.get('/clocks', async (req, res) => {
    try {
        const clocks = await Product.find({ product_name: /clock/i }); // Case-insensitive search
        res.render('clocks', { products: clocks });
    } catch (err) {
        console.error("Error fetching clocks:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Diary" products
app.get('/diary', async (req, res) => {
    try {
        const diaries = await Product.find({ product_name: /diary/i }); // Case-insensitive search
        res.render('diary', { products: diaries });
    } catch (err) {
        console.error("Error fetching diaries:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Notes" products
app.get('/notes', async (req, res) => {
    try {
        const notes = await Product.find({ product_name: /notes/i }); // Case-insensitive search
        res.render('notes', { products: notes });
    } catch (err) {
        console.error("Error fetching notes:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Planners" products
app.get('/planners', async (req, res) => {
    try {
        const planners = await Product.find({ product_name: /planner/i }); // Case-insensitive search
        res.render('planners', { products: planners });
    } catch (err) {
        console.error("Error fetching planners:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Visiting Cards" products
app.get('/visiting-cards', async (req, res) => {
    try {
        const visitingCards = await Product.find({ product_name: /visiting card/i }); // Case-insensitive search
        res.render('visiting-cards', { products: visitingCards });
    } catch (err) {
        console.error("Error fetching visiting cards:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Name Boards" products
app.get('/name-boards', async (req, res) => {
    try {
        const nameBoards = await Product.find({ product_name: /name board/i }); // Case-insensitive search
        res.render('name-boards', { products: nameBoards });
    } catch (err) {
        console.error("Error fetching name boards:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "ID Cards" products
app.get('/id-cards', async (req, res) => {
    try {
        const idCards = await Product.find({ product_name: /id card/i }); // Case-insensitive search
        res.render('id-cards', { products: idCards });
    } catch (err) {
        console.error("Error fetching ID cards:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Pens" products
app.get('/pens', async (req, res) => {
    try {
        const pens = await Product.find({ product_name: /pen/i }); // Case-insensitive search
        res.render('pens', { products: pens });
    } catch (err) {
        console.error("Error fetching pens:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Paper Weight" products
app.get('/paper-weight', async (req, res) => {
    try {
        const paperWeights = await Product.find({ product_name: /paper weight/i }); // Case-insensitive search
        res.render('paper-weight', { products: paperWeights });
    } catch (err) {
        console.error("Error fetching paper weights:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Route for "Key Holders" products
app.get('/key-holders', async (req, res) => {
    try {
        const keyHolders = await Product.find({ product_name: /key holder/i }); // Case-insensitive search
        res.render('key-holders', { products: keyHolders });
    } catch (err) {
        console.error("Error fetching key holders:", err);
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
        if (product_name.toLowerCase().includes('water bottle')) {
            return res.redirect('/water-bottle'); 
        }
        if (product_name.toLowerCase().includes('sipper')) {
            return res.redirect('/sipper'); 
        }
        if (product_name.toLowerCase().includes('trophy')) {
            return res.redirect('/trophy'); 
        }
        if (product_name.toLowerCase().includes('award')) {
            return res.redirect('/awards'); 
        }
        if (product_name.toLowerCase().includes('certificate')) {
            return res.redirect('/certificate'); 
        }
        if (product_name.toLowerCase().includes('badge')) {
            return res.redirect('/badge'); 
        }
        if (product_name.toLowerCase().includes('eco-friendly')) {
            return res.redirect('/eco-friendly'); 
        }
        if (product_name.toLowerCase().includes('t-shirt')) {
            return res.redirect('/t-shirt'); 
        }
        if (product_name.toLowerCase().includes('cap')) {
            return res.redirect('/cap'); 
        }
        if (product_name.toLowerCase().includes('pendrive')) {
            return res.redirect('/pendrive'); 
        }
        if (product_name.toLowerCase().includes('headphone')) {
            return res.redirect('/headphone'); 
        }
        if (product_name.toLowerCase().includes('power bank')) {
            return res.redirect('/power-bank'); 
        }
        if (product_name.toLowerCase().includes('earbuds')) {
            return res.redirect('/earbuds'); 
        }
        if (product_name.toLowerCase().includes('mobile stand')) {
            return res.redirect('/mobile-stand'); 
        }
        if (product_name.toLowerCase().includes('gift hamper')) {
            return res.redirect('/gift-hamper'); 
        }
        if (product_name.toLowerCase().includes('coaster')) {
            return res.redirect('/coasters'); 
        }
        if (product_name.toLowerCase().includes('keychain')) {
            return res.redirect('/key-chains'); 
        }
        if (product_name.toLowerCase().includes('wall art')) {
            return res.redirect('/wall-art'); 
        }
        if (product_name.toLowerCase().includes('frame')) {
            return res.redirect('/frames'); 
        }
        if (product_name.toLowerCase().includes('clock')) {
            return res.redirect('/clocks'); 
        }
        if (product_name.toLowerCase().includes('diary')) {
            return res.redirect('/diary'); 
        }
        if (product_name.toLowerCase().includes('planner')) {
            return res.redirect('/planners'); 
        }
        if (product_name.toLowerCase().includes('visiting card')) {
            return res.redirect('/visiting-cards'); 
        }
        if (product_name.toLowerCase().includes('name board')) {
            return res.redirect('/name-boards'); 
        }
        if (product_name.toLowerCase().includes('id card')) {
            return res.redirect('/id-cards'); 
        }
        if (product_name.toLowerCase().includes('pen')) {
            return res.redirect('/pens'); 
        }
        if (product_name.toLowerCase().includes('paper weight')) {
            return res.redirect('/paper-weight'); 
        }
        if (product_name.toLowerCase().includes('key holder')) {
            return res.redirect('/key-holders'); 
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
