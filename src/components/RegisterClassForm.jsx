import React from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function RegisterClassForm({ onRegister }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [credits, setCredits] = useState("");
  const [weights, setWeights] = useState([{ category: "", weight: "" }]);

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!name || !code || !credits) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate weights
    const totalWeight = weights.reduce((sum, { weight }) => {
      const num = parseFloat(weight);
      return !isNaN(num) ? sum + num : sum;
    }, 0);

    if (totalWeight !== 100) {
      alert(`Total weights must equal 100. Current total: ${totalWeight}%`);
      return;
    }

    const formattedWeights = {};
    weights.forEach(({ category, weight }) => {
      if (category && weight) {
        formattedWeights[category.toLowerCase()] = Number(weight) / 100;
      }
    });

    const newCourse = {
      id: crypto.randomUUID(),
      name,
      code,
      credits: Number(credits),
      assignments: [],
      weights: {
        homework: null,
        quizzes: null,
        exams: null,
      },
    };

    onRegister(newCourse);

    console.log("New class registered:", newCourse);

    // Reset form fields
    setName("");
    setCode("");
    setCredits("");
    setWeights([{ category: "", weight: "" }]);
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
        <div className="flex flex-col gap-2 w-full">
          <p className="font-medium"> Assignment Categories & Weights</p>

          {/* Total weights display */}
          {(() => {
            const total = weights.reduce((sum, { weight }) => {
              const num = parseFloat(weight);
              return !isNaN(num) ? sum + num : sum;
            }, 0);
            let colorClass = "text-muted-foreground";
            if (total === 100) colorClass = "text-green-600";
            else if (total > 100) colorClass = "text-red-600";
            return (
              <p className={`text-sm ${colorClass}`}>Total Weight: {total}%</p>
            );
          })()}

          {weights.map((entry, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder="Category (e.g. Homework)"
                value={entry.category}
                onChange={(e) => {
                  const newWeights = [...weights];
                  newWeights[index].category = e.target.value;
                  setWeights(newWeights);
                }}
              />
              <Input
                placeholder="Weight (e.g. 30)"
                type="number"
                value={entry.weight}
                onChange={(e) => {
                  const newWeights = [...weights];
                  newWeights[index].weight = e.target.value;
                  setWeights(newWeights);
                }}
              />
              <Button
                type="button"
                variant="destructive"
                disabled={weights.length === 1}
                onClick={() => {
                  const newWeights = weights.filter((_, i) => i !== index);
                  setWeights(newWeights);
                }}
              >
                X
              </Button>
            </div>
          ))}

          {/* Add category button */}
          <Button
            type="button"
            onClick={() =>
              setWeights([...weights, { category: "", weight: "" }])
            }
          >
            + Add Category
          </Button>
        </div>

        {/* Submit button */}
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}

export default RegisterClassForm;
