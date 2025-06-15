import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./FormPage";
import SummaryPage from "./SummaryPage";

const App = () => {
  const [formData, setFormData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage setFormData={setFormData} />} />
        <Route path="/summary" element={<SummaryPage data={formData} />} />
      </Routes>
    </Router>
  );
};

export default App;
