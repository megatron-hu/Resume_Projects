const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let firs = [];

app.post("/api/generate-fir", (req, res) => {
  const { name, contact, details } = req.body;
  const firId = `FIR-${Date.now()}`;
  const newFir = { firId, name, contact, details, date: new Date() };
  firs.push(newFir);
  res.json({ firId });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
