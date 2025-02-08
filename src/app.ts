import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

const app: Application = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Mount the routes
app.use(routes);

export default app;
