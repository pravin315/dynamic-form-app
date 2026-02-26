import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  uri: process.env.MYSQL_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log("Database Connected ✅");

export default connection;