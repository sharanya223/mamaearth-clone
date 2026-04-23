const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/login");
const Product = require("./models/product");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const multer = require("multer");
const Cart = require("./models/cart");
const Order = require("./models/order");
//const order = require("./models/order");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
  
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("KEY:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET:", process.env.RAZORPAY_SECRET);

const app = express();//creating express server and store it in variable app
app.use(cors());//aloww frontend to send requests communication
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//multer configuration


{/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});*/}
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "avif"],
  },
});

const upload = multer({ storage });


{/*const upload = multer({ storage: storage });*/}

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,

});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));
// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",//use gmails smtp server to send email connect to gmails mail server to send otp
  auth: { //authetication to send email 
    user: "sharanyar716@gmail.com",
    pass: "pada bhzv excn jwqz",
  },
});

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });

    const otp = generateOTP();//generate otp
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);//valid for 10 minutes

    // If user does not exist = create new
    if (!user) {//if user does not exist then create 
      user = new User({
        email,
        otp,
        otpExpiry,
        isVerified: false
      });
    } else {//already exists then get new otp
      user.otp = otp;
      user.otpExpiry = otpExpiry;
    }

    await user.save();//save otp in mongo

    await transporter.sendMail({//sending otp
      from: "sharanyar716@gmail.com",
      to: email,
      subject: "Your OTP for Login",
      text: `Your OTP is: ${otp}`,
    });

    res.json({
      message: "OTP sent to email!",
      alreadyRegistered: !!(user.firstName && user.lastName),
    });

  } catch (error) {
  console.log("SEND OTP ERROR:", error);
  res.status(500).json({ message: "Error sending OTP" });
}
});


// VERIFY OTP
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });//find user

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpiry < new Date())
      return res.status(400).json({ message: "OTP expired" });

    user.isVerified = true;
    user.otp = undefined;//removed after verification
    user.otpExpiry = undefined;

    await user.save();//save changes 

    res.json({
      message: "OTP Verified Successfully!",
      alreadyRegistered: !!(user.firstName && user.lastName),
      user: user
    });//existing-home or sighnup

  } catch (error) {
    res.status(500).json({ message: "OTP verification failed", error });
  }
});  






// SAVE SIGNUP DETAILS
app.post("/save-user-details", async (req, res) => {
  try {
    const { firstName, lastName, email, referral } = req.body;

    // Update existing user (created during send-otp)
    await User.findOneAndUpdate(
      { email },
      { firstName, lastName, referral, isVerified: true },
      { new: true }//return the updated document
    );

    res.json({ message: "User details saved successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Error saving user details", error });
  }
});



app.post("/save-product-details", upload.single("image"), async (req, res) => {

  try {

    const { name, quantity, price, category, description, rating, reviews } = req.body;

    const image = req.file.path;

    const product = new Product({
      name,
      quantity,
      price,
      category,
      description,
      image,
      rating,
      reviews
    });

    await product.save();

    res.json({ message: "Product saved successfully!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving product details" });
  }

});

//manage-products
  app.get("/manage-products", async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({ message: "Error fetching products" });

  }

});


app.delete("/delete-product/:id", async (req, res) => {

  try {

    const id = req.params.id;

    await Product.findByIdAndDelete(id);

    res.json({ message: "Product deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: "Error deleting product" });

  }

});

//update product code
//app.get('/manage-pro', (req, res) => {
  //ProductModel.find({})
  //.then(product => res.json(product))
  //.catch(err => res.json(err))
//})

app.get('/get-Product/:id', (req, res) => {

  const id = req.params.id;

  Product.findById(id)
    .then(product => res.json(product))
    .catch(err => res.json(err));

});



app.put('/update-products/:id', upload.single("image"), async (req, res) => {

  try {

    const id = req.params.id;

    let updatedData = {
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description
    };

    // if new image uploaded
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    res.json(product);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Error updating product" });

  }

});
app.post("/add-to-cart", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    // If cart doesn't exist create new
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity: 1 }]
      });
    } else {
     
      const existingProduct = cart.products.find(
        item => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    }

    await cart.save();

    res.json({ message: "Product added to cart", cart });

  } catch (err) {
    res.status(500).json(err);
  }
});
app.get("/get-cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId })
      .populate("products.productId"); // fetch full product details

    if (!cart) {
      return res.json({ products: [] });
    }

    res.json(cart);

  } catch (err) {
    res.status(500).json(err);
  }
});
app.put("/update-cart", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    const itemIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.products[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.json({ message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/remove-from-cart", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    await cart.save();

    res.json({ message: "Item removed", cart });
  } catch (err) {
    res.status(500).json(err);
  }
});
app.post("/checkout", async (req, res) => {
  try {
    const { userId, products, isBuyNow, paymentMethod, address, totalAmount, paymentId } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products" });
    }

    const formattedProducts = products.map((item) => ({
 productId: item.productId._id ? item.productId._id : item.productId,
name: item.productId.name || item.name,
  quantity: item.quantity,
}));

    const newOrder = new Order({
      userId,
      products: formattedProducts,
      totalAmount,
      address,
      paymentMethod,
      paymentId
    });

    await newOrder.save();

    const cart = await Cart.findOne({ userId });

    if (cart) {
      if (isBuyNow) {
       const orderedIds = products.map((p) =>
  p.productId._id
    ? p.productId._id.toString()
    : p.productId.toString()
);

        cart.products = cart.products.filter(
          (item) =>
            !orderedIds.includes(item.productId.toString())
        );
      } else {
        cart.products = [];
      }

      await cart.save();
    }

    res.json({ message: "Order placed", order: newOrder });

  } catch (err) {
    console.log("CHECKOUT ERROR:", err);
    res.status(500).json(err);
  }
});

//manage order
app.get("/manage-order", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.productId");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

//delete order
app.delete("/delete-order/:id", async (req, res) => {

  try {

    const id = req.params.id;

    await Order.findByIdAndDelete(id);

    res.json({ message: "Order deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: "Error deleting order" });

  }

});


app.get("/get-order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.productId");

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order" });
  }
});


app.put("/update-order/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { productIndex, quantity, status, paymentMethod } = req.body;

    const order = await Order.findById(id).populate("userId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    
    if (quantity !== undefined && productIndex !== undefined) {
      order.products[productIndex].quantity = quantity;
    }

    
    if (paymentMethod) {
      order.paymentMethod = paymentMethod;
    }

   
    if (status && status !== order.status) {
      order.status = status;

      await transporter.sendMail({
        from: "sharanyar716@gmail.com",
        to: order.userId.email,
        subject: "Order Status Update",
        text: `Your order is now ${status}`,
      });
    }

    await order.save();

    res.json({ message: "Order updated successfully", order });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating order" });
  }
});

//search product
app.get("/search/:key", async (req, res) => {
  try {
    const rawKey = req.params.key.toLowerCase().trim();

    const formattedKey = rawKey.replace(/\s+/g, "-");

    const result = await Product.find({
      $or: [
        { category: formattedKey }, 
        { category: rawKey },        
      ]
    });

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/category/:cat", async (req, res) => {
  try {
    const result = await Product.find({
      category: req.params.cat
    });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

 /*onst id = req.params.id;

  Product.findById(id)
    .then(product => res.json(product))
    .catch(err => res.json(err));

});*/
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    console.log("RAZORPAY ERROR:", err);
    res.status(500).json({ message: "Error creating order" });
  }
});
//verify api
app.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData
    } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

   
    const formattedProducts = orderData.products.map((item) => ({
      productId: item.productId._id ? item.productId._id : item.productId,
name: item.productId.name || item.name,
      quantity: item.quantity,
    }));

    const newOrder = new Order({
      userId: orderData.userId,
      products: formattedProducts,
      totalAmount: orderData.totalAmount,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      paymentId: razorpay_payment_id,
    });

    await newOrder.save();

    res.json({ message: "Payment verified & order saved" });

  } catch (err) {
    console.log("VERIFY ERROR:", err);
    res.status(500).json({ message: "Verification failed" });
  }
});

app.listen(5000, () =>
  console.log("Server running on port 5000")
);

