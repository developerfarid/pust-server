const express = require('express')
const app = express()
const cors = require("cors")
const ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000
require("dotenv").config();

app.use(cors())
app.use(express.json())
const uri = "mongodb+srv://pjunction:WeArePlanners121@cluster0.aesaf.mongodb.net/urp?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.doqsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);


async function run() {
  try {
    await client.connect();
    const database = client.db('urp');
    const productCollection = database.collection('semister11');
    const usersCollection = database.collection('users');


    app.post("/semister11", async (req, res) => {
      const result = await productCollection.insertOne(req.body)
      res.json(result)
    })

    app.post("/users", async (req, res) => {
      const result = await usersCollection.insertOne(req.body)
      res.json(result)
    })

    app.put("/users/:id", async (req, res) => {
      console.log("okkkk");
      const id = req.params.id
      console.log(req.body, req.params.id);
      // const bd = req.body.add
      const fillter = { _id: ObjectId(id) }
      const options = { upsert: true };
      const updateSet = {$set:{add:req.body.add}}
      const result = await usersCollection.updateOne(fillter, updateSet, options)
      res.json(result)
    })

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email
      const query = usersCollection.find({Email :email })
        const result = await query.toArray()
        res.send(result)
      })
    app.get("/users", async (req, res) => {
      
      const result = await usersCollection.find({}).toArray();
      res.send(result)
    })

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id
      console.log(id,"ppp");
      const query = {_id: ObjectId(id)};
      const ress=await usersCollection.findOne(query)
      res.send(ress)
   

  })

//   app.put('/users/admin',  async (req, res) => {
//     const user = req.body;

//             const filter = { email: user.email };
//             const updateDoc = { $set: { role: 'admin' } };
//             const result = await usersCollection.updateOne(filter, updateDoc);
//             res.json(result);
//  })


  

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//visit localhost:3000
// assuming you have done 1) npm init 2) npm install express



// Replace the uri string with your MongoDB deployment's connection string.

