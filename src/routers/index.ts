import express from "express";
import authrouter from "./auth.router";
import userRouter from "./user.router";
import cardsRouter from "./cards.router";

const router = express.Router();

export default (): express.Router => {
  authrouter(router);
  userRouter(router);
  cardsRouter(router);
  return router;
};
