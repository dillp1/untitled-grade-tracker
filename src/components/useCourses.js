import { useEffect, useState } from "react";

export function useCourses() {
  // Check localStorage for existing courses
  const [courses, setCourses] = useState(() => {
    const stored = localStorage.getItem("courses");
    return stored ? JSON.parse(stored) : [];
  });

  // Save courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  return [courses, setCourses];
}
