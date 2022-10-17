import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: { type: String },
});

export default mongoose.model('admin', adminSchema);
