import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Pravinbm@315",
  database: "forms_db",
});

console.log("Database Connected ");

export default db;