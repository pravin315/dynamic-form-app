import db from "../../db.mjs";
import { v4 as uuidv4 } from "uuid";

/* ================= CREATE FORM ================= */

export const createForm = async (req, res) => {
  const { title, fields } = req.body;

  const formId = uuidv4();

  await db.execute(
    "INSERT INTO forms (id,title,fields) VALUES (?,?,?)",
    [formId, title, JSON.stringify(fields)]
  );

  res.json({
    link: `http://localhost:5173/form/${formId}`,
    formId,
  });
};

/* ================= GET FORM ================= */

export const getForm = async (req, res) => {
  const { formId } = req.params;

  const [rows] = await db.execute(
    "SELECT * FROM forms WHERE id=?",
    [formId]
  );

  res.json(rows[0]);
};

/* ================= SUBMIT RESPONSE ================= */

export const submitResponse = async (req, res) => {
  const { formId } = req.params;
  const answers = req.body;

  await db.execute(
    "INSERT INTO responses (form_id,answers) VALUES (?,?)",
    [formId, JSON.stringify(answers)]
  );

  res.json({ message: "Saved ✅" });
};