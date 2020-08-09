import {
    INoteDocument,
    MongoNoteRepository
} from '../../repos/note.repo.mongo';
import { INote } from '../../shared';
import { Note } from '../../models';
import { MongooseConnector } from '../../mongoose.connector';
import { Utils } from '../shared/utils';
import dotenv from 'dotenv';

/**
 * Tests MongoNoteRepository class
 *
 * @group integration/classes/MongoNoteRepository
 *
 */

dotenv.config();

beforeAll(async () => {
    await MongooseConnector.connect();
});

afterAll(async () => {
    await MongooseConnector.disconnect();
});

describe("Let's see if we can insert a new item into the repo", () => {
    test('Check to see if we can insert 1 item into the NoteRepository', async () => {
        const noteMongoRepo: MongoNoteRepository = MongoNoteRepository.getInstance();

        try {
            const docToInsert: Note = new Note();

            docToInsert.subject =  `Subject - ${Utils.randomAlphaString(128)}`;
            docToInsert.body = `Body - ${Utils.randomAlphaString(256)}`;
            docToInsert.correlationId = `${Utils.uuidv4()}`;

            const doc: INoteDocument = await noteMongoRepo.create(docToInsert);

            expect(doc).toBeDefined();
            expect(doc.body.length).toBeGreaterThan(0);

            console.log(`inserted doc=\n${doc}`);
        } catch (err) {
            console.error(err.stack);
        }
    });
});

describe("Let's see if we can retrieve the contents of the repo", () => {
    test('Check to see if we get records back from the NoteRepository', async () => {
        const noteMongoRepo: MongoNoteRepository = MongoNoteRepository.getInstance();

        try {
            const docs: INoteDocument[] = await noteMongoRepo.findAll();

            expect(docs).toBeDefined();
            expect(docs.length).toBeGreaterThan(0);

            console.log(`docs=\n${docs}`);
        } catch (err) {
            console.error(err.stack);
        }
    });
});

describe("Let's see if we can retrieve 1 item from the repo", () => {
    test('Check to see if we can retrieve 1 item by id NoteRepository', async () => {
        const noteMongoRepo: MongoNoteRepository = MongoNoteRepository.getInstance();

        try {
            const docs: INoteDocument[] = await noteMongoRepo.findAll();
            const doc: INoteDocument = await noteMongoRepo.findById(
                docs[0]._id
            );

            expect(doc).toBeDefined();
            expect(doc.body.length).toBeGreaterThan(0);
            expect(doc.getId()).toEqual(doc.id);

            console.log(`doc=\n${doc}`);
        } catch (err) {
            console.error(err.stack);
        }
    });
});

describe("Let's see if we can update an existing item in the repo", () => {
    test('Check to see if we can update 1 item in the NoteRepository', async () => {
        const noteMongoRepo: MongoNoteRepository = MongoNoteRepository.getInstance();

        try {
            const docToInsert: Note = new Note();

            docToInsert.subject =  `Subject - ${Utils.randomAlphaString(128)}`;
            docToInsert.body = `Body - ${Utils.randomAlphaString(256)}`;
            docToInsert.correlationId = `${Utils.uuidv4()}`;

            const docToUpdate: INoteDocument = await noteMongoRepo.create(
                docToInsert
            );
            const updatedSubject: string = `Subject - ${Utils.randomAlphaString(
                128
            )}`;
            docToUpdate.subject = updatedSubject;

            const updatedDoc: INoteDocument = await noteMongoRepo.update(
                docToUpdate._id,
                docToUpdate
            );

            expect(updatedDoc).toBeDefined();
            expect(updatedDoc._id).toEqual(docToUpdate._id);
            expect(updatedDoc.subject).toEqual(docToInsert.subject);

            const doc: INoteDocument = await noteMongoRepo.findById(
                updatedDoc._id
            );

            expect(doc).toBeDefined();
            expect(doc.subject).toEqual(updatedSubject);

            console.log(`updated doc=\n${doc}`);
        } catch (err) {
            console.error(err.stack);
        }
    });
});

describe("Let's see if we can insert a new item into the repo", () => {
    test('Check to see if we can insert 1 item into the NoteRepository', async () => {
        const noteMongoRepo: MongoNoteRepository = MongoNoteRepository.getInstance();

        try {
            const docToInsert: Note = new Note();

            docToInsert.subject =  `Subject - ${Utils.randomAlphaString(128)}`;
            docToInsert.body = `Body - ${Utils.randomAlphaString(256)}`;
            docToInsert.correlationId = `${Utils.uuidv4()}`;

            const insertedDoc: INoteDocument = await noteMongoRepo.create(
                docToInsert
            );
            const deletedDoc: INoteDocument = await noteMongoRepo.delete(
                insertedDoc._id
            );

            expect(deletedDoc).toBeDefined();
            expect(deletedDoc._id).toEqual(insertedDoc._id);

            const doc: INoteDocument = await noteMongoRepo.findById(
                deletedDoc._id
            );

            expect(doc).toBeNull();

            console.log(`deleted doc=\n${doc}`);
        } catch (err) {
            console.error(err.stack);
        }
    });
});
