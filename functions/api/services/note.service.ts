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

    public getNotes(): Note[] {
        return this.noteRepo.findAll();
    }

    public async getNotesAsync(): Promise<Note[]> {
        const notes: Note[] = [];

        try {
            const docs: INote[] = await this.noteMongoRepo.findAll();

            const notes: Note[] = docs.map((doc): Note => {
                const note = new Note();

                note.id = doc._id;
                note.subject = doc.subject;
                note.body = doc.body;
                note.correlationId = doc.correlationId;

                return note;
            });

            return notes;
        } catch (err) {
            err.stack;
        }
    }

    public getNote(id: string): Note {
        return this.noteRepo.findById(id);
    }

    public createNote(newNote: Note): Note {
        return this.noteRepo.create(newNote);
    }

    public updateNote(noteId: string, note: Note): Note {
        return this.noteRepo.update(noteId, note);
    }

    public deleteNote(noteId: string): void {
        this.noteRepo.delete(noteId);
    }
}
