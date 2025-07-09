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
  function handleRegister(newCourse) {
    setCourses((prevCourses) => [...prevCourses, newCourse])
    console.log("Registered course:", newCourse)
  }

  // Function to handle course deletion
  function handleDelete(courseID) {
    setCourses(prev => prev.filter(course => course.id !== courseID));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-4">
      <RegisterClassForm onRegister={handleRegister} />
      <div className="flex flex-col items-center gap-4 w-full">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

export default App
