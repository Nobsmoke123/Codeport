import http from 'http';
import app from './app';
import { Logger } from './utils/logger';
import DatabaseConnection from './utils/connection';
import dotenv from 'dotenv';
import './global/global.t';

dotenv.config();

const server = http.createServer(app);

async function startServer() {
  try {
    const PORT = process.env.PORT || 8000;

    // Connect to the database
    await DatabaseConnection.connect();

    server.listen(PORT, () => {
      Logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    Logger.error('Application Error: ', error);
    process.exit(1);
  }
}

const gracefulShutdown = async () => {
  Logger.info('\n🛑 Graceful shutdown in progress...');

  // Close MongoDB Connection
  try {
    await DatabaseConnection.closeConnection();
    Logger.info('✅ MongoDB connection closed.');
  } catch (error) {
    Logger.error('❌ Error closing MongoDB connection:', error);
  }

  // Close down Express server
  server.close(() => {
    console.log('✅ HTTP server closed.');
    process.exit(0); // Exit the process
  });

  // Force exit if cleanup takes too long
  setTimeout(() => {
    console.warn('❗Forced shutdown...');
    process.exit(1);
  }, 5000);
};

startServer();

// Listen for termination signals
process.on('SIGINT', gracefulShutdown); // Ctrl + C
process.on('SIGTERM', gracefulShutdown); // Kill command used in docker and kubernetes

process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Unhandled Promise Rejection:', promise, 'Reason:', reason);
});
