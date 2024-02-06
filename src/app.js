import express from "express";
import routes from "./routes/index.js";
import dbConnect from "./config/database.js";
import { configDotenv } from "dotenv";
import initializeMiddlewares from "./middleware/index.js";
import defineAndValidateModels from "./models/index.js";

configDotenv();
const app = express();
app.use(express.json());
initializeMiddlewares(app);
routes(app);
await dbConnect();
defineAndValidateModels();

export default app;
