import { Request, Response } from "express"
import UserModel from "../models/user.model";

export const getAllUsers = (req: Request, res: Response) => {
    res.status(200).send("Get all users");
}

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) throw new Error("Missing fields");

        const newUser = await UserModel.create({ name, email, password });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await UserModel.findById({ _id: userId }).populate('movies');

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email } = req.body;
    try {
        const user = await UserModel.findByIdAndUpdate(
            { _id: userId },
            {
                $set: { name: name, email: email }
            },
            { new: true }
        );
        
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteUser = (req: Request, res: Response) => {
    res.status(200).send("User deleted");
}