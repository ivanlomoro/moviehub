import { Request, Response } from "express";
import prisma from "../db/client";


export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await prisma.movies.findMany({
            include: {
                Genre: true
            },
        });

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createMovie = async (req: Request, res: Response) => {
    const { title, poster_image, score, genre } = req.body;
    const { userId } = req.params;

    try {
        const genreModel = await prisma.genre.findUnique({
            where: {
                name: genre,
            },
        });

        if (!genreModel) {
            return res.status(404).json({ message: 'Genre not found' });
        }

        const movie = await prisma.movies.create({
            data: {
                title,
                poster_image,
                score,
                genre,
                Genre: {
                    connect: { id: genreModel.id },
                },
                User: {
                    connect: { id: userId },
                },
            },
        });

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params
    try {
        const movie = await prisma.movies.findUnique({
            where: {
                id: movieId,
            },
            include: {
                Genre: true,
            },
        });
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateMovie = async (req: Request, res: Response) => {
    const { title, poster_image, score, genre } = req.body
    const { movieId } = req.params

    try {
        const movie = await prisma.movies.update({
            where: {
                id: movieId,
            },
            data: {
                title,
                poster_image,
                score,
                genre,
                Genre: {
                    connect: { name: genre },
                },
            },
        });
        res.status(201).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }

}

export const deleteMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params

    try {
        const deletedMovie = await prisma.movies.delete({
            where: {
                id: movieId,
            },
        })
        res.status(204).send("Movie deleted: " + deletedMovie.title)
    } catch (error) {
        res.status(500).json(error)

    }
}

export const deleteAllMovies = async (req: Request, res: Response) => {
    try {
        const users = await prisma.movies.deleteMany({});
        res.status(204).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}