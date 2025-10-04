import mongoose from 'mongoose';
const ModifierSchema = new mongoose.Schema({
  id: String,
  type: { type:String, enum:['multi','multiPrice'] },
  label: String,
  items: [{ name:String, price:Number }] // multi ใช้ name อย่างเดียวก็ได้
}, {_id:false});

const MenuItemSchema = new mongoose.Schema({
  branchId: { type: mongoose.Schema.Types.ObjectId, ref:'Branch', required:true },
  name: { type:String, required:true },
  price: { type:Number, required:true },
  category: String,
  imageUrl: String,
  station: String, // Wok/Grill/Drinks/Cold
  modifiers: [ModifierSchema],
  isActive: { type:Boolean, default:true }
}, { timestamps:true });

export default mongoose.model('MenuItem', MenuItemSchema);
