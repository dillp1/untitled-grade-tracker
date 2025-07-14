import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PdfUpload() {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [extractedInfo, setExtractedInfo] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  const handleUpload = async () => {
    if (!fileInputRef.current.files[0]) return;

    const formData = new FormData();
    formData.append("pdf", fileInputRef.current.files[0]);

    try {
      const response = await fetch(
        "http://localhost:3001/api/extract-course-info",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Extracted info from backend:", data);
      setExtractedInfo(data);
    } catch (err) {
      console.error("Upload failed", err);
      setExtractedInfo(null);
    }
  };

  console.log("Rendering extractedInfo:", extractedInfo);

  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-lg font-semibold">Upload PDF</h2>
      <Input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button type="button" onClick={handleButtonClick}>
        Select PDF
      </Button>
      <Button type="button" onClick={handleUpload} disabled={!selectedFileName}>
        Upload PDF
      </Button>
      {selectedFileName && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedFileName}
        </p>
      )}
      {extractedInfo && typeof extractedInfo === "object" && (
        <div className="mt-4 p-4 gap-4 border rounded-md bg-muted text-sm whitespace-pre-wrap">
          <strong>Extracted Course Information:</strong>
          <p>
            <strong>Course name:</strong> {extractedInfo?.course_name || "N/A"}
          </p>
          <p>
            <strong>Course code:</strong> {extractedInfo?.course_code || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}
