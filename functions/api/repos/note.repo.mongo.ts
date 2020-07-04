import { Mongoose, Schema, Document, Error } from 'mongoose';

export interface INote extends Document {
  subject: string;
  body: string;
  correlationId: string;
}

export class NoteMongoRepository {
  constructor(private mongooseConnection: Mongoose) {
  }

  public model() {
    const NoteSchema: Schema = new Schema({
      subject: { type: String },
      body: { type: String },
      correlationId: { type: String }
    });

    return this.mongooseConnection.model<INote>('Note', NoteSchema);
  }
}