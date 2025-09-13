// src/app/api/mongodb/mongoClient.js
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Mahir122105:Mahir1221@cluster0.kdlpk.mongodb.net/test";
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
