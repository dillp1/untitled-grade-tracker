const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const upload = multer({ dest: "uploads/" });
const { OpenAI } = require("openai");

const app = express();
const PORT = 3001;

require("dotenv").config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());

app.post("/api/extract-course-info", upload.single("pdf"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    // Use OpenAI to extract course info from PDF text
    const prompt = `Extract the course code and full course name from the following text. Return the result strictly in this JSON format:
    {
      "course_code": "ABC 123",
      "course_name": "Course Title"
    }
    
    Here is the text:
    ${pdfData.text}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You extract structured course information from syllabus documents." },
        { role: "user", content: prompt }
      ],
      temperature: 0
    });

    let responseText = completion.choices[0].message.content;

    // Output response text
    console.log("AI Raw Response:\n", responseText);

    // Strip markdown code block if present
    if (responseText.includes("```")) {
      const match = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (match && match[1]) {
        responseText = match[1].trim();
      }
    } 

    try {
      const extracted = JSON.parse(responseText);
      res.json(extracted);
    } catch (parseError) {
      console.error("Failed to parse JSON from AI:", parseError);
      res.status(500).json({ error: "AI response was not valid JSON.", raw: responseText });
    }

    // Output response text
    } catch (error) {
    console.error("Error reading PDF:", error);
    res.status(500).json({ error: "Failed to extract text from PDF." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
