import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./FormPage.css";
const API = "https://dynamic-form-app-1.onrender.com";

function FormPage() {
  const { formId } = useParams();

  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});

  /* ---------- LOAD FORM ---------- */
  useEffect(() => {
    axios
      .get(`${API}/form/${formId}`)
      .then((res) => setForm(res.data))
      .catch(console.error);
  }, [formId]);

  /* ---------- INPUT CHANGE ---------- */
  const handleChange = (e, label) => {
    setAnswers((prev) => ({
      ...prev,
      [label]: e.target.value,
    }));
  };

  /* ---------- SUBMIT ---------- */
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/submit/${formId}`, answers);

      alert("Response Submitted ✅");
      setAnswers({});
    } catch (err) {
      console.error(err);
      alert("Submit failed ❌");
    }
  };

  if (!form) return <h3>Loading...</h3>;

  /* ---------- SAFE JSON ---------- */
  let fields = [];
  try {
    fields =
      typeof form.fields === "string"
        ? JSON.parse(form.fields)
        : form.fields;
  } catch {
    fields = [];
  }

  return (
  <div className="form-wrapper">
    <div className="form-box">
      <h2 className="form-title">{form.title}</h2>

      <form onSubmit={submitForm}>
        {fields.map((field) => (
          <div key={field.id} className="form-field">
            <label>{field.label}</label>

            <input
              type={field.type || "text"}
              required
              value={answers[field.label] || ""}
              onChange={(e) =>
                handleChange(e, field.label)
              }
            />
          </div>
        ))}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  </div>
);
}

export default FormPage;