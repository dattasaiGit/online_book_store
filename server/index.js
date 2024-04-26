const express = require('express');
const cors = require('cors');
const { MongoClient, GridFSBucket } = require('mongodb');
const razorpay = require('razorpay');
const multer = require('multer');
const { Readable } = require('stream');


const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient('mongodb+srv://admin:admin@cluster0.q2zogdl.mongodb.net/?retryWrites=true&w=majority');
client.connect();
const db = client.db('SDP');
const col = db.collection('Registration');
const bookCol = db.collection('Books');
const ordersCol = db.collection('Orders');
const cartCol = db.collection('Cart');
const salesCol = db.collection('sales'); 
const feedbackcol = db.collection('Feedback'); 
const gridFSBucket = new GridFSBucket(db);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });



app.get('/home', (req, res) => {
  res.send('It is a Home Page');
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await col.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json(user);
    // res.status(200).json({ message: 'Login successful', userRole: user.role }); 

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/register', async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;
    const existingUser = await col.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    await col.insertOne({ username, email, phoneNumber, password });
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/addbooks', async (req, res) => {
  try {
    const { title, author, price, genre, quantity, imageUrl } = req.body; 
    const existingBook = await bookCol.findOne({ title });

    if (existingBook) {
      return res.status(409).json({ error: 'Book already exists' });
    }
    await bookCol.insertOne({ title, author, price, genre, quantity, imageUrl }); 

    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/getbooks', async (req, res) => {
  try {
    const books = await bookCol.find().toArray();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/addToCart', async (req, res) => {
  try {
    const { book } = req.body;
    await cartCol.insertOne(book);
    res.status(201).json({ message: 'Book added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getcart', async (req, res) => {
  try {
    const cartItems = await cartCol.find().toArray();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getorders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await ordersCol.find({ userId: ObjectId(userId) }).toArray();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/placeorder', async (req, res) => {
  try {
    const { userId, books, totalPrice } = req.body;
    const order = {
      userId,
      books,
      totalPrice,
      date: new Date(), 
    };

    const result = await db.collection('Orders').insertOne(order);

    if (result.insertedCount === 1) {
      res.status(201).json({ message: 'Order placed successfully' });
    } else {
      res.status(500).json({ error: 'Failed to place order' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getorders', async (req, res) => {
  try {
    const orders = await ordersCol.find().toArray(); 
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/show', async (req,res)=>{
  var result= await col.find().toArray()
  res.send(result)
})


app.delete('/delete', async (req,res)=>{
  console.log(req.query.name)
  await col.deleteOne({name:req.query.name})
  res.send("deleted successfully")
})

app.delete('/deletebook', async (req,res)=>{
  console.log(req.query.title)
  await col.deleteOne({name:req.query.title})
  res.send("deleted successfully")
})

app.get('/admin/orders', async (req, res) => {
  try {
   const orders = await col.find({}).toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

app.post('/Changepassword', async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const user = await col.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (user.password !== oldPassword) {
      return res.status(401).json({ error: 'Invalid old password' });
    }
    await col.updateOne({ username }, { $set: { password: newPassword } });
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/admin/sales', async (req, res) => {
  try {
    const salesData = await salesCollection.find().toArray();
    res.json(salesData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/admin/popular-books', async (req, res) => {
  try {
    const popularBooksData = await popularBooksCollection.find().toArray();
    res.json(popularBooksData);
  } catch (error) {
    console.error('Error fetching popular books data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/Feedback', async (req, res) => {
  const { feedback, email } = req.body;
  await feedbackcol.insertOne({ email, feedback });
  console.log('Received feedback:', feedback);
  console.log('Submitted by:', email);
  res.send('Feedback submitted successfully!');
});

const nodemailer = require ("nodemailer")

app.post('/otpsender', (request, response) => {
  const gmailTransporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'yaswanthguntha7@gmail.com',
          pass: 'rohx rnqs cmbp uzxz'
      }
  });

  function generateOTP() {
      return Math.floor(Math.random() * 900000) + 100000;
  }

  const email = 'ganeshoggu04@gmail.com';
  const OTP = generateOTP();
  const otpMap = {};

  const mailOptions = {
      from: 'yaswanthguntha7@gmail.com.com',
      to: email,
      subject: 'Gallery App',
      html: `<p>OTP Verification for Forget Password</p><p>Your OTP is: <strong>${OTP}</strong></p>`
  };

  gmailTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          response.status(500).send('Error sending email through Gmail: ' + error.message);
      } else {
          otpMap[email] = OTP;
          response.status(200).json(OTP);
      }
  });
})

app.listen(8081, () => {
  console.log('Server Running on port 8081');
});
