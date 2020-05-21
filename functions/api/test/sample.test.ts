import { Note } from '../shared/models';
import { NoteRepository } from '../repos';

describe("This is a simple test of the note model", () => {
  test("Check to see if imports are working", () => {
    const note: Note = new Note();

    note.id = "1"
    expect(note.id).toEqual("1");
  });
});

describe("Let's try testing the repo", () => {
  test("Check to see if we get records back from the NoteRepository", () => {
    const noteRepo: NoteRepository = new NoteRepository();
    const notes: Note[] = noteRepo.findAll();

    expect(notes).toBeDefined();
    expect(notes.length).toBeGreaterThan(0);
  });

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
