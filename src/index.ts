import http from 'http';
import dotenv from 'dotenv';
import app from './app';
import { Logger } from './utils/logger';

dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}`);
});
