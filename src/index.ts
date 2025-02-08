import http from 'http';
import dotenv from 'dotenv';
import app from './app';
import { Logger } from './utils/logger';
import { Application } from 'express';
import DatabaseConnection from './utils/connection';

dotenv.config();

async function startServer(app: Application) {
  const PORT = process.env.PORT || 8000;

  // Connect to the database
  await DatabaseConnection.connect();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`);
  });
}

startServer(app);
