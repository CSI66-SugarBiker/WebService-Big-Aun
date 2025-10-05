import Order from '../models/Order.js';
import Branch from '../models/Branch.js';
import { calcTotals } from '../services/calcTotals.js';
import { emitTo } from '../lib/socket.js';

export async function createOrder(req, res) {
  const { branchId, type, tableId, items, customer } = req.body;
  const totals = calcTotals(items);
  const order = await Order.create({
    branchId, type, tableId: tableId || null, customer: customer || {},
    items, amounts: totals, status: 'in_progress'
  });
  // broadcast ไป KDS/POS ของสาขานั้น
  const room = `branch:${branchId}`;
  emitTo(req.io, room, 'order.created', { orderId: order._id, summary: { type, total: totals.total } });
  res.status(201).json(order);
}

export async function listActive(req, res) {
  const { branchId, status } = req.query;
  const statuses = status ? status.split(',') : ['pending','in_progress','ready'];
  const orders = await Order.find({ branchId, status: { $in: statuses } }).sort({ createdAt: 1 }).lean();
  res.json(orders);
}

export async function getOrder(req, res) {
  const o = await Order.findById(req.params.id).lean();
  if (!o) return res.status(404).json({ message:'Not found' });
  res.json(o);
}

export async function updateStatus(req, res) {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new:true });
  if (!order) return res.status(404).json({ message:'Not found' });

  // emit ไปยัง room ที่เกี่ยวข้อง
  emitTo(req.io, `branch:${order.branchId}`, 'order.status', { orderId: order._id, status });
  emitTo(req.io, `order:${order._id}`, 'order.status', { orderId: order._id, status });

  res.json(order);
}
