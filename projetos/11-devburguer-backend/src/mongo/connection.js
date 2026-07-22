const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

async function connectMongo() {
  const uri = process.env.MONGO_URL || (await criarMongoLocal());
  await mongoose.connect(uri);
  console.log("MongoDB conectado:", uri);
}

async function criarMongoLocal() {
  const mongod = await MongoMemoryServer.create();
  return mongod.getUri("devburguer");
}

module.exports = connectMongo;
