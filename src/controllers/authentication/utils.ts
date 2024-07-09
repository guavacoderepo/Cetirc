// user queries

export const adduserQuery: string = `INSERT INTO Users (_id, name, email, avatar, deviceId, userName, accountType, password, salt)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

export const getalluserQuery: string = `SELECT * FROM Users`;

export const getuserById: string = `SELECT * FROM Users WHERE _id = $1`;

export const userByEmail: string = `SELECT * FROM Users WHERE email = $1`;

export const updateOtpQuery: string = `UPDATE Users SET isEmailVarify = $1 WHERE _id = $2`;

// otp queries

export const addotpQuery: string = `INSERT INTO Otp (_id, email, expiration, otp)
    VALUES ($1, $2, $3, $4) RETURNING *`;

export const deleteotpByEmail: string = `DELETE FROM Otp WHERE email = $1`;

export const getOtpEmail: string = `SELECT * FROM Otp WHERE email = $1`;
