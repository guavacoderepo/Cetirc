import express from "express";
import protect from "../middlewares/protect";
import { addCard, allCards, deletecard } from "../controllers/cards/index";

export default (router: express.Router) => {
  router.post("/cards", protect, addCard);
  router.delete("/cards/:id", protect, deletecard);
  router.get("/cards/all", protect, allCards);
};
