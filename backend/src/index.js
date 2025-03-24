import express from "express";
import dotenv from "dotenv"; //related to environment variables

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth_route.js";

dotenv.config();
const app = express();

//accessing PORT env variable
const PORT = process.env.PORT;

app.use(express.json());

// routes for authentication
app.use("/api/auth", authRoutes);

app.listen(5001, () => {
  console.log("server is running on PORT : " + PORT);
  connectDB();
});
