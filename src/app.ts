// import module
import express, { Application, Response, Request } from "express";
import { dbconnection } from "../config/dbconfig";
import dotenv from "dotenv";
import { errorResponse } from "./utils/response";
// import routes

import router from "./routers/index";

const app: Application = express();

// include routes
dotenv.config({ path: "./config/.env" });

// include middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router());

app.use(errorResponse);

// test index
app.get("*", function (req: Request, res: Response) {
  res.send("everything is okay");
});

// start server
const port: number = parseInt(process.env.PORT as string) || 8000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

// connec to database
dbconnection();
