import express from "express";
import routes from "./routes/index.js";
import dbConnect from "./config/database.js";
import { configDotenv } from "dotenv";
import initializeMiddlewares from "./middleware/index.js";

configDotenv();
const app = express();
app.use(express.json());
initializeMiddlewares(app);
dbConnect();
routes(app);

export default app;
