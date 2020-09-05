/**
 * This class is used to perform CRU (create, read, update) 
 * operations on a Note with a backend API.  Since this is
 * a pretty simply application, we've combined the business
 * model object and the data transfer object into one. When
 * this no longer works, we'll refactor.
 *
 * @author Union Hills Software
 * @date   September 5, 2020
 *
 */

export class NoteModelDTO {
    // Optional because, during create operations, no
    // id will have been assigned until the backend
    // assigns one.
    _id?: string;

    subject: string;
    body: string;

    correlationId: string;
    trace: Array<string>;

    // These are managed by the backend
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
}