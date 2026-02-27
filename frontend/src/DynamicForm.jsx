import React, { useState } from "react";
import axios from "axios";

function DynamicForm() {
  const [fields, setFields] = useState([]);
  const [shareLink, setShareLink] = useState("");

  /* ---------------- ADD FIELD ---------------- */
  const addField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        label: "",
        type: "text",
        options: "",
      },
    ]);
  };

  /* ---------------- UPDATE FIELD ---------------- */
  const updateField = (id, key, value) => {
    setFields(
      fields.map((f) =>
        f.id === id ? { ...f, [key]: value } : f
      )
    );
  };

  /* ---------------- CREATE SHAREABLE LINK ---------------- */
  const createLink = async () => {
    try {
      const res = await axios.post(
        "https://dynamic-form-app-1.onrender.com/create-form",
        {
          title: "My Dynamic Form",

          // convert options string → array
          fields: fields.map((f) => ({
            label: f.label,
            type: f.type,
            options: f.options
              ? f.options.split(",").map((o) => o.trim())
              : null,
          })),
        }
      );

      // auto domain (local + deployed)
      const generatedLink =
        `${window.location.origin}/form/${res.data.formId}`;

      setShareLink(generatedLink);
    } catch (err) {
      console.error(err);
      alert("Error creating form");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={{ padding: 20 }}>
      <h2>Live Form Builder</h2>

      <button onClick={addField}>Add Column</button>

      <hr />

      {fields.map((field) => (
        <div
          key={field.id}
          style={{
            marginBottom: 15,
            padding: 10,
            border: "1px solid #ccc",
          }}
        >
          {/* LABEL */}
          <input
            placeholder="Column Name"
            value={field.label}
            onChange={(e) =>
              updateField(field.id, "label", e.target.value)
            }
            style={{ marginRight: 10 }}
          />

          {/* FIELD TYPE */}
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

            {/* NEW TYPES */}
            <option value="textarea">Textarea</option>
            <option value="dropdown">Dropdown</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
          </select>

          {/* OPTIONS INPUT */}
          {["dropdown", "radio", "checkbox"].includes(
            field.type
          ) && (
            <div style={{ marginTop: 8 }}>
              <input
                placeholder="Options (comma separated)"
                value={field.options}
                onChange={(e) =>
                  updateField(
                    field.id,
                    "options",
                    e.target.value
                  )
                }
                style={{ width: "300px" }}
              />
            </div>
          )}
        </div>
      ))}

      <hr />

      <button onClick={createLink}>
        Generate Link
      </button>

      {/* SHARE LINK */}
      {shareLink && (
        <div style={{ marginTop: 20 }}>
          <h4>Share this link:</h4>

          <a
            href={shareLink}
            target="_blank"
            rel="noreferrer"
          >
            {shareLink}
          </a>
        </div>
      )}
    </div>
  );
}

export default DynamicForm;