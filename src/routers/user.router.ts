import express from "express";
import protect from "../middlewares/protect";
import { me, addAddress, getAddress } from "../controllers/users/index";

export default (router: express.Router) => {
  router.get("/user/me", protect, me);
  router.post("/user/address", protect, addAddress);
  router.get("/user/address", protect, getAddress);
};
