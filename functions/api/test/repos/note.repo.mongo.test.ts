import { INote, NoteMongoRepository } from '../../repos/note.repo.mongo';
import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';

beforeAll(async ()=> {
  dotenv.config();

  console.log(`DB_HOST=${process.env.DB_HOST}`);
  console.log(`DB_NAME=${process.env.DB_NAME}`);
  console.log(`DB_USER=${process.env.DB_USER}`);
  console.log(`DB_PASS=${process.env.DB_PASS}`);

  const uri: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
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
  test("Check to see if we get records back from the NoteRepository", done => {
    const noteMongoRepo: NoteMongoRepository = new NoteMongoRepository(mongoose);

    const noteModel: Model<INote> = noteMongoRepo.model();

    noteModel.find({}, (err, docs) => {
      if (err) {
        done(err);
      }
      else {
        expect(docs).toBeDefined();
        expect(docs.length).toBeGreaterThan(0);

        console.log(`docs=\n${docs}`);
        done();
      }
    });
  });
});

