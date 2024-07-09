export const addCardquery: string = `INSERT INTO Cards (_id, userid, cardNumber, holderName, cvv, expirationDate)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

export const getcardsQuery: string = `SELECT * FROM Cards WHERE userid = $1`;

export const deletecardsQuery: string = `DELETE FROM Cards WHERE _id = $1 AND userid = $2`;
