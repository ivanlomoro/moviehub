import MovieModel from "../models/movie.model";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import GenreModel from "../models/genre.model";


export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await MovieModel.find().populate('genre')
        res.status(201).json(movies)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const createMovie = async (req: Request, res: Response) => {
    const { title, poster_image, score, genre } = req.body;
    const { userId } = req.params;

    try {
        const genreModel = await GenreModel.findOne({ name: genre });

        if (!genreModel) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        const movie = await MovieModel.create({ title, poster_image, score, genre: genreModel._id, userId });

        await UserModel.findByIdAndUpdate(
            { _id: userId },
            { $push: { movies: movie._id } }
        );

        await GenreModel.findByIdAndUpdate(
            { _id: genreModel._id },
            { $push: { movies: movie._id } }
        );

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params
    try {
        const movie = await MovieModel.findById({ _id: movieId }).populate('genre')
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    const { title, poster_image, score, genre } = req.body
    const { movieId } = req.params

    try {
        const movie = await MovieModel.findByIdAndUpdate(
            { _id: movieId },
            {
                $set: {
                    title, poster_image, score, genre
                }
            },
            { new: true }
        )
        res.status(201).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }

}

export const deleteMovieById = async (req: Request, res: Response) => {
    const { movieId, title } = req.params

    try {
        await MovieModel.findByIdAndDelete({ _id: movieId })
        res.status(204).send("Movie deleted " + title)
    } catch (error) {
        res.status(500).json(error)

    }
}

export const deleteAllMovies = async (req: Request, res: Response) => {
    try {
        const users = await MovieModel.deleteMany({});
        res.status(204).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}