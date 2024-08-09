import express from 'express'; 
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { CORS_ORIGIN } from './config.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';

const app = express();

app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
})); /* Permite la comunicación entre el frontend y el backend en el mismo dominio */

app.use(morgan('dev')); /* Muestra las peticiones que llegan al backend */
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
