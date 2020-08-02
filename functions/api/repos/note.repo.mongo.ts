import mongoose, { Schema, Document, Model } from 'mongoose';
import { IRepository } from '.';
import { INote } from '../shared';

export interface INoteDocument extends INote, Document {
    subject: string;
    body: string;
    correlationId: string;
}

export class NoteMongoRepository implements IRepository<INoteDocument, INote> {
    private static instance: NoteMongoRepository;
    readonly model: Model<INoteDocument>;

    private constructor() {
        this.model = this.createModel();
    }

    public static getInstance(): NoteMongoRepository {
        if (!NoteMongoRepository.instance) {
            NoteMongoRepository.instance = new NoteMongoRepository();
        }

        return NoteMongoRepository.instance;
    }

    private createModel(): Model<INoteDocument> {
        const NoteSchema: Schema = new Schema({
            subject: { type: String },
            body: { type: String },
            correlationId: { type: String }
        }, { timestamps: {} });

        return mongoose.model<INoteDocument>('Note', NoteSchema);
    }

    public async findAll(): Promise<INoteDocument[]> {
        try {
            const docs = await this.model.find({}).exec();

            console.log(`found docs=\n${docs}`);
            return docs;
        } catch (err) {
            err.stack;
        }
    }

    public async findById(id: string): Promise<INoteDocument> {
        try {
            const doc = await this.model.findById(id).exec();

            console.log(`found doc=\n${doc}`);
            return doc;
        } catch (err) {
            err.stack;
        }
    }

    public async create(newNote: INote): Promise<INoteDocument> {
        try {
            const doc = await this.model.create(newNote);

            console.log(`created doc=\n${doc}`);
            return doc;
        } catch (err) {
            err.stack;
        }
    }

    public async update(id: string, note: INote): Promise<INoteDocument> {
        try {
            const doc = await this.model.findByIdAndUpdate(id, note);

            console.log(`updated doc=\n${doc}`);
            return doc;
        } catch (err) {
            err.stack;
        }
    }

    public async delete(id: string): Promise<INoteDocument> {
        try {
            const doc = await this.model.findByIdAndDelete(id).exec();

            console.log(`deleted doc =\n${doc}`);
            return doc;
        } catch (err) {
            err.stack;
        }
    }
}
