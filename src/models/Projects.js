import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    employees: [
      { type: Schema.Types.ObjectId, ref: 'Employee' },
    ],
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: true },
    clientName: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Projects', projectSchema);
