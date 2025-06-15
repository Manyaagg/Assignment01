import React from "react";
import { useNavigate } from "react-router-dom";

const SummaryPage = ({ data }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p>No data submitted yet.</p>
        <button onClick={() => navigate("/")}>Go to Form</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Submitted Details</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {Object.entries(data).map(([key, value]) => {
          if (key === "showPassword") return null; // skip internal flags
          return (
            <li key={key} style={{ marginBottom: 10 }}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}:</strong> {value}
            </li>
          );
        })}
      </ul>
      <button onClick={() => navigate("/")}>Back to Form</button>
    </div>
  );
};

export default SummaryPage;
