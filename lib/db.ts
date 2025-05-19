declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient | null = null;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect().catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  });
}

const clientPromise = global._mongoClientPromise;

export default clientPromise;
