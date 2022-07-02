import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const dbn = process.env.MONGODB_NAME;
let conn = global.conn;
export default async () => {
  if (conn) {
    console.log("mongodb cache");
    return conn;
  }
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("mongodb fresh");
    return global.conn = conn = client.db(dbn);
  } catch (err) {
    throw new Error(err);
  }
}