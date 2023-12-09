const { MongoClient } = require("mongodb");

let db;
const client = new MongoClient(process.env.MONGODB_CONNECTION);

const COLLECTIONS = {
  streamlinedtitles: "streamlinedtitles",
  characters: "characters",
  users: "users",
}

const getCollection = async (collection) => {
  if (!db) {
    db = await client.connect().then((createdClient) => {
      return createdClient.db("spoilerproof")
    });
  }
  return db.collection(collection);
};

module.exports = {
  COLLECTIONS,
  getCollection
}