import QRCode from 'qrcode';
import { env } from '../config/env.js';

/**
 * สร้าง payload/ภาพ QR แบบไดนามิก (เดโม: ใช้เบอร์/ID จาก env หรือ branch.payment.promptpayId)
 * โปรดต่อยอดด้วย lib EMV/PromptPay จริงเพื่อเข้มงวด format
 */
export async function createPromptPayQR({ amount, promptpayId }) {
  const id = promptpayId || env.promptpayId;
  const payload = `PROMPTPAY_ID:${id}|AMOUNT:${amount.toFixed(2)}`; // placeholder
  const qrDataUrl = await QRCode.toDataURL(payload, { margin:1, scale:6 });
  return { payload, qrDataUrl };
}
