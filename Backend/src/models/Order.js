import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref:'MenuItem' },
  name: String,
  qty: Number,
  unitPrice: Number,
  modifiers: [{}], // { group, value } โครงยืดหยุ่น
  station: String,
  kitchenStatus: { type:String, enum:['queued','cooking','ready','served'], default:'queued' },
  lineTotal: Number
}, {_id:false});

const AmountsSchema = new mongoose.Schema({
  subtotal:Number, discount:Number, serviceCharge:Number, vat:Number, total:Number
}, {_id:false});

const OrderSchema = new mongoose.Schema({
  branchId: { type: mongoose.Schema.Types.ObjectId, ref:'Branch', required:true },
  type: { type:String, enum:['dine_in','takeaway'], required:true },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref:'Table', default:null },
  queueNumber: String,
  customer: { phone:String, consentSms:Boolean },
  status: { type:String, enum:['pending','in_progress','ready','completed','cancelled'], default:'pending' },
  paymentStatus: { type:String, enum:['unpaid','paid','refunded'], default:'unpaid' },
  items: [OrderItemSchema],
  amounts: AmountsSchema,
  payments: [{}]
}, { timestamps:true });

OrderSchema.index({ branchId:1, status:1, createdAt:1 });

export default mongoose.model('Order', OrderSchema);
