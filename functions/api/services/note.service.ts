import { INote } from '../shared';
import { Note } from '../models';
import { IRepository, INoteDocument, InMemoryNoteRepository, MongoNoteRepository } from '../repos';
import { NoteNextStepService } from '.';

/**
 * This class represents a business service for managing Notes.
 *
 * @author Union Hills Software
 * @date   February 6, 2020
 *
 */

export class NoteService {
    private noteNextStepService: NoteNextStepService;

    constructor(
        private noteRepo: IRepository<INote, INote> = InMemoryNoteRepository.getInstance(),
    ) {
        this.noteNextStepService = new NoteNextStepService();
    }

    public async getNotes(): Promise<INote[]> {
        return await this.noteRepo.findAll();
    }

    public async getNote(id: string): Promise<INote> {
        return await this.noteRepo.findById(id);
    }

    public async createNote(newNote: Note): Promise<INote> {
        let createdNote: INote;
    
        createdNote = await this.noteRepo.create(newNote);

        // Publish to AWS as the next step in the Rube Goldberg Machine
        await this.noteNextStepService.publish(createdNote);

        return createdNote;
    }

    public async updateNote(noteId: string, note: Note): Promise<INote> {
        return await this.noteRepo.update(noteId, note);
    }

    public async deleteNote(noteId: string) {
        await this.noteRepo.delete(noteId);
    }

    private mapNotes(docs: INoteDocument[]): Note[] {
        const notes: Note[] = docs.map(
            (doc): Note => {
                const note = new Note(doc._id);

                note.subject = doc.subject;
                note.body = doc.body;
                note.correlationId = doc.correlationId;
                note.trace = doc.trace ? [...doc.trace] : undefined;

                return note;
            }
        );

        return notes;
    }
}
