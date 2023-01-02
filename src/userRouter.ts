import express from "express";
import userController from "./userController";

// const to store routing object
const router = express.Router();

// GET feed/users
router.get("/users", userController.getUsers);

// POST feed/user
router.post("/user", userController.createUser);

// GET feed/user/userId
router.get("/user/:userId", userController.getUser);

// PUT feed/user/:userId
router.put("/user/:userId", userController.updateUser);

// DELETE feed/user/:userId
router.delete("/user/:userId", userController.deleteUser);

// DELETE feed/users/deleteAll
router.delete("/users/deleteAll", userController.deleteAllUsers);

export = router;
