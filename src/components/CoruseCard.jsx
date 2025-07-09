import React from "react";
import { Button } from "@/components/ui/button";

function CourseCard({ course, onDelete }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-2 border rounded-md shadow-md w-64">
      <h3 className="text-lg font-semibold">{course.name}</h3>
      <p className="text-sm text-gray-500">{course.code}</p>
      <p className="text-sm">Credits: {course.credits}</p>
      <Button 
        variant="destructive"
        onClick={() => onDelete(course.id)}
      >
        Delete
      </Button>
    </div>
  );
}

export default CourseCard;
