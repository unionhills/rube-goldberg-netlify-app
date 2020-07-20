import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INote extends Document {
    subject: string;
    body: string;
    correlationId: string;
}

export class NoteMongoRepository {
    private static instance: NoteMongoRepository;
    readonly model: Model<INote>;

    private constructor() {
        this.model = this.createModel();
    }

    public static getInstance(): NoteMongoRepository {
        if (!NoteMongoRepository.instance) {
            NoteMongoRepository.instance = new NoteMongoRepository();
        }
    
        return NoteMongoRepository.instance;
    }

    private createModel(): Model<INote> {
        const NoteSchema: Schema = new Schema({
            subject: { type: String },
            body: { type: String },
            correlationId: { type: String }
        });

        return mongoose.model<INote>('Note', NoteSchema);
    }

    public async findAll(): Promise<INote[]> {
        try {
            const docs = await this.model.find({}).exec();

            console.log(`docs=\n${docs}`);
            return docs;
        } catch (err) {
            err.stack;
        }
    }
}
