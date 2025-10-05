import PDFDocument from 'pdfkit';
import { env } from '../config/env.js';
import path from 'path';
import fs from 'fs';

export async function generateReceiptPdf(order) {
  const dir = path.join(process.cwd(), 'tmp', 'receipts');
  fs.mkdirSync(dir, { recursive:true });
  const file = path.join(dir, `${order._id}.pdf`);
  const doc = new PDFDocument({ margin:36 });
  const stream = fs.createWriteStream(file);
  doc.pipe(stream);

  doc.fontSize(16).text('ใบเสร็จรับเงิน', { align:'center' });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`เลขที่: ${order._id}`);
  doc.text(`วันที่: ${new Date(order.createdAt).toLocaleString('th-TH')}`);
  doc.moveDown();

  order.items.forEach(it => {
    doc.text(`${it.name} x${it.qty}  ${it.lineTotal?.toFixed(2) ?? (it.unitPrice*it.qty).toFixed(2)}฿`);
    if (it.modifiers?.length) doc.fontSize(10).fillColor('#666')
      .text(` - ${JSON.stringify(it.modifiers)}`).fillColor('#000').fontSize(12);
  });
  doc.moveDown();
  doc.text(`รวม: ${order.amounts.total.toFixed(2)}฿`, { align:'right' });

  doc.moveDown(2).fontSize(10).text('ขอบคุณที่อุดหนุน 🙏', { align:'center' });
  doc.end();

  await new Promise(res => stream.on('finish', res));
  return `${env.publicBaseUrl}/receipts/${order._id}.pdf`;
}
