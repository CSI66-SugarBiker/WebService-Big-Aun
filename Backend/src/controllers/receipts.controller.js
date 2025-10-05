import fs from 'fs';
import path from 'path';
import express from 'express';
import Order from '../models/Order.js';
import { generateReceiptPdf } from '../services/receipt.service.js';

export async function getReceipt(req, res) {
  const order = await Order.findById(req.params.id).lean();
  if (!order) return res.status(404).json({ message: 'Not found' });

  const fileUrl = await generateReceiptPdf(order);
  res.json({ url: fileUrl });
}

// static serve
export function mountReceiptStatic(app) {
  const dir = path.join(process.cwd(), 'tmp', 'receipts');

  app.use('/receipts', (req, res, next) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    next();
  });

  app.use('/receipts', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  app.use('/receipts', express.static(dir));
}
