import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import authRoute from './routes/auth';

const app: Application = express();

app.use(helmet());
app.use(cors());

app.use('/auth', authRoute);

export default app;
