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
  const handleChange = (value, label) => {
    setAnswers((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  /* ---------- CHECKBOX CHANGE ---------- */
  const handleCheckbox = (label, option) => {
    setAnswers((prev) => {
      const current = prev[label] || [];

      if (current.includes(option)) {
        return {
          ...prev,
          [label]: current.filter((o) => o !== option),
        };
      } else {
        return {
          ...prev,
          [label]: [...current, option],
        };
      }
    });
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

  /* ---------- FIELD RENDERER ---------- */
  const renderField = (field) => {
    const value = answers[field.label] || "";

    switch (field.type) {
      /* TEXT TYPES */
      case "text":
      case "number":
      case "email":
      case "date":
        return (
          <input
            type={field.type}
            required
            value={value}
            onChange={(e) =>
              handleChange(e.target.value, field.label)
            }
          />
        );

      /* TEXTAREA */
      case "textarea":
        return (
          <textarea
            required
            value={value}
            onChange={(e) =>
              handleChange(e.target.value, field.label)
            }
          />
        );

      /* DROPDOWN */
      case "dropdown":
        return (
          <select
            required
            value={value}
            onChange={(e) =>
              handleChange(e.target.value, field.label)
            }
          >
            <option value="">Select</option>
            {field.options?.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      /* RADIO */
      case "radio":
        return field.options?.map((opt, i) => (
          <label key={i} style={{ marginRight: 10 }}>
            <input
              type="radio"
              name={field.label}
              value={opt}
              checked={value === opt}
              onChange={(e) =>
                handleChange(e.target.value, field.label)
              }
            />
            {opt}
          </label>
        ));

      /* CHECKBOX */
      case "checkbox":
        return field.options?.map((opt, i) => (
          <label key={i} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={
                (answers[field.label] || []).includes(opt)
              }
              onChange={() =>
                handleCheckbox(field.label, opt)
              }
            />
            {opt}
          </label>
        ));

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) =>
              handleChange(e.target.value, field.label)
            }
          />
        );
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="form-wrapper">
      <div className="form-box">
        <h2 className="form-title">{form.title}</h2>

        <form onSubmit={submitForm}>
          {fields.map((field, index) => (
            <div key={index} className="form-field">
              <label>{field.label}</label>
              {renderField(field)}
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