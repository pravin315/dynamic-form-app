import dotenv from "dotenv";
dotenv.config();   // ✅ MUST BE FIRST

import express from "express";
import cors from "cors";

import {
  createForm,
  getForm,
  submitResponse,
} from "./src/controller/formController.mjs";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Dynamic Form API Running ✅");
});

app.post("/create-form", createForm);
app.get("/form/:formId", getForm);
app.post("/submit/:formId", submitResponse);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});