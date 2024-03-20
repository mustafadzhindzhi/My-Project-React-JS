require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const UserModel = require('./models/Users.js');
const NewsModel = require('./models/News.js');
const CarBrandsModel = require('./models/carBrands.js');
const CarModel = require('./models/Cars.js');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/MyCar');

//register
app.post("/createUser", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if the email is already registered
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        // Hash and salt the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user with the hashed password
        const user = await UserModel.create({ email, username, password: hashedPassword });

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        res.json({ token });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
        res.json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//check for second same email
app.get("/checkEmail/:email", async (req, res) => {
    try {
        const { email } = req.params;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//news
app.get("/news", async (req, res) => {
    try {
        const news = await NewsModel.find();
        res.json(news);
    } catch (err) {
        console.log("Error fetching news:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//brand-model search
app.get("/carbrands", async (req, res) => {
    try {
        const carBrandsData = await CarBrandsModel.find({}, { _id: 0 });
        const carBrands = carBrandsData.map(brand => brand.brands);
        const modelsByBrand = carBrandsData.map(brand => brand.modelsByBrand);

        const result = {
            brands: carBrands.flat(),
            modelsByBrand: Object.assign({}, ...modelsByBrand)
        };

        res.json(result);
    } catch (err) {
        console.log("Error fetching car brands:", err);
        res.status(500).json({ message: 'Internal server error' });
    } 
});

//all cars
app.get("/cars", async (req, res) => {
    try {
        const cars = await CarModel.find();
        res.json(cars);
    } catch (err) {
        console.log("Error fetching cars:", err);
        res.status(500).json({ message: 'Internal server error' });
    } 
});

//one car
app.get('/cars/:_id', async (req, res) => {
    try {
        const carId = req.params._id;
        const car = await CarModel.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.json(car);
    } catch (error) {
        console.error("Error fetching car:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(3001, () => {
    console.log('Server is running');
});
