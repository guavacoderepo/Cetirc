import { Pool } from "pg";

const usertable: string = `
CREATE TABLE IF NOT EXISTS Users(
    _id VARCHAR(36) NOT NULL UNIQUE PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(255),
    isEmailVarify BOOLEAN DEFAULT FALSE ,
    isActive BOOLEAN DEFAULT TRUE,
    isBiometrics BOOLEAN DEFAULT FALSE,
    isNotification BOOLEAN DEFAULT TRUE,
    userName VARCHAR(50) UNIQUE NOT NULL,
    accountType VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    deviceId VARCHAR(255) DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
`;

const addresstable: string = `
CREATE TABLE IF NOT EXISTS Address(
    _id VARCHAR(36) NOT NULL UNIQUE PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    city VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipCode VARCHAR(50) NOT NULL,
    lat VARCHAR(100) UNIQUE NOT NULL,
    log VARCHAR(100) NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(_id)
);`;

const otptable: string = `
CREATE TABLE IF NOT EXISTS Otp (
    _id VARCHAR(36) NOT NULL UNIQUE PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    expiration TIMESTAMP NOT NULL,
    otp VARCHAR(255) NOT NULL
);
`;

const banktable: string = `
CREATE TABLE IF NOT EXISTS Bank (
    _id VARCHAR(36) NOT NULL UNIQUE PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    accountName VARCHAR(255) NOT NULL,
    bankName VARCHAR(255) NOT NULL,
    iban VARCHAR(255) NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(_id)
);
`;

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "cetirc",
  user: "postgres",
  password: "evan",
});

export async function dbconnection() {
  pool.connect(async (err) => {
    if (err) {
      console.log(err);
      err;
    } else {
      // Successfully connected to the database
      // Perform database operations here

      await pool.query(usertable);
      await pool.query(otptable);
      await pool.query(addresstable);
      await pool.query(banktable);

      console.log("connected...");
    }
  });
}
