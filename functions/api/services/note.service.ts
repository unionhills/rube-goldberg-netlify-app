import { Note } from '../shared/models';
import { NoteRepository } from '../repos';

/**
 * This class represents a business service for managing Notes.
 *
 * @author Union Hills Software
 * @date   February 6, 2020
 *
 */

export class NoteService {
  constructor(private readonly noteRepo = new NoteRepository()) { }

  public getNotes(): Note[] {
    return this.noteRepo.findAll();
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
