import express from 'express';
import shotsRoutes from './routes/shots.routes';
import playerRoutes from './routes/players.routes';

const app = express();

app.use(express.json());

app.use("/api/shots", shotsRoutes);
app.use("/api/players", playerRoutes);

export default app;