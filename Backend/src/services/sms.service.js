import { env } from '../config/env.js';
export async function sendSms(to, message) {
  if (!env.smsApiKey) {
    console.log(`[sms:dry-run] to=${to} msg=${message}`);
    return { ok:true, dryRun:true };
  }
  // TODO: integrate provider (Twilio/Vonage/Thai SMS gateway)
  return { ok:true };
}
