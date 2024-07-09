// user queries

export const getalluserQuery: string = `SELECT * FROM Users`;

export const getuserById: string = `SELECT * FROM Users WHERE _id = $1`;

export const userByEmail: string = `SELECT * FROM Users WHERE email = $1`;

export const updateimgQuery: string = `UPDATE Users SET avatar = $1 WHERE _id = $2`;

// address

export const insertAddress: string = `INSERT INTO Address (_id, userid, city, street, state, zipCode, lat, log)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

export const getAddressQuery: string = `SELECT * FROM Address WHERE userid = $1`;