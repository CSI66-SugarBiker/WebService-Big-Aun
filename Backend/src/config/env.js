import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES || '8h',
  promptpayId: process.env.PROMPTPAY_ID,
  smsApiKey: process.env.SMS_API_KEY || '',
  smsSender: process.env.SMS_SENDER || 'POS',
  publicBaseUrl: process.env.PUBLIC_BASE_URL || 'http://localhost:4000'
};
