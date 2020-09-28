import { INote } from '../shared';

/**
 * This class represents the concept of a Message in
 * our application.  A Message simply contains a
 * packet of data to be transported.
 *
 * @author Union Hills Software
 * @date   February 5, 2020
 *
 */

export class Note implements INote {
    constructor(id?: string) {
        this._id = id;
        this.trace = new Array<string>();
    }

    public static fromINote(iNote: INote): Note {
        const note: Note = new this(iNote.getId());

        note.subject = iNote.subject;
        note.body = iNote.body;
        note.correlationId = iNote.correlationId;

        if (iNote?.trace?.length) note.trace = [...iNote.trace];

        return note;
    }

    public static fromAny(incoming: any): Note {
        const note: Note = new this(incoming?._id);

        note.subject = incoming?.subject;
        note.body = incoming?.body;
        note.correlationId = incoming?.correlationId;

        if (incoming?.trace?.length) note.trace = [...incoming.trace];

        return note;
    }

    private _id: string;

    public getId(): string {
        return this._id;
    }

    public setId(value: string) {
        this._id = value;
    }

    subject: string;
    body: string;

    correlationId: string;
    trace: Array<string>;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}
