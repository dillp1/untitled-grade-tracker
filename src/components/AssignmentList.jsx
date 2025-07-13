import React from "react";
import { format } from "date-fns";

export default function AssignmentList({ assignments }) {
  if (!assignments?.length) return null;

  return (
    <div className="w-full mt-2">
      <p className="text-sm font-medium mb-1">Assignments:</p>
      <ul className="list-disc list-inside space-y-1">
        {assignments.map((a) => (
          <li key={a.id} className="text-sm text-gray-700">
            <div>{a.title}</div>
            {a.dueDate && (
              <div className="text-sx text-muted-foreground">
                Due: {format(new Date(a.dueDate), "PPP")}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
