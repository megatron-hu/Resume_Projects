import React, { useState } from "react";

const FIRForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    details: "",
  });
  const [firId, setFirId] = useState(null);
  const [recording, setRecording] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/generate-fir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    setFirId(result.firId);
  };

  const startRecording = () => {
    setRecording(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prevFormData) => ({
        ...prevFormData,
        details: prevFormData.details + " " + transcript,
      }));
      setRecording(false);
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: " + event.error);
      setRecording(false);
    };

    recognition.start();
  };

  return (
    <div>
      <h2>Generate a FIR</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Information"
          required
        />
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Incident Details"
          required
        />
        <button type="submit">Generate FIR</button>
      </form>
      <button onClick={startRecording} disabled={recording}>
        {recording ? "Recording..." : "Record Details"}
      </button>
      {firId && <p>Your FIR ID is: {firId}</p>}
    </div>
  );
};

export default FIRForm;
