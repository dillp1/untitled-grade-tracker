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

function AddAssignmentDialog({ courseID, onAddAssignment }) {
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

    onAddAssignment(courseID, newAssignment);

    console.log("New assignment added:", newAssignment);
    setTitle("");
    setDueDate(null);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Assignment</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Assignment</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleAssignmentSubmit} className="flex flex-col gap-2">
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
  );
}

export default AddAssignmentDialog;
