import { Note } from '../../models';
import { INote } from '../../shared';
import { NoteService } from '../../services';
import { MongooseConnector } from '../../mongoose.connector';
import { NoteUtils, Utils } from '../../shared';
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

describe('Test create operation', () => {
    test('Check to see if we can add a new note to the NoteService', async () => {
        const noteSvc: NoteService = new NoteService();
        let notes: INote[] = await noteSvc.getNotes();
        const recordCount = notes.length;
        const newNote: Note = new Note();

        newNote.subject =  `Subject - ${Utils.randomAlphaString(128)}`;
        newNote.body = `Body - ${Utils.randomAlphaString(256)}`;
        newNote.correlationId = `${Utils.uuidv4()}`;

        await noteSvc.createNote(newNote);

        notes = await noteSvc.getNotes();
        expect(notes.length).toEqual(recordCount + 1);
    });
});

describe('Test repo update operation', () => {
    test('Check to if we can update a note properly in the NoteService', async () => {
        const noteSvc: NoteService = new NoteService();
        const note: Note = new Note();
    
        note.subject =  `Subject - ${Utils.randomAlphaString(128)}`;
        note.body = `Body - ${Utils.randomAlphaString(256)}`;
        note.correlationId = `${Utils.uuidv4()}`;

        const createdNote: INote = await noteSvc.createNote(note);

        const noteToUpdate: Note = Note.fromINote(createdNote);
        const updatedBody: string = `Updated Body - ${Utils.randomAlphaString(256)}`;
        noteToUpdate.body = updatedBody;

        await noteSvc.updateNote(noteToUpdate.getId(), noteToUpdate);
        const updatedNote: INote = await noteSvc.getNote(noteToUpdate.getId());

        expect(updatedNote.body).toEqual(updatedBody);
    });
});

describe('Test repo delete operation', () => {
    test('Check to if we can delete a note properly in the NoteService', async () => {
        const noteSvc: NoteService = new NoteService();
        const note: Note = new Note();
    
        note.subject =  `Subject - ${Utils.randomAlphaString(128)}`;
        note.body = `Body - ${Utils.randomAlphaString(256)}`;
        note.correlationId = `${Utils.uuidv4()}`;

        const createdNote: INote = await noteSvc.createNote(note);

        await noteSvc.deleteNote(createdNote.getId());
        const deletedNote: INote = await noteSvc.getNote(createdNote.getId());

        expect(deletedNote).toBeFalsy();
    });
});
