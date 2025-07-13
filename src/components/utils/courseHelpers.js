// Function to handle course registration
export function registerCourse(prevCourses, newCourse) {
  return [...prevCourses, newCourse];
}

// Function to handle course deletion
export function deleteCourse(prevCourses, courseID) {
  return prevCourses.filter((course) => course.id !== courseID);
}

// Function to handle adding an assignment to a course
export function addAssignment(prevCourses, courseID, newAssignment) {
  return prevCourses.map((course) =>
    course.id === courseID
      ? {
          ...course,
          assignments: [...(course.assignments || []), newAssignment],
          }
        : course
    );
}