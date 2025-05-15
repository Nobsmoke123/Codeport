import 'reflect-metadata';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose from 'mongoose';

// let mongoServer: MongoMemoryServer;
process.env.JWT_SECRET = 'testToken';

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();
//   mongoose.connect(uri);
// });

// afterEach(async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     const collection = collections[key];
//     await collection.deleteMany({});
//   }
// });

// afterAll(async () => {
//   await mongoose.connection.close();
//   await mongoServer.stop();
// });
