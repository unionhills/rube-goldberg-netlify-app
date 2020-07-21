import { Note } from '../models';

/**
 * This class handles the CRUD operations to our persistence store
 * for Notes.
 *
 * @author Union Hills Software
 * @date   February 8, 2020
 *
 */

export class NoteRepository {
    constructor(private noteDb: Note[] = new Array<Note>()) {
        this.fillWithSampleData();
    }

    private fillWithSampleData() {
        for (let i: number = 0; i < 10; i++) {
            const noteId: string = (i + 1).toString();

            this.noteDb.push({
                id: noteId,
                correlationId: noteId,
                subject: `Sample Note ${noteId}`,
                body: `This is the body of sample note ${noteId}.`,
                trace: [`New note ${noteId} persisted to database`],
                createdAt: new Date(),
                updatedAt: new Date(),
                isDeleted: false
            });
        }
    }

    public async findAll(): Promise<Note[]> {
        return this.noteDb;
    }

    public async findById(id: string): Promise<Note> {
        const note = this.noteDb.find(note => note.id === id);
        return note;
    }

    public async create(newNote: Note): Promise<Note> {
        newNote.id = '11';
        newNote.correlationId = '11';

        newNote.createdAt = new Date();
        newNote.updatedAt = new Date();
        newNote.trace.push(
            `${newNote.createdAt}: New note created with correlation id: ${newNote.correlationId}`
        );

        this.noteDb.push(newNote);

        return newNote;
    }

    public async update(noteId: string, note: Note): Promise<Note> {
        const noteToUpdate = await this.findById(noteId);

        noteToUpdate.subject = note.subject;
        noteToUpdate.body = note.body;
        noteToUpdate.trace.push('Note ' + noteId + ' updated ');
        noteToUpdate.updatedAt = new Date();

        return noteToUpdate;
    }

    public async delete(noteId: string) {
        this.noteDb = this.noteDb.filter(note => note.id !== noteId);
    }
}
