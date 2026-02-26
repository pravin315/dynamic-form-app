import pool from "../../db.mjs";

/* =========================
   CREATE FORM
========================= */
export const createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;

    const result = await pool.query(
      `INSERT INTO forms (title, fields)
       VALUES ($1, $2)
       RETURNING *`,
      [title, JSON.stringify(fields)]
    );

    res.json({
      formId: result.rows[0].id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating form");
  }
};

/* =========================
   GET FORM
========================= */
export const getForm = async (req, res) => {
  try {
    const { formId } = req.params;

    const result = await pool.query(
      "SELECT * FROM forms WHERE id=$1",
      [formId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching form");
  }
};

/* =========================
   SUBMIT RESPONSE
========================= */
export const submitResponse = async (req, res) => {
  try {
    const { formId } = req.params;

    // React sends answers directly
    const answers = req.body;

    await pool.query(
      `INSERT INTO responses (form_id, answers)
       VALUES ($1, $2)`,
      [formId, answers]
    );

    res.json({ message: "Submitted ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Submit failed");
  }
};