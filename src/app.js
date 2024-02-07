import express from "express";
import routes from "./routes/index.js";
import dbConnect from "./config/database.js";
import { initializeDatabase } from "./config/database.js";
import initializeMiddlewares from "./middleware/index.js";
global.dbConnectionstatus = false;
global.areModelsInitialized = false;
initializeDatabase();
const app = express();
app.use(express.json());
initializeMiddlewares(app);
routes(app);
dbConnect();

export default app;
