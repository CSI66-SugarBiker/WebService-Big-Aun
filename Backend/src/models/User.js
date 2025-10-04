import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  branchId: { type: mongoose.Schema.Types.ObjectId, ref:'Branch', required:true },
  name: String,
  email: { type:String, unique:true, sparse:true },
  passwordHash: String,
  role: { type:String, enum:['cashier','kitchen','manager','owner'], required:true }
}, { timestamps:true });

export default mongoose.model('User', UserSchema);
