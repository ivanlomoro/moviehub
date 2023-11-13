import { Request, Response } from "express"
import prisma from "../db/client";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                movies: true,
            },
        });
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) throw new Error("Missing fields");

        const newUser = await prisma.user.create({ data: { name, email, password } });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                movies: true
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { name, email },
        });

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.delete({
            where: { id: userId }
        });
        res.status(204).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.deleteMany({});
        res.status(204).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};