import React, { useState } from "react";
import axios from "axios";

function DynamicForm() {
  const [fields, setFields] = useState([]);
  const [formId, setFormId] = useState(null);

  /* ADD FIELD */
  const addField = () => {
    setFields([
      ...fields,
      { id: Date.now(), label: "", type: "text" },
    ]);
  };

  /* UPDATE FIELD */
  const updateField = (id, key, value) => {
    setFields(
      fields.map((f) =>
        f.id === id ? { ...f, [key]: value } : f
      )
    );
  };

  /* CREATE LINK */
  const createLink = async () => {
    const res = await axios.post(
      "http://localhost:8050/create-form",
      {
        title: "My Dynamic Form",
        fields,
      }
    );

    setFormId(res.data.formId);

    alert("Form Created ✅");
  };

  /* WHATSAPP SHARE */
  const shareWhatsApp = () => {
    const link = `http://192.168.1.5:5173/form/${formId}`;

    const text = `Please fill this form:\n${link}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Live Form Builder</h2>

      <button onClick={addField}>Add Column</button>

      <hr />

      {fields.map((field) => (
        <div key={field.id}>
          <input
            placeholder="Column Name"
            value={field.label}
            onChange={(e) =>
              updateField(field.id, "label", e.target.value)
            }
          />

          <select
            value={field.type}
            onChange={(e) =>
              updateField(field.id, "type", e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="date">Date</option>
          </select>
        </div>
      ))}

      <hr />

      <button onClick={createLink}>
        Create Shareable Link
      </button>

      {formId && (
        <>
          <p>
            Link:
            http://localhost:5173/form/{formId}
          </p>

          <button onClick={shareWhatsApp}>
            Share on WhatsApp 📱
          </button>
        </>
      )}
    </div>
  );
}

export default DynamicForm; 