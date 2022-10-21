import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
  name: { type: String, require: true },
  lastName: { type: String, require: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: { type: String, require: true },
});

export default mongoose.model('admin', adminSchema);
