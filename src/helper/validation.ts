import crypto from "crypto";

export const random = () => crypto.randomBytes(50).toString("base64");

export const uuid = (size: number) => crypto.randomBytes(size).toString("hex");

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.SECRET!!)
    .digest("hex");
};

export const passwordValidate = (password: string): boolean => {
  const upper = /[A-Z]/;
  const lower = /[a-z]/;
  const num = /[0-9]/;

  return (
    password.length >= 6 &&
    upper.test(password) &&
    lower.test(password) &&
    num.test(password)
  );
};

export const emailvalidate = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return re.test(email);
};
