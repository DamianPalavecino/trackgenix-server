import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheetSchema = new Schema({
  description: { type: String, requiered: true },
  date: { type: Date, requiered: true },
  task: { type: String, requiered: true },
});

export default mongoose.model('Timesheet', timesheetSchema);
