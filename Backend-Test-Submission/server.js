import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import loggerMiddleware from "../LoggingMiddleware/loggerMiddleware.js";
import mongoose from "mongoose";
import urlRoutes from "./routes/UrlRoutes.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(loggerMiddleware);

const connectDb = async () => {
  try {
    const con = mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("connected succesfully");
  } catch (error) {
    console.log(error);
  }
};

connectDb();

app.use("/", urlRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "hello form URL " });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server running");
});
