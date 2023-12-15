import { beforeAll } from "vitest";
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose';

beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    mongoose.connect(uri)
})