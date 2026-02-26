import React, { useState } from "react";
import axios from "axios";

function DynamicForm() {
  const [fields, setFields] = useState([]);
  const [shareLink, setShareLink] = useState("");

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

  /* CREATE SHAREABLE LINK */
  const createLink = async () => {
    try {
      const res = await axios.post(
        "https://dynamic-form-y9r4.onrender.com/create-form",
        {
          title: "My Dynamic Form",
          fields,
        }
      );

      // ✅ AUTO DOMAIN (LOCAL + VERCEL)
      const generatedLink =
        `${window.location.origin}/form/${res.data.formId}`;

      setShareLink(generatedLink);
    } catch (err) {
      console.error(err);
      alert("Error creating form");
    }
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
        Generate Link
      </button>

      {shareLink && (
        <div style={{ marginTop: 20 }}>
          <h4>Share this link:</h4>

          <a href={shareLink} target="_blank" rel="noreferrer">
            {shareLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default DynamicForm;