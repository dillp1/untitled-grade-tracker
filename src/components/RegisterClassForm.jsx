import React from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function RegisterClassForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!name || !code || !credits) {
      alert("Please fill in all fields.");
      return;
    }

    const newClass ={
      id: crypto.randomUUID(),
      name,
      code,
      credits: Number(credits),
    }

    console.log("New class registered:", newClass);
    // TODO: pass this as a parent via props

    // Reset form fields
    setName("");
    setCode("");
    setCredits("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center p-4 gap-4 border rounded-md shadow-md">
        <p>Register a new course</p>
        <Input 
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input 
          placeholder="Course Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Input 
          placeholder="Course Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
        />
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}

export default RegisterClassForm;
