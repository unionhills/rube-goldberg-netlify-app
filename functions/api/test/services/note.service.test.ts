import { Note } from '../../models';
import { INote } from '../../shared';
import { NoteService } from '../../services';
import { MongooseConnector } from '../../mongoose.connector';
import dotenv from 'dotenv';

/**
 * Tests NoteService class
 * 
 * @group integration/classes/NoteService
 * 
 */

dotenv.config();

beforeAll(async () => {
    await MongooseConnector.connect();
});

afterAll(async () => {
    await MongooseConnector.disconnect();
});

describe("Let's try testing the repo", () => {
    test('Check to see if we get records back from the NoteService', async () => {
        const noteSvc: NoteService = new NoteService();
        const notes: INote[] = await noteSvc.getNotes();

        expect(notes).toBeDefined();
        expect(notes.length).toBeGreaterThan(0);
    });
});

describe("Let's try testing the repo", () => {
    test('Check to see if we get records back from the NoteService using our async call', async () => {
        const noteSvc: NoteService = new NoteService();

        try {
            const notes: INote[] = await noteSvc.getNotes();

            expect(notes).toBeDefined();
            expect(notes.length).toBeGreaterThan(0);

            console.log(`notes=\n${JSON.stringify(notes)}`);
        } catch (err) {
            console.error(err.stack);
        }
    });
});

describe('Test get operation', () => {
    test('Check to see if we can add a new note to the NoteService', async () => {
        const noteSvc: NoteService = new NoteService();
        let notes: INote[] = await noteSvc.getNotes();
        const recordCount = notes.length;
        const newNote: Note = new Note();

        newNote.body = 'This is a test note';
        await noteSvc.createNote(newNote);

        notes = await noteSvc.getNotes();
        expect(notes.length).toEqual(recordCount + 1);
    });
});

describe('Test repo update operation', () => {
    test('Check to if we can update a note properly in the NoteService', async () => {
        const noteSvc: NoteService = new NoteService();
        const newBody: string = 'This is the new body content';
        let note: INote = await noteSvc.getNote('1');

        const updatedNote = new Note(note.getId());
        updatedNote.subject = note.subject;
        updatedNote.body = newBody;
        updatedNote.correlationId = note.correlationId;
    
        await noteSvc.updateNote(note.getId(), updatedNote);
        note = await noteSvc.getNote('1');

        expect(note.body).toEqual(newBody);
    });
});

describe('Test repo delete operation', () => {
    test('Check to if we can delete a note properly in the NoteService', async () => {
        const noteSvc: NoteService = new NoteService();

        await noteSvc.deleteNote('1');
        const note: INote = await noteSvc.getNote('1');

        expect(note).toBeUndefined();
    });
});
