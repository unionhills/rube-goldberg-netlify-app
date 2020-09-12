import { Note } from '../models';
import { Utils } from './utils';

export class NoteUtils {
    public static buildRandomNote(id?: string): Note {
        const newNote: Note = new Note(id);

        newNote.subject =  `Subject - ${Utils.randomAlphaString(128)}`;
        newNote.body = `Body - ${Utils.randomAlphaString(256)}`;
        newNote.correlationId = `${Utils.uuidv4()}`;

        return newNote;
    }
}