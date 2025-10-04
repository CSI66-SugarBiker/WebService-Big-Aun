import mongoose from 'mongoose';
const PaymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref:'Order', required:true },
  method: { type:String, enum:['promptpay','cash','card'], required:true },
  amount: { type:Number, required:true },
  provider: String,
  providerRef: String,
  status: { type:String, enum:['pending','captured','failed','refunded'], default:'pending' },
  paidAt: Date
}, { timestamps:true });

PaymentSchema.index({ orderId:1 });

export default mongoose.model('Payment', PaymentSchema);
