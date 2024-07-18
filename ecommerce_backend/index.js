 
// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const Razorpay = require("razorpay");
// const app = express();

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 8080;

// // MONGODB CONNECTION
// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGODB_URL)
//     .then(() => console.log("Connected to database"))
//     .catch((err) => console.error("Error connecting to database:", err));

// // Razorpay Instance
// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // User Schema and Model
// const userSchema = mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     email: {
//         type: String,
//         unique: true,
//     },
//     password: String,
//     confirmpassword: String
// });

// const userModel = mongoose.model("user", userSchema);

// app.get("/", (req, res) => {
//     res.send("Server is running");
// });

// app.post("/signup", async (req, res) => {
//     console.log(req.body);
//     const { email } = req.body;
//     try {
//         const existingUser = await userModel.findOne({ email: email }).exec();
//         console.log(existingUser);
//         if (existingUser) {
//             return res.status(400).json({ message: "Email already registered", alert: false });
//         } else {
//             const newUser = new userModel(req.body);
//             await newUser.save();
//             return res.status(200).json({ message: "Signup successful", alert: true });
//         }
//     } catch (error) {
//         console.error("Error occurred while signing up:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// });

// app.post("/login", async (req, res) => {
//     const { email } = req.body;
//     const result = await userModel.findOne({ email: email }).exec();
//     if (result) {
//         const dataSend = {
//             _id: result._id,
//             firstName: result.firstName,
//             lastName: result.lastName,
//             email: result.email,
//         };
//         res.send({ message: "Login successfully", alert: true, data: dataSend });
//     } else {
//         res.send({ message: "Email is not available", alert: false });
//     }
// });

// const schemaProduct = mongoose.Schema({
//     name: String,
//     category: String,
//     image: String,
//     price: String,
//     description: String,
// });

// const ProductModel = mongoose.model("product", schemaProduct);

// app.post("/uploadProduct", async (req, res) => {
//     const data = await ProductModel(req.body);
//     const datasave = await data.save();
//     res.send({ message: "successful" });
//     console.log(req.body);
// });

// app.get("/product", async (req, res) => {
//     const data = await ProductModel.find({});
//     res.send(JSON.stringify(data));
// });

// const contactSchema = mongoose.Schema({
//     name: String,
//     email: String,
//     message: String
// });

// const Contact = mongoose.model("Contact", contactSchema);

// app.post("/contact", async (req, res) => {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//         return res.status(400).json({ message: "Please fill in all required fields." });
//     }

//     try {
//         const newContact = new Contact({ name, email, message });
//         await newContact.save();
//         res.status(200).json({ message: "Your message has been sent successfully!" });
//     } catch (error) {
//         console.error("Error saving contact message:", error);
//         res.status(500).json({ message: "Failed to send message. Please try again later." });
//     }
// });

// app.post("/create-razorpay-order", async (req, res) => {
//     try {
//         const { amount } = req.body;
//         const options = {
//             amount: amount * 100, // amount in the smallest currency unit (paise)
//             currency: "INR",
//             receipt: `receipt_${Date.now()}`
//         };
//         const order = await razorpayInstance.orders.create(options);
//         res.status(200).json(order);
//     } catch (error) {
//         console.error("Error creating Razorpay order:", error);
//         res.status(500).json({ message: "Error creating Razorpay order" });
//     }
// });

// app.listen(PORT, () => {
//     console.log("Server running on port " + PORT);
// });
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// MONGODB CONNECTION
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Error connecting to database:", err));

// Razorpay Instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// User Schema and Model
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmpassword: String
});

const userModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/signup", async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email }).exec();
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered", alert: false });
        } else {
            const newUser = new userModel(req.body);
            await newUser.save();
            return res.status(200).json({ message: "Signup successful", alert: true });
        }
    } catch (error) {
        console.error("Error occurred while signing up:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/login", async (req, res) => {
    const { email } = req.body;
    const result = await userModel.findOne({ email: email }).exec();
    if (result) {
        const dataSend = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
        };
        res.send({ message: "Login successfully", alert: true, data: dataSend });
    } else {
        res.send({ message: "Email is not available", alert: false });
    }
});

const schemaProduct = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

const ProductModel = mongoose.model("product", schemaProduct);

app.post("/uploadProduct", async (req, res) => {
    const data = await ProductModel(req.body);
    const datasave = await data.save();
    res.send({ message: "successful" });
    console.log(req.body);
});

app.get("/product", async (req, res) => {
    const data = await ProductModel.find({});
    res.send(JSON.stringify(data));
});

app.delete("/product/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        await ProductModel.findByIdAndDelete(productId);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product" });
    }
});

app.put("/product/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedData = req.body;
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updatedData, { new: true });
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product" });
    }
});

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model("Contact", contactSchema);

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Please fill in all required fields." });
    }

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(200).json({ message: "Your message has been sent successfully!" });
    } catch (error) {
        console.error("Error saving contact message:", error);
        res.status(500).json({ message: "Failed to send message. Please try again later." });
    }
});

app.post("/create-razorpay-order", async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Error creating Razorpay order" });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
