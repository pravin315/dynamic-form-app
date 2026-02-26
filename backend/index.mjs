import express from "express";
import cors from "cors";

import {
  createForm,
  getForm,
  submitResponse,
} from "./src/controller/formController.mjs";

const app = express();
const port = 8050;

app.use(cors());
app.use(express.json());

app.post("/create-form", createForm);
app.get("/form/:formId", getForm);
app.post("/submit/:formId", submitResponse);

app.listen(port, () => {
  console.log("Server running ");
});