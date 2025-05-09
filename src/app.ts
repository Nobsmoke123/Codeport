import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import ErrorHandler from './middlewares/ErrorHandler';
import { Error404Handler } from './middlewares';

const app: Application = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Mount the routes
app.use(routes);

// Middleware - Catch 404 Errors
app.use(Error404Handler);

// Middleware - Handle all Errors
app.use(ErrorHandler);

export default app;
