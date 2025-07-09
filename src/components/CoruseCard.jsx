import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function CourseCard({ course, onDelete, onAddAssignment }) {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  function handleAssignmentSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!title) {
      alert("Please fill in all fields.");
      return;
    }

    const newAssignment = {
      id: crypto.randomUUID(),
      title,
    };

    onAddAssignment(course.id, newAssignment);

    console.log("New assignment added:", newAssignment);
    setTitle("");
    setOpen(false);
  }

  return (
    <div className="flex flex-col items-center justify-between p-4 gap-2 border rounded-md shadow-md w-64 h-80">
      {/* Course details */}
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold">{course.name}</h3>
        <p className="text-sm text-gray-500">{course.code}</p>
        <p className="text-sm">Credits: {course.credits}</p>
      </div>

      {/* Assignments list */}
      {course.assignments && course.assignments.length > 0 && (
        <div className="w-full mt-2">
          <p className="text-sm font-medium mb-1">Assignments:</p>
          <ul className="list-disc list-inside space-y-1">
            {course.assignments.map((a) => (
              <li key={a.id} className="text-sm text-gray-700">
                {a.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-row items-center gap-2 mt-4 w-full">
        {/* Add Assignment Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Add Assignment</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Assignment</DialogTitle>
            </DialogHeader>

            {/* Form */ }
            <form onSubmit={handleAssignmentSubmit} className="flex flex-col gap-2">
              <Input
                placeholder="Assignment Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </form>
            <Button type="submit" onClick={handleAssignmentSubmit}>Save</Button>
          </DialogContent>
        </Dialog>

        {/* Delete Course Button */}
        <Button 
          variant="destructive"
          onClick={() => onDelete(course.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default CourseCard;
