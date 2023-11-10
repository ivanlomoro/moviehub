import { Router } from "express";
import { createMovie } from "../controllers/movies.controllers";

const moviesRouter = Router();

moviesRouter.post('/:userId', createMovie);

export default moviesRouter;