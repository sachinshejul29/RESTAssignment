import express from "express";
import bodyParser from "body-parser";
import router from "./userRouter";

// code for initial parsing and header setting
const app = express();
app.use(bodyParser.json());

// setting initial headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Setting up the route
app.use("/feed", router);

// setting up the port
app.listen(8080, () => {
  console.log("listening");
});
