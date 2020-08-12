import { INote } from '../shared';
import { Note } from '../models';
import { IRepository } from '.';
import { Utils, NoteUtils } from '../shared';

/**
 * This class handles the CRUD operations to our persistence store
 * for Notes.
 *
 * @author Union Hills Software
 * @date   February 8, 2020
 *
 */

export class InMemoryNoteRepository implements IRepository<Note, INote> {
    private static instance: InMemoryNoteRepository;
    private itemId: number = 0;

    private constructor(private noteDb: Note[] = new Array<Note>()) {
        this.fillWithSampleData();
    }

    public static getInstance(): InMemoryNoteRepository {
        if (!InMemoryNoteRepository.instance) {
            InMemoryNoteRepository.instance = new InMemoryNoteRepository();
        }

        return InMemoryNoteRepository.instance;
    }

    private allocateNextId(): string {
        return (this.itemId++).toString();
    }

    private fillWithSampleData() {
        for (let i: number = 0; i < 10; i++) {
            const newNote = NoteUtils.buildRandomNote(this.allocateNextId());

            newNote.trace = [`New note ${newNote.getId()} persisted to database`];
            newNote.createdAt = new Date();
            newNote.updatedAt = new Date();
            newNote.isDeleted = false;

            this.noteDb.push(newNote);
        }
    }

    public async findAll(): Promise<Note[]> {
        return this.noteDb;
    }

    public async findById(id: string): Promise<Note> {
        const note = this.noteDb.find(note => note.getId() === id);
        return note;
    }

    public async create(newNote: Note): Promise<Note> {
        newNote.setId(this.allocateNextId());

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
        this.noteDb = this.noteDb.filter(note => note.getId() !== noteId);
    }
}
