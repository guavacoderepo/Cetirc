import { Request, Response, NextFunction } from "express";
import * as v from "../../utils/validation";
import {
  adduserQuery,
  userByEmail,
  addotpQuery,
  deleteotpByEmail,
  getOtpEmail,
  updateOtpQuery,
} from "./utils";
import { findone, insert, deleteOne, updateOne } from "../../utils/query";
import { Result } from "../../utils/types";
import * as t from "./types";
import { successResponse, errorres } from "../../utils/response";
import { Options, sendMail } from "../../../services/mail";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response, next: NextFunction) {
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

    successResponse(
      res,
      200,
      "User created successfully... proceed to email verify",
      {}
    );
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    let { email, password } = req.body;

    // check password varify
    if (!v.passwordValidate(password))
      return errorres("Invalid error password..", res, 400);

    // check email varify
    if (!v.emailvalidate(email))
      return errorres("Invalid email formate..", res, 400);

    // create user
    const result = await findone(userByEmail, [email]);

    if (result.rows.length === 0) return errorres("User not found..", res, 401);

    if (!result.rows[0].isemailvarify)
      return errorres("Account not verified.. please verify email.", res, 401);

    password = v.authentication(result.rows[0].salt, password);

    if (result.rows[0].password !== password)
      return errorres("User not found..", res, 401);

    // console.log(result.rows[0]);

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

    const token: string = jwt.sign(
      { id: result.rows[0]._id },
      process.env.SECRET as string
    );

    console.log(token);

    return res.status(200).json({ status: true, payload: user, token: token });
  } catch (err) {
    next(err);
  }
}

export async function otp(req: Request, res: Response, next: NextFunction) {
  try {
    let { email } = req.body;

    // check email varify
    if (!v.emailvalidate(email))
      return errorres("Invalid email formate..", res, 400);

    const result = await findone(userByEmail, [email]);

    if (result.rows.length === 0)
      return errorres("User does not exit..", res, 401);

    // generate otp

    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save otp and send to user

    const _id = v.uuid(10);
    const newDate = Date.now() + 15 * 60 * 1000;
    const expiration = new Date(newDate);

    await deleteOne(deleteotpByEmail, [email]);

    const otpres = await insert(addotpQuery, [_id, email, expiration, otp]);

    const option: Options = {
      to: email,
      subject: "Signup OTP Verify.",
      html: `<h3>Your OTP is here 👋</h3>
      <br>
      <h1> ${otp} </h1>
      `,
    };

    sendMail(option);

    // create user

    successResponse(res, 200, "Opt sent successfully.. check your email", {
      otp,
    });
  } catch (err) {
    next(err);
  }
}

export async function otpVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { email, otp } = req.body;

    // check email varify
    if (!v.emailvalidate(email))
      return errorres("Invalid email formate..", res, 400);

    const result = await findone(userByEmail, [email]);

    if (result.rows.length === 0)
      return errorres("User does not exit..", res, 401);

    const otpres = await findone(getOtpEmail, [email]);

    if (otpres.rows.length === 0)
      return errorres("Otp user does not exit..", res, 401);

    const user = otpres.rows[0];

    if (!(user.expiration > Date.now() && otp === user.otp))
      return errorres("invalid otp..", res, 401);

    await updateOne(updateOtpQuery, [true, result.rows[0]._id]);

    await deleteOne(deleteotpByEmail, [email]);

    const option: Options = {
      to: email,
      subject: "Verification successfull",
      html: `<h3>${result.rows[0].name}, your OTP verification was successful ✨⭐️</h3>
      <br>
      
      <h4> Your OTP verification was successfull, you can now enjoy our app. </h4>
      <img src = "src/assets/testimg.jpg" >
      `,
    };

    sendMail(option);

    // create user

    successResponse(res, 200, "user verified successfully..", {});
  } catch (err) {
    next(err);
  }
}
