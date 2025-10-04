import mongoose from 'mongoose';
const TableSchema = new mongoose.Schema({
  branchId: { type: mongoose.Schema.Types.ObjectId, ref:'Branch', required:true },
  name: { type:String, required:true },
  status: { type:String, enum:['available','occupied','cleaning','reserved'], default:'available' }
}, { timestamps:true });

export default mongoose.model('Table', TableSchema);
