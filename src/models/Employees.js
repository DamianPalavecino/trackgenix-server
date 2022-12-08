import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true },
    lastName: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true },
    projects: [
      { type: Schema.Types.ObjectId, ref: 'Projects' },
    ],
    status: { type: Boolean, required: true },
    isProjectManager: { type: Boolean, required: true },
    firebaseUid: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Employee', employeeSchema);
