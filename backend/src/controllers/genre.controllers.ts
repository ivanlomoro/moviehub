import { Response, Request } from "express";
import GenreModel from "../models/genre.model";

export const getAllGenres = async (req: Request, res: Response) => {
    try {
        const genres = await GenreModel.find()
        res.status(200).json(genres)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getGenreById = async (req: Request, res: Response) => {
    const { genreId } = req.params
    try {
        const genres = await GenreModel.findById({ _id: genreId })
        res.status(200).json(genres)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const createGenre = async (req: Request, res: Response) => {
    const { name } = req.body
    try {
        if (!name) throw new Error("missing fields")
        const newUser = await GenreModel.create({ name })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const updateGenre = async (req: Request, res: Response) => {
    const { genreId } = req.params
    const { name, movies } = req.body
    try {
        const user = await GenreModel.findByIdAndUpdate(
            { _id: genreId },
            { $set: { name: name, movies: movies } },
            { new: true }
        )
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteGenreById = async (req: Request, res: Response) => {
    const { genreId } = req.params

    try {
        await GenreModel.findByIdAndDelete({ _id: genreId })
        res.status(204).send("Genre deleted")
    } catch (error) {
        res.status(500).json(error)

    }
}

export const deleteAllGenres = async (req: Request, res: Response) => {
    try {
        const genres = await GenreModel.deleteMany({});
        res.status(204).json(genres);
    } catch (error) {
        res.status(500).json(error);
    }
}