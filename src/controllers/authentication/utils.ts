// user queries

export const adduserQuery: string = `INSERT INTO Users (_id, name, email, avatar, deviceId, userName, accountType, password, salt)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

export const getalluserQuery: string = `SELECT * FROM Users`;

export const getuserById: string = `SELECT * FROM Users WHERE _id = $1`;

export const userByEmail: string = `SELECT * FROM Users WHERE email = $1 AND password = $2`;
