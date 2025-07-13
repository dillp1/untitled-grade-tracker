import RegisterClassForm from "./components/RegisterClassForm";
import CourseCard from "./components/CoruseCard";
import { Button } from "@/components/ui/button";

import { useCourses } from "./components/useCourses";

function App() {
  const [courses, setCourses] = useCourses();

  // Function to handle course registration
  function handleRegisterCourse(newCourse) {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
    console.log("Registered course:", newCourse);
  }

  // Function to handle course deletion
  function handleDeleteCourse(courseID) {
    setCourses((prev) => prev.filter((course) => course.id !== courseID));
  }

  // Function to handle adding an assignment to a course
  function handleAddAssignment(courseID, newAssignment) {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseID
          ? {
              ...course,
              assignments: [...(course.assignments || []), newAssignment],
            }
          : course
      )
    );
  }

  // Function to clear localStorage
  function clearLocalStorage() {
    localStorage.clear();
    setCourses([]); // Reset the state to an empty array
  }

  return (
    <div className="min-h-svh">
      <div className="flex flex-row-reverse p-4">
        <Button variant="destructive" onClick={clearLocalStorage}>
          Clear localStorage
        </Button>
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center gap-8 p-4">
        <RegisterClassForm onRegister={handleRegisterCourse} />
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={handleDeleteCourse}
              onAddAssignment={handleAddAssignment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
