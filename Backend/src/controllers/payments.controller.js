import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import Branch from '../models/Branch.js';
import { createPromptPayQR } from '../services/promptpay.service.js';
import { emitTo } from '../lib/socket.js';

export async function createIntent(req, res) {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate('branchId');
  if (!order) return res.status(404).json({ message:'Order not found' });
  const { qrDataUrl, payload } = await createPromptPayQR({
    amount: order.amounts.total,
    promptpayId: order.branchId?.payment?.promptpayId
  });
  const payment = await Payment.create({
    orderId: order._id, method:'promptpay', amount: order.amounts.total,
    provider:'local', status:'pending'
  });
  res.json({ paymentId: payment._id, qrDataUrl, payload });
}

// webhook จาก gateway จริง ให้ยิงมาที่นี่
export async function webhook(req, res) {
  const { providerRef, orderId, status } = req.body; // ปรับตามผู้ให้บริการจริง
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message:'Order not found' });

  await Payment.findOneAndUpdate({ orderId }, { status: status==='success'?'captured':'failed', providerRef, paidAt: new Date() });
  if (status === 'success') {
    order.paymentStatus = 'paid';
    await order.save();
    emitTo(req.io, `order:${order._id}`, 'payment.status', { orderId: order._id, paymentStatus:'paid' });
    emitTo(req.io, `branch:${order.branchId}`, 'payment.status', { orderId: order._id, paymentStatus:'paid' });
  }
  res.json({ ok:true });
}
