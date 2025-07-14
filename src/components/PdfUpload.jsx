import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PdfUpload() {
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };

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
      <Button onClick={handleButtonClick}>Select PDF</Button>
      {selectedFileName && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedFileName}
        </p>
      )}
    </div>
  );
}
