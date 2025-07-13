import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import AssignmentList from "./AssignmentList";

function CourseCard({ course, onDelete, onAddAssignment }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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
      dueDate: dueDate?.toISOString(),
    };

    onAddAssignment(course.id, newAssignment);

    console.log("New assignment added:", newAssignment);
    setTitle("");
    setDueDate(null);
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

      <AssignmentList assignments={course.assignments} />

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

            {/* Form */}
            <form
              onSubmit={handleAssignmentSubmit}
              className="flex flex-col gap-2"
            >
              {/* Assignment name */}
              <Input
                placeholder="Assignment Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* Date picker */}
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    {dueDate ? format(dueDate, "PPP") : "Pick a due date"}
                    <CalendarIcon className="mr-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date);
                      setIsCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button type="submit" onClick={handleAssignmentSubmit}>
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Course Button */}
        <Button variant="destructive" onClick={() => onDelete(course.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default CourseCard;
