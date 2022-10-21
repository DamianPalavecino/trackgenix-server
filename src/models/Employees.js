import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: { type: String, required: true, lowercase: true },
  lastName: { type: String, required: true, lowercase: true },
  phone: { type: Number, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
});

export default mongoose.model('Employee', employeeSchema);