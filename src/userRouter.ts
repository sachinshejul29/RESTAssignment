import express from "express";
import userController from "./userController";

// const to store routing object
const router = express.Router();

// setting up the get/fetch request for all data
router.get("/users", userController.getUsers);

// setting up the post/write request
router.post("/user", userController.createUser);

// setting up the get/fetch request for particular ID
router.get("/user/:userId", userController.getUser);

// setting up the put/update request for particular ID
router.put("/user/:userId", userController.updateUser);

// setting up the delete request for particular ID
router.delete("/user/:userId", userController.deleteUser);

// setting up the delete request for all data
router.delete("/users/deleteAll", userController.deleteAllUsers);

export default router;
