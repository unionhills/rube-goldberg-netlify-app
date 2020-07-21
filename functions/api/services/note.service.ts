import { Note } from '../models';
import { INote, NoteRepository, NoteMongoRepository } from '../repos';

/**
 * This class represents a business service for managing Notes.
 *
 * @author Union Hills Software
 * @date   February 6, 2020
 *
 */

export class NoteService {
    constructor(
        private noteRepo: NoteRepository = new NoteRepository(),
        private noteMongoRepo: NoteMongoRepository = NoteMongoRepository.getInstance()
    ) {}

    public async getNotes(): Promise<Note[]> {
        return await this.noteRepo.findAll();
    }

    public async getNotesFromMongo(): Promise<Note[]> {
        try {
            const docs: INote[] = await this.noteMongoRepo.findAll();
            const notes: Note[] = this.mapNotes(docs);

            return notes;
        } catch (err) {
            console.error(err.stack);
        }
    }

    public async getNote(id: string): Promise<Note> {
        return await this.noteRepo.findById(id);
    }

    public async createNote(newNote: Note): Promise<Note> {
        return await this.noteRepo.create(newNote);
    }

    public async updateNote(noteId: string, note: Note): Promise<Note> {
        return await this.noteRepo.update(noteId, note);
    }

    public async deleteNote(noteId: string) {
        await this.noteRepo.delete(noteId);
    }

    private mapNotes(docs: INote[]): Note[] {
        const notes: Note[] = docs.map(
            (doc): Note => {
                const note = new Note();

                note.id = doc._id;
                note.subject = doc.subject;
                note.body = doc.body;
                note.correlationId = doc.correlationId;

                return note;
            }
        );

        return notes;
    }
}
