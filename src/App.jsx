import RegisterClassForm from "./components/RegisterClassForm";
import CourseList from "./components/CourseList";
import { Button } from "@/components/ui/button";

import { useCourses } from "./components/utils/useCourses";
import {
  registerCourse,
  deleteCourse,
  addAssignment,
} from "./components/utils/courseHelpers";

function App() {
  const [courses, setCourses] = useCourses();

  function handleRegisterCourse(newCourse) {
    setCourses((prev) => registerCourse(prev, newCourse));
  }

  function handleDeleteCourse(courseID) {
    setCourses((prev) => deleteCourse(prev, courseID));
  }

  function handleAddAssignment(courseID, newAssignment) {
    setCourses((prev) => addAssignment(prev, courseID, newAssignment));
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
        <CourseList
          courses={courses}
          onDelete={handleDeleteCourse}
          onAddAssignment={handleAddAssignment}
        />
      </div>
    </div>
  );
}

export default App;
