import { Router, Request, Response } from "express";
import { createUser, deleteAllUsers, deleteUser, getAllUsers, getUserById, updateUser, } from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:userId", getUserById);
userRoutes.post("/", createUser);
userRoutes.patch("/:userId", updateUser);
userRoutes.delete("/:userId", deleteUser);
userRoutes.delete('/', deleteAllUsers);

export default userRoutes;