import React from "react";
import { Routes, Route } from "react-router-dom";
import DynamicForm from "./DynamicForm";
import FormPage from "./FormPage";

function App() {
  return (
    <Routes>
      {/* Form Builder */}
      <Route path="/" element={<DynamicForm />} />

      {/* Public Form */}
      <Route path="/form/:formId" element={<FormPage />} />
    </Routes>
  );
}

export default App;

