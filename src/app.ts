import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoute from './routes/auth';

const app: Application = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);

export default app;
