import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';

export const app = express();

config();

app.get('/', (req, res) => {
  res.send('Server is Working');
});

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

//error Middlewares
app.use(errorMiddleware);
