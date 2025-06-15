import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const countries = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
};

const FormPage = ({ setFormData }) => {
  const navigate = useNavigate();

  // Form fields state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phoneCountryCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  });

  // Error messages state
  const [errors, setErrors] = useState({});

  // Enable submit button only if no errors & all required filled
  const [canSubmit, setCanSubmit] = useState(false);

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!form.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\d{6,14}$/.test(form.phoneNumber)) newErrors.phoneNumber = "Invalid phone number";

    if (!form.country) newErrors.country = "Country is required";
    if (!form.city) newErrors.city = "City is required";

    if (!form.panNo.trim()) newErrors.panNo = "PAN No. is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.panNo))
      newErrors.panNo = "PAN No. format invalid";

    if (!form.aadharNo.trim()) newErrors.aadharNo = "Aadhar No. is required";
    else if (!/^\d{12}$/.test(form.aadharNo))
      newErrors.aadharNo = "Aadhar No. must be 12 digits";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Validate on every form change
  useEffect(() => {
    setCanSubmit(validate());
  }, [form]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "country" ? { city: "" } : {}), // Reset city if country changes
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Pass data to parent (App) and navigate to summary
    setFormData(form);
    navigate("/summary");
  };

  return (
    <div style={{ maxWidth: 500, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* First Name */}
        <div style={{ marginBottom: 12 }}>
          <label>First Name*</label><br />
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            type="text"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.firstName && <small style={{ color: "red" }}>{errors.firstName}</small>}
        </div>

        {/* Last Name */}
        <div style={{ marginBottom: 12 }}>
          <label>Last Name*</label><br />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            type="text"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.lastName && <small style={{ color: "red" }}>{errors.lastName}</small>}
        </div>

        {/* Username */}
        <div style={{ marginBottom: 12 }}>
          <label>Username*</label><br />
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            type="text"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.username && <small style={{ color: "red" }}>{errors.username}</small>}
        </div>

        {/* Email */}
        <div style={{ marginBottom: 12 }}>
          <label>Email*</label><br />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        </div>

        {/* Password */}
        <div style={{ marginBottom: 12 }}>
          <label>Password* (min 6 characters)</label><br />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type={form.showPassword ? "text" : "password"}
            style={{ width: "100%", padding: 8 }}
          />
          <label>
            <input
              type="checkbox"
              name="showPassword"
              checked={form.showPassword}
              onChange={handleChange}
              style={{ marginRight: 5 }}
            />
            Show Password
          </label>
          {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
        </div>

        {/* Phone Number */}
        <div style={{ marginBottom: 12 }}>
          <label>Phone Number*</label><br />
          <select
            name="phoneCountryCode"
            value={form.phoneCountryCode}
            onChange={handleChange}
            style={{ padding: 8, marginRight: 8 }}
          >
            <option value="+91">+91 (India)</option>
            <option value="+1">+1 (USA)</option>
            <option value="+44">+44 (UK)</option>
            {/* Add more codes if needed */}
          </select>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            type="tel"
            placeholder="Number"
            style={{ padding: 8, width: "70%" }}
          />
          {errors.phoneNumber && <br />}
          {errors.phoneNumber && <small style={{ color: "red" }}>{errors.phoneNumber}</small>}
        </div>

        {/* Country */}
        <div style={{ marginBottom: 12 }}>
          <label>Country*</label><br />
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          >
            <option value="">Select Country</option>
            {Object.keys(countries).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && <small style={{ color: "red" }}>{errors.country}</small>}
        </div>

        {/* City */}
        <div style={{ marginBottom: 12 }}>
          <label>City*</label><br />
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
            disabled={!form.country}
          >
            <option value="">Select City</option>
            {form.country &&
              countries[form.country].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
          </select>
          {errors.city && <small style={{ color: "red" }}>{errors.city}</small>}
        </div>

        {/* PAN No */}
        <div style={{ marginBottom: 12 }}>
          <label>PAN No.*</label><br />
          <input
            name="panNo"
            value={form.panNo}
            onChange={(e) => setForm({ ...form, panNo: e.target.value.toUpperCase() })}
            type="text"
            maxLength={10}
            placeholder="ABCDE1234F"
            style={{ width: "100%", padding: 8, textTransform: "uppercase" }}
          />
          {errors.panNo && <small style={{ color: "red" }}>{errors.panNo}</small>}
        </div>

        {/* Aadhar No */}
        <div style={{ marginBottom: 12 }}>
          <label>Aadhar No.*</label><br />
          <input
            name="aadharNo"
            value={form.aadharNo}
            onChange={handleChange}
            type="text"
            maxLength={12}
            placeholder="12 digit number"
            style={{ width: "100%", padding: 8 }}
          />
          {errors.aadharNo && <small style={{ color: "red" }}>{errors.aadharNo}</small>}
        </div>

        <button type="submit" disabled={!canSubmit} style={{ padding: 10, width: "100%", cursor: canSubmit ? "pointer" : "not-allowed" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
