const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
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
const wishlistCollection =database.collection('wishlist')
const commentsCollection =database.collection('comments')



// blog CRUD
app.post('/v1/post-blog', async(req,res)=>{
  const blog = req.body;
  // console.log(blog);
  const result =await blogCollection.insertOne(blog)
  res.send(result)
})
// post wishlist
app.post('/v1/post-wishlist', async(req,res)=>{
  const wishlist = req.body;
  const result = await wishlistCollection.insertOne(wishlist);
  res.send(result)

})
// post comment
app.post('/v1/post-comment', async(req, res)=>{
  const comment = req.body;
  const result = await commentsCollection.insertOne(comment);
  res.send()
})
app.get('/v1/categories',async(req,res)=>{
  const categories=  categoriesCollection.find();
  const result= await categories.toArray();
  res.send(result)
  
})
app.get('/v1/all-blogs',async(req,res)=>{
  const blogs = blogCollection.find();
  const result = await blogs.toArray()
  res.send(result)
})
// get blog details by id
app.get('/v1/blog-details/:id',async(req,res)=>{
  const id = req.params.id;
  const filter = {_id : new ObjectId(id)};
  const result = await blogCollection.findOne(filter)
  res.send(result)
})
// get wishlist
app.get('/v1/wishlist-by-user', async(req, res)=>{
const wishlist = wishlistCollection.find();
const result = await wishlist.toArray()
res.send(result) 
})
// get top ten features
app.get('/v1/top-ten-features',async(req, res)=>{
  const features = blogCollection.find();
  const result = await features.toArray();
  res.send(result)
})
// get comment-by-post
app.get('/v1/comment-by-post/:id',async(req,res)=>{
  const commentId = req.params.id;
  const filter = {id:commentId};
  const comments = commentsCollection.find(filter);
  const result = await comments.toArray()
  res.send(result)
})
// delete single wishlist
app.delete('/v1/wishlist-delete/:id', async(req,res)=>{
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)};
  const result = await wishlistCollection.deleteOne(filter);
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