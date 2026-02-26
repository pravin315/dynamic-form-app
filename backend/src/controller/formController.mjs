import pool from "../../db.mjs";

// CREATE FORM
export const createForm = async (req, res) => {
  try {
    const { title } = req.body;

    const result = await pool.query(
      "INSERT INTO forms(title) VALUES($1) RETURNING *",
      [title]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating form");
  }
};

// GET FORM
export const getForm = async (req, res) => {
  const { formId } = req.params;

  const result = await pool.query(
    "SELECT * FROM forms WHERE id=$1",
    [formId]
  );

  res.json(result.rows[0]);
};

// SUBMIT RESPONSE
export const submitResponse = async (req, res) => {
  const { formId } = req.params;
  const { response } = req.body;

  await pool.query(
    "INSERT INTO responses(form_id, response) VALUES($1,$2)",
    [formId, response]
  );

  res.json({ message: "Submitted ✅" });
};