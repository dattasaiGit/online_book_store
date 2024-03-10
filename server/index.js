const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const razorpay = require('razorpay');

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

app.get('/home', (req, res) => {
  res.send('It is a Home Page');
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;
    const existingUser = await col.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    await col.insertOne({username,email,phoneNumber,password,});
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await col.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/addbooks', async (req, res) => {
  try {
    const { title, author, price, genre, quantity } = req.body;
    const existingBook = await bookCol.findOne({ title });

    if (existingBook) {
      return res.status(409).json({ error: 'Book already exists' });
    }
    await bookCol.insertOne({ title, author, price, genre, quantity });

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

app.post('/changepassword', async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const user = await col.findOne({ username });
    if (!user || user.password !== oldPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
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

app.listen(8081, () => {
  console.log('Server Running on port 8081');
});
