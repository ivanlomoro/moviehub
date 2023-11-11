import { Router } from "express";
import { createMovie, deleteAllMovies, getAllMovies } from "../controllers/movie.controllers";

const movieRoutes = Router();

movieRoutes.get("/", getAllMovies);

movieRoutes.delete('/', deleteAllMovies);

movieRoutes.post('/:userId', createMovie);

export default movieRoutes;