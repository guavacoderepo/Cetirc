import express from "express";

import {
  signup,
  login,
  otp,
  otpVerify,
} from "../controllers/authentication/index";

export default (router: express.Router) => {
  router.post("/auth/account", signup);
  router.post("/auth/login", login);
  router.post("/auth/otp", otp);
  router.post("/auth/otp/verify", otpVerify);
};
