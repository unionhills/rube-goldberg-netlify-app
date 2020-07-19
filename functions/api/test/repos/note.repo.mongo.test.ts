import { INote, NoteMongoRepository } from '../../repos/note.repo.mongo';
import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';

beforeAll(async ()=> {
  dotenv.config();
/*
  console.log(`DB_HOST=${process.env.DB_HOST}`);
  console.log(`DB_NAME=${process.env.DB_NAME}`);
  console.log(`DB_USER=${process.env.DB_USER}`);
  console.log(`DB_PASS=${process.env.DB_PASS}`);
*/
  const uri: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

  try {
    const connectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    await mongoose.connect(uri, connectOptions);
    console.log('Successfully connected to MongoDB Atlas');
  } catch (error) {
    console.error(error);
  }
});

afterAll(async ()=> {
  try {
    await mongoose.connection.close();
  } finally {
  }
});

describe("Let's see if we can retrieve the contents of the repo", () => {
  test("Check to see if we get records back from the NoteRepository", async () => {
    const noteMongoRepo: NoteMongoRepository = new NoteMongoRepository(mongoose);

    const noteModel: Model<INote> = noteMongoRepo.model();

    try {
      const docs = await noteModel.find({}).exec();

      expect(docs).toBeDefined();
      expect(docs.length).toBeGreaterThan(0);

      console.log(`docs=\n${docs}`);
    } catch (err) {
      err.stack;
    }
  });
});

