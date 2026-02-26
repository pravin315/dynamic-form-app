import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FormPage() {
  const { formId } = useParams();

  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});

  /* LOAD FORM */
  useEffect(() => {
    axios
      .get(`http:// https://dynamic-form-y9r4.onrender.com/form/${formId}`)
      .then((res) => setForm(res.data));
  }, [formId]);

  /* INPUT CHANGE */
  const handleChange = (e, label) => {
    setAnswers({
      ...answers,
      [label]: e.target.value,
    });
  };

  /* SUBMIT RESPONSE */
  const submitForm = async (e) => {
    e.preventDefault();

    await axios.post(
      `http://localhost:8050/submit/${formId}`,
      answers
    );

    alert("Response Submitted ✅");
  };

  if (!form) return <h3>Loading...</h3>;

  /* FIX JSON ERROR */
  const fields =
    typeof form.fields === "string"
      ? JSON.parse(form.fields)
      : form.fields;

  return (
    <div style={{ padding: 20 }}>
      <h2>{form.title}</h2>

      <form onSubmit={submitForm}>
        {fields.map((field) => (
          <div key={field.id}>
            <label>{field.label}</label>

            <input
              type={field.type}
              required
              onChange={(e) =>
                handleChange(e, field.label)
              }
            />
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormPage;