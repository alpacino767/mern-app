
require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from 'path';

import authRoutes from "./routes/auth";
import categoryRoutes from './routes/category'
import postRoutes from './routes/post'
import websiteRoutes from "./routes/website"

const morgan = require("morgan");

const app = express();

// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use ("/api", categoryRoutes)
app.use("/api", postRoutes)
app.use("/api", websiteRoutes)

// only when ready to deploy
// app.use(express.static(path.resolve(__dirname, './client/out')));
// only when ready to deploy
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/out', 'index.html'));
// });

app.listen(8000, () => console.log("Server running on port 8000"));
