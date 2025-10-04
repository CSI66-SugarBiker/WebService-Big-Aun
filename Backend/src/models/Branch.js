import mongoose from 'mongoose';

const ThemeSchema = new mongoose.Schema({
  primary: String, secondary: String, altBlack: String, altWhite: String,
  accents: [String]
}, {_id:false});

const BranchSchema = new mongoose.Schema({
  name: { type:String, required:true },
  address: String,
  theme: ThemeSchema,
  payment: {
    promptpayId: String
  }
}, { timestamps:true });

export default mongoose.model('Branch', BranchSchema);
