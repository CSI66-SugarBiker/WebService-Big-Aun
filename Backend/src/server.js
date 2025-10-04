import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { setupSocket } from './lib/socket.js';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/error.js';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: env.corsOrigin, methods: ['GET','POST','PUT','PATCH'] }
});

// inject io ใน req สำหรับ controller ที่ต้อง emit
app.use((req, res, next) => { req.io = io; next(); });

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit:'2mb' }));

//health check
app.get('/health', (req, res) => res.status(200).send('OK'));

// api
app.use('/api', apiRoutes);

// error
app.use(errorHandler);

// socket
setupSocket(io);

// start
await connectDB();
server.listen(env.port, () => {
  console.log(`[server] http://localhost:${env.port} (${env.nodeEnv})`);
});
