import mongoose from "mongoose";
import config from "../config/config.js";

const uri = config.mongoURI;

if (!uri) {
    console.error("MongoDB URI is not defined. Please check your .env file.");
    process.exit(1);
  }

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
};

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, options);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
  }
}

async function closeDatabase() {
    try {
        await mongoose.connection.close();
        console.log("Connection to MongoDB Atlas closed");
    } catch (error) {
        console.error("Error closing the connection to MongoDB Atlas:", error);
    }
}

export default { connectToDatabase, closeDatabase };
/* 
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://tanishashrivas01:mongoatlaspw@urlshortner.flpx2ib.mongodb.net/";

let client; // MongoDB client instance

async function connectToDatabase() {
    try {
        if (!client) {
            client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            console.log("Connected to MongoDB Atlas");
        }
        return client.db("UrlShortner-Data");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
        throw error;
    }
}

async function closeDatabase() {
    try {
        if (client) {
            await client.close();
            console.log("Connection to MongoDB Atlas closed");
        }
    } catch (error) {
        console.error("Error closing MongoDB connection:", error);
    }
}

export { connectToDatabase, closeDatabase };
*/
