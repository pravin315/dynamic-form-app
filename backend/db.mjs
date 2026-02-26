import dotenv from "dotenv";
dotenv.config();   // ⭐ ADD THIS LINE

import mysql from "mysql2/promise";

const connection = await mysql.createConnection(
  process.env.MYSQL_URL
);

console.log("Database Connected ✅");

export default connection;