import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  subject: string;
  body: string;
  correlationId: string;
}

const NoteSchema: Schema = new Schema({
  subject: { type: String },
  body: { type: String },
  correlationId: { type: String }
});

// Export the model and return your INote interface
export default mongoose.model<INote>('Note', NoteSchema);