import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  employees: [
    {
      name: { type: String, required: true },
      role: { type: String, required: true, enum: ['DEV', 'QA', 'TL'] },
      rate: { type: Number, required: true },
    },
  ],
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  clientName: { type: String, required: true },
});

export default mongoose.model('Projects', projectSchema);
