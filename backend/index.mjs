import express from "express";
import cors from "cors";
import pool from "./db.mjs";

const app = express();

app.use(cors());
app.use(express.json());

/* -------- CREATE USER -------- */
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  const result = await pool.query(
    "INSERT INTO users(name,email) VALUES($1,$2) RETURNING *",
    [name, email]
  );

  res.json(result.rows[0]);
});

/* -------- GET USERS -------- */
app.get("/users", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM users ORDER BY id DESC"
  );

  res.json(result.rows);
});

app.listen(process.env.PORT || 10000, () =>
  console.log("Server running 🚀")
);