import { Router, Request, Response } from "express";
import { createUser, deleteAllUsers, deleteUser, getAllUsers, getUserById, updateUser,  } from "../controllers/user.controllers";
import { check } from "../middleware/check.middleware";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);

userRoutes.get("/:userId", getUserById);

userRoutes.post("/", check, createUser);

userRoutes.patch("/:userId", updateUser);

userRoutes.delete("/:userId", deleteUser);

userRoutes.delete('/', deleteAllUsers);

export default userRoutes;