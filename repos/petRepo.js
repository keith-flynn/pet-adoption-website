require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb');

// This is the working middleware using MongoDB

const connectionUrl = process.env.MONGO_CONNECTION_URL;
const databaseName = 'pets';
const collectionName = 'pet-adoption'; // Use an appropriate name for your collection

async function connect() {
  const client = new MongoClient(connectionUrl);

  try {
    await client.connect();
    return client.db(databaseName).collection(collectionName);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

const petRepo = {
  get: async function () {
    const collection = await connect();
    return collection.find().toArray();
  },
  getById: async function (id) {
    const collection = await connect();
    return collection.findOne({ _id: new ObjectId(id) });
  },
  search: async function (searchObject) {
    const collection = await connect();

    let query = {};

    if (searchObject.id) {
      query._id = new ObjectId(searchObject.id);
    }

    if (searchObject.breed) {
      query['breeds.primary'] = { $regex: new RegExp(searchObject.breed, 'i') };
    }

    if (searchObject.color) {
      query['colors.primary'] = { $regex: new RegExp(searchObject.color, 'i') };
    }

    if (searchObject.size) {
      query.size = { $regex: new RegExp(searchObject.size, 'i') };
    }

    if (searchObject.age) {
      query.age = { $regex: new RegExp(searchObject.age, 'i') };
    }

    if (searchObject.gender) {
      query.gender = { $regex: new RegExp(searchObject.gender, 'i') };
    }

    if (searchObject.name) {
      query.name = { $regex: new RegExp(searchObject.name, 'i') };
    }

    return collection.find(query).toArray();
    // const result = await collection.find(query).toArray();
    // await client.close();
    // return result;
  },
};

module.exports = petRepo;
