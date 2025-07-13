import { Button } from "@/components/ui/button";

import AssignmentList from "./AssignmentList";
import AddAssignmentDialog from "./AddAssignmentDialog";

function CourseCard({ course, onDelete, onAddAssignment }) {
  return (
    <div className="flex flex-col items-center justify-between p-4 gap-2 border rounded-md shadow-md w-64">
      {/* Course details */}
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold">{course.name}</h3>
        <p className="text-sm text-gray-500">{course.code}</p>
        <p className="text-sm">Credits: {course.credits}</p>
      </div>

      {/* Assignments List */}
      <AssignmentList assignments={course.assignments} />

      <div className="flex flex-row items-center gap-2 mt-4 w-full">
        {/* Add Assignment Dialog */}
        <AddAssignmentDialog
          courseID={course.id}
          onAddAssignment={onAddAssignment}
        />

        {/* Delete Course Button */}
        <Button variant="destructive" onClick={() => onDelete(course.id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default CourseCard;
