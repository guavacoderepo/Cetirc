import { Request, Response, NextFunction } from "express";
import * as v from "../../helper/validation";
import { adduserQuery, userByEmail } from "./utils";
import { findone, insert } from "../../helper/query";
import { Result } from "../../utils/types";
import * as t from "./types";
import { successResponse } from "../../utils/response";

export async function create_account(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { name, email, deviceId, accountType, avatar, password } = req.body;

    // check password varify
    if (!v.passwordValidate(password))
      return Result.err(new Error("Invalid error password.."));

    // check email varify
    if (!v.emailvalidate(email))
      return Result.err(new Error("Invalid email formate.."));

    // generate password salt and _id
    const salt = v.random();
    const _id = v.uuid(10);

    password = v.authentication(salt, password);
    // console.log(v.authentication(salt, password));

    const username = `${name[0]}_${v.uuid(4)}`;

    // create user
    const result = await insert(adduserQuery, [
      _id,
      name,
      email,
      avatar,
      deviceId,
      username,
      accountType,
      password,
      salt,
    ]);

    if (result.rows.length === 0)
      return Result.err(new Error("Failed to create user."));

    console.log(result.rows[0]);

    const user: t.Users = {
      _id: result.rows[0]._id,
      name: result.rows[0].name,
      email: result.rows[0].email,
      userName: result.rows[0].username,
      accountType: result.rows[0].accounttype,
      isEmailVarify: result.rows[0].isemailVarify,
      isActive: result.rows[0].isactive,
      isBiometrics: result.rows[0].isbiometrics,
      isNotification: result.rows[0].isnotification,
      avatar: result.rows[0].avatar,
    };

    successResponse(res, 200, "", user);
  } catch (err) {
    next(err);
  }
}


export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    let { email, password } = req.body;

    // check password varify
    if (!v.passwordValidate(password))
      return Result.err(new Error("Invalid error password.."));

    console.log("i'm here.........");

    // check email varify
    if (!v.emailvalidate(email))
      return Result.err(new Error("Invalid email formate.."));

    // generate password salt and _id
    const salt = v.random();

    password = v.authentication(salt, password);
    // console.log(v.authentication(salt, password));

    // create user
    const result = await findone(userByEmail, [email, password]);

    if (result.rows.length === 0)
      return Result.err(new Error("Failed to create user."));

    console.log(result.rows[0]);

    const user: t.Users = {
      _id: result.rows[0]._id,
      name: result.rows[0].name,
      email: result.rows[0].email,
      userName: result.rows[0].username,
      accountType: result.rows[0].accounttype,
      isEmailVarify: result.rows[0].isemailVarify,
      isActive: result.rows[0].isactive,
      isBiometrics: result.rows[0].isbiometrics,
      isNotification: result.rows[0].isnotification,
      avatar: result.rows[0].avatar,
    };

    successResponse(res, 200, "", user);
  } catch (err) {
    next(err);
  }
}
