import express from 'express';
import userRoutes from './routes/user.routes';
import moviesRouter from './routes/movie.routes';

const app = express();
app.use(express.json());

app.use("/user", userRoutes);
app.use("/movie", moviesRouter);

export default app