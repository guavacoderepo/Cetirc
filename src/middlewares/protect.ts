import jwt from "jsonwebtoken";
import { errorres, successResponse } from "../utils/response";
import { findone } from "../utils/query";

const getuserById: string = `SELECT * FROM Users WHERE _id = $1`;

export default async function protect(req: any, res: any, next: any) {
  let token: string;

  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer")) {
    token = header.split(" ")[1];
  }

  //  make sure token exit
  if (!token!!) return errorres("Unauthorized user...", res, 401);

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET as string);

    const user = await findone(getuserById, [decoded.id]);

    req.user = user.rows[0];

    next();
  } catch (err) {
    next(err);
  }
}
