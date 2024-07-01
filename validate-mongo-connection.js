const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://anthonysu6206026:LpWRFwbGGNdQ6dSk@nextjsauthentication.mmnjfgm.mongodb.net/?retryWrites=true&w=majority&";

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("nextjsauthentication");
    const users = await db.collection('users').find().toArray();
    console.log(users);
  } catch (err) {
    console.error("Connection failed", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
