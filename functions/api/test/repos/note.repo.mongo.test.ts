import { INote, NoteMongoRepository } from '../../repos/note.repo.mongo';
import mongoose, { Model } from 'mongoose';
import { MongooseConnector } from '../../mongoose.connector';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await MongooseConnector.connect();
});

afterAll(async () => {
    await MongooseConnector.disconnect();
});

describe("Let's see if we can retrieve the contents of the repo", () => {
    test('Check to see if we get records back from the NoteRepository', async () => {
        const noteMongoRepo: NoteMongoRepository = NoteMongoRepository.getInstance();

        const noteModel: Model<INote> = noteMongoRepo.model;

        try {
            const docs = await noteModel.find({}).exec();

            expect(docs).toBeDefined();
            expect(docs.length).toBeGreaterThan(0);

            console.log(`docs=\n${docs}`);
        } catch (err) {
            console.error(err.stack);
        }
    });
});
