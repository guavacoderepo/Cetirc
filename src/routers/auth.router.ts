import express from "express";

import { create_account, login } from "../controllers/authentication/index";

export default (router: express.Router) => {
  router.post("/auth/account", create_account);
  router.post("/auth/login", login);
};
