import { Note } from '../../shared/models';
import { NoteRepository } from '../../repos';

describe("Let's try testing the repo", () => {
  test("Check to see if we get records back from the NoteRepository", () => {
    const noteRepo: NoteRepository = new NoteRepository();
    const notes: Note[] = noteRepo.findAll();

    expect(notes).toBeDefined();
    expect(notes.length).toBeGreaterThan(0);
  });
});

describe("Test create operation", () => {
  test("Check to see if we can add a new note to the NoteRepository", () => {
    const noteRepo: NoteRepository = new NoteRepository();
    const notes: Note[] = noteRepo.findAll();
    const recordCount = notes.length;
    const newNote: Note = new Note();

    newNote.body = "This is a test note";
    noteRepo.create(newNote);

    expect(noteRepo.findAll().length).toEqual(recordCount + 1);
  });
});

describe("Test repo update operation", () => {
  test("Check to if we can update a note properly in the NoteRepository", () => {
    const noteRepo: NoteRepository = new NoteRepository();
    const newBody: string = "This is the new body content";
    let note: Note = noteRepo.findById("1");

    note.body = newBody;
    noteRepo.update(note.id, note);
    note = noteRepo.findById("1");

    expect(note.body).toEqual(newBody);
  });
});

describe("Test repo delete operation", () => {
  test("Check to if we can delete a note properly in the NoteRepository", () => {
    const noteRepo: NoteRepository = new NoteRepository();

    noteRepo.delete("1");
    const note: Note = noteRepo.findById("1");

    expect(note).toBeUndefined();
  });
});