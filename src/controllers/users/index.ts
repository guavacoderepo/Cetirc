import { Response, NextFunction } from "express";
import { findone, insert, deleteOne, updateOne } from "../../utils/query";
import { successResponse, errorres } from "../../utils/response";
import * as v from "../../utils/validation";
import { insertAddress, getAddressQuery } from "./utils";
import * as t from "./types";

export async function me(req: any, res: Response, next: NextFunction) {
  try {
    const user: t.Users = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      userName: req.user.username,
      accountType: req.user.accounttype,
      isEmailVarify: req.user.isemailVarify,
      isActive: req.user.isactive,
      isBiometrics: req.user.isbiometrics,
      isNotification: req.user.isnotification,
      avatar: req.user.avatar,
    };

    successResponse(res, 200, "", user);
  } catch (err) {
    next(err);
  }
}

export async function addAddress(req: any, res: Response, next: NextFunction) {
  try {
    const { city, street, state, zipCode, lat, log } = req.body;
    const user = req.user;

    if (!user) return errorres("Unauthorized user...", res, 400);

    const uid = v.uuid(10);

    const values = [uid, user._id, city, street, state, zipCode, lat, log];

    const address = await insert(insertAddress, values);

    if (address.rows.length === 0)
      return errorres("Error creating address..", res, 401);

    // console.log(address.rows[0]);

    successResponse(res, 201, "Address added", address.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function getAddress(req: any, res: Response, next: NextFunction) {
  try {
    const user = req.user;

    if (!user) return errorres("Unauthorized user...", res, 400);

    const address = await findone(getAddressQuery, [user._id]);

    successResponse(res, 200, "", address.rows[0]);
  } catch (err) {
    next(err);
  }
}


