import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INote extends Document {
    subject: string;
    body: string;
    correlationId: string;
}

export class NoteMongoRepository {
    readonly model: Model<INote>;

    constructor() {
        this.model = this.createModel();
    }

    private createModel(): Model<INote> {
        const NoteSchema: Schema = new Schema({
            subject: { type: String },
            body: { type: String },
            correlationId: { type: String }
        });

        return mongoose.model<INote>('Note', NoteSchema);
    }

    public async findAll() {
        try {
            const docs = await this.model.find({}).exec();

            console.log(`docs=\n${docs}`);
            return docs;
        } catch (err) {
            err.stack;
        }
    }
}
