import { Note } from '../../models';
import { InMemoryNoteRepository } from '../../repos';

/**
 * Tests InMemoryNoteRepository class
 * 
 * @group unit/classes/InMemoryNoteRepository
 * 
 */

describe("Let's try testing the repo", () => {
    test('Check to see if we get records back from the InMemoryNoteRepository', async () => {
        const noteRepo: InMemoryNoteRepository = new InMemoryNoteRepository();
        const notes: Note[] = await noteRepo.findAll();

        expect(notes).toBeDefined();
        expect(notes.length).toBeGreaterThan(0);
    });
});

describe('Test create operation', () => {
    test('Check to see if we can add a new note to the InMemoryNoteRepository', async () => {
        const noteRepo: InMemoryNoteRepository = new InMemoryNoteRepository();
        let notes: Note[] = await noteRepo.findAll();
        const recordCount = notes.length;
        const newNote: Note = new Note();

        newNote.body = 'This is a test note';
        await noteRepo.create(newNote);

        notes = await noteRepo.findAll();

        expect(notes.length).toEqual(recordCount + 1);
    });
});

describe('Test repo update operation', () => {
    test('Check to if we can update a note properly in the InMemoryNoteRepository', async () => {
        const noteRepo: InMemoryNoteRepository = new InMemoryNoteRepository();
        const newBody: string = 'This is the new body content';
        let note: Note = await noteRepo.findById('1');

        note.body = newBody;
        await noteRepo.update(note.getId(), note);
        note = await noteRepo.findById('1');

        expect(note.body).toEqual(newBody);
    });
});

describe('Test repo delete operation', () => {
    test('Check to if we can delete a note properly in the InMemoryNoteRepository', async () => {
        const noteRepo: InMemoryNoteRepository = new InMemoryNoteRepository();

        await noteRepo.delete('1');
        const note: Note = await noteRepo.findById('1');

        expect(note).toBeUndefined();
    });
});
