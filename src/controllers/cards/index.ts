import { Response, NextFunction } from "express";
import { findone, insert, deleteOne, updateOne, find } from "../../utils/query";
import { successResponse, errorres } from "../../utils/response";
import * as v from "../../utils/validation";
import { addCardquery, getcardsQuery, deletecardsQuery } from "./util";

export async function addCard(req: any, res: Response, next: NextFunction) {
  try {
    const { cardNumber, holderName, cvv, expirationDate } = req.body;

    const user = req.user;

    if (!user) return errorres("Unauthorized user...", res, 400);

    const uid = v.uuid(10);

    const values = [uid, user._id, cardNumber, holderName, cvv, expirationDate];

    const address = await insert(addCardquery, values);

    if (address.rows.length === 0)
      return errorres("Error creating address..", res, 401);

    // console.log(address.rows[0]);

    successResponse(res, 201, "card added", address.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function allCards(req: any, res: Response, next: NextFunction) {
  try {
    const user = req.user;

    if (!user) return errorres("Unauthorized user...", res, 400);

    const address = await findone(getcardsQuery, [user._id]);

    if (address.rows.length === 0)
      return errorres("Error getting cards..", res, 401);

    // console.log(address.rows[0]);

    successResponse(res, 200, "", address.rows);
  } catch (err) {
    next(err);
  }
}

export async function deletecard(req: any, res: Response, next: NextFunction) {
  try {
    const user = req.user;

    const id = req.params.id;

    if (!user) return errorres("Unauthorized user...", res, 400);

    // console.log([id, user._id]);

    const card = await deleteOne(deletecardsQuery, [id, user._id]);

    if (card.rowCount === 0) return errorres("Error deleting card..", res, 401);

    // console.log(address.rows[0]);

    successResponse(res, 200, "card deleted successfuly..", {});
  } catch (err) {
    next(err);
  }
}
