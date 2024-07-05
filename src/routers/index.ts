import express from "express";
import authrouter from "./auth.router";

const router = express.Router();

export default (): express.Router => {
  authrouter(router);
  return router;
};
