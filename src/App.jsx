import React, { useState, useEffect } from "react"
import RegisterClassForm from "./components/RegisterClassForm"
import CourseCard from "./components/CoruseCard"

function App() {

  // Check localStorage for existing courses
  const [courses, setCourses] = useState(() => {
    const stored = localStorage.getItem("courses")
    return stored ? JSON.parse(stored) : [];
  });

  // Save courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses))
  }, [courses])

  // Function to handle course registration
  function handleRegisterCourse(newCourse) {
    setCourses((prevCourses) => [...prevCourses, newCourse])
    console.log("Registered course:", newCourse)
  }

  // Function to handle course deletion
  function handleDeleteCourse(courseID) {
    setCourses(prev => prev.filter(course => course.id !== courseID));
  }

  // Function to handle adding an assignment to a course
  function handleAddAssignment(courseID, newAssignment) {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseID
          ? { ...course, assignments: [...(course.assignments || []), newAssignment] }
          : course
      )
    );
  }

  return (
    <div className="flex flex-col flex-wrap items-center justify-center min-h-svh gap-8 p-4">
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
  )
}

export default App
