const { MongoClient, ServerApiVersion, Collection } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
// pass yMmVDKEOXYjDiV96
// user blogDB
// middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())



const uri = "mongodb+srv://blogDB:yMmVDKEOXYjDiV96@cluster0.iuscecj.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const database = client.db("blogDB");
const blogCollection =database.collection('blogs')
const categoriesCollection =database.collection('blogCategory')


// blog CRUD
app.post('/v1/post-blog', async(req,res)=>{
  const blog = req.body;
  // console.log(blog);
  const result =await blogCollection.insertOne(blog)
  res.send(result)
})
app.get('/v1/categories',async(req,res)=>{
  const categories=  categoriesCollection.find();
  const result= await categories.toArray();
  res.send(result)
  
})
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("Blog server running...")
})
app.listen(port,(req,res)=>{
    console.log("server running on: ",port);
})