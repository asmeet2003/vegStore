require("dotenv").config();  

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// MONGODB CONNECTION
console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Error connecting to database:", err));
//schema
const userSchema=mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{
      type : String,
      unique : true,
    },
    password:String,
    confirmpassword:String
})
//model
const userModel=mongoose.model("user",userSchema)
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
            return res.status(400).json({ message: "Email already registered",alert:false});
        } else {
            const newUser = new userModel(req.body);
            await newUser.save();
            return res.status(200).json({ message: "Signup successful" ,alert:true});
        }
    } catch (error) {
        console.error("Error occurred while signing up:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
// API Login
// API Login
// API Login
app.post("/login", async (req, res) => {
  
  const {email}=req.body
  const result = await userModel.findOne({email:email}).exec()
    if(result){
        console.log(result)
        const dataSend={
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email:result.email,
                    
        };
        console.log(dataSend)
        res.send({message:"login successfully",alert:true,data:dataSend})
        
    }
    else{
        res.send({message:"Email is Id is Not Available",alert:false})

    }
  })
//product section
const schemaProduct=mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price:String,
    description:String,
});
const ProductModel =mongoose.model("product",schemaProduct)

//save product in database
//api
app.post("/uploadProduct",async(req,res)=>{
    const data=await ProductModel(req.body)
    const datasave=await data.save();

    res.send({message:"succesful"})
 
console.log(req.body)
})
//
app.get("/product",async(req,res)=>{
    const data= await ProductModel.find({})

    res.send(JSON.stringify(data))
})

  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

