import { Request, Response, NextFunction } from "express";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

// type to store fields of User
type User = {
  // type to id field
  id: string;
  // type to store firstName field
  firstName: string;
  // type to store lastName field
  lastName: string;
  // type to store email field
  email: string;
  // type to store mobile field
  mobile: string;
  // type to store city field
  city: string;
};

const adapter = new FileSync<User[]>("usersData.json");

// const to store database object
const userDB = low(adapter);

// setting default data in database file
userDB.defaults({ users: [] }).write();

// function to fetch all users data
const getUsers = (req: Request, res: Response, next: NextFunction) => {
  // const to store all users data
  const users = userDB.get("users").value();
  res.status(200);
  if (users.length === 0) {
    res.send("No data available");
  } else {
    res.send(users);
  }
};

// function to create new user
const createUser = (
  req: Request<any, any, User, any>,
  res: Response,
  next: NextFunction
) => {
  // destructuring of request body field
  const { firstName, lastName, email, mobile, city } = req.body;
  // const to store data of new user
  const userToCreate = {
    id: new Date().toISOString(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobile: mobile,
    city: city,
  };

  userDB.get("users").push(userToCreate).write();
  res.status(201).send(userToCreate);
};

// function to fetch user data using id
const getUser = (
  req: Request<any, any, User, any>,
  res: Response,
  next: NextFunction
) => {
  // const to store entered id
  const idToFetch = req.params.userId;
  // const to store user data to display
  const userToDisplay = userDB.get("users").find({ id: idToFetch }).value();

  if (!userToDisplay) {
    res.statusCode = 404;
    try {
      throw new Error("User not found");
    } catch (e) {
      res.json("User with entered ID not found");
    }
  }
  res.status(200).send(userToDisplay);
};

// function to update user data using id
const updateUser = (
  req: Request<any, any, User, any>,
  res: Response,
  next: NextFunction
) => {
  // destructuring of request body field
  const { firstName, lastName, email, mobile, city } = req.body;
  // const to store entered id
  const idToUpdate = req.params.userId;
  // const to store user data to update
  const userToUpdate = userDB.get("users").find({ id: idToUpdate }).value();

  if (!userToUpdate) {
    res.statusCode = 404;
    try {
      throw new Error("User not found");
    } catch (e) {
      res.json("User with entered ID not found");
    }
  }

  userToUpdate.firstName = firstName || userToUpdate.firstName;
  userToUpdate.lastName = lastName || userToUpdate.lastName;
  userToUpdate.email = email || userToUpdate.email;
  userToUpdate.mobile = mobile || userToUpdate.mobile;
  userToUpdate.city = city || userToUpdate.city;

  userDB.update("users", (userToUpdate) => userToUpdate).write();
  res.status(200).json("User successfully updated");
};

// function to delete user data using id
const deleteUser = (
  req: Request<any, any, User, any>,
  res: Response,
  next: NextFunction
) => {
  // const to store entered id
  const idToDelete = req.params.userId;
  // const to store user data to delete
  const userToDelete = userDB.get("users").find({ id: idToDelete }).value();

  if (!userToDelete) {
    res.status(404);
    try {
      throw new Error("User not found");
    } catch (e) {
      res.json("User with entered ID not found");
    }
  }
  userDB.get("users").remove({ id: idToDelete }).write();
  res.status(200).json("User successfully deleted");
};

// function to delete all users data
const deleteAllUsers = (
  req: Request<any, any, User, any>,
  res: Response,
  next: NextFunction
) => {
  // const to store all users data
  const usersData = userDB.get("users").value();
  res.status(200);
  if (usersData.length === 0) {
    res.send("No data available");
  } else {
    userDB.set("users", []).write();
    res.json("Successfully deleted all data");
  }
};

export default {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
