const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const upload = multer({ dest: "uploads/" });

const app = express();
const PORT = 3001;

app.use(cors());

app.post("/api/extract-course-info", upload.single("pdf"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    // Send back the raw text for now
    res.json({ text: pdfData.text });
  } catch (error) {
    console.error("Error reading PDF:", error);
    res.status(500).json({ error: "Failed to extract text from PDF." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
