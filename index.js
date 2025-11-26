require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.MONGODB_URI;
// MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    console.log("Connected to MongoDB!");

    // SELECT database + collection
    const db = client.db("bmw-drivex");
    const carsCollection = db.collection("bmw-cars");

    // GET all cars
    app.get("/cars", async (req, res) => {
      try {
        const data = await carsCollection.find().toArray();
        res.send(data);
      } catch (err) {
        res.status(500).send({
          message: "Error fetching cars",
          error: err,
        });
      }
    });

  } catch (err) {
    console.log("DB Error:", err);
  }
}

run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send("BMW API Running...");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
