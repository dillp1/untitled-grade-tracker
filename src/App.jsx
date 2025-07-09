import React, { useState } from "react"
import RegisterClassForm from "./components/RegisterClassForm"
import CourseCard from "./components/CoruseCard"

const mockCourse ={
  id: "1",
  name: "Math",
  code: "MATH101",
  credits: 3
}

function App() {
  const [courses, setCourses] = useState([])

  function handleRegister(newCourse) {
    setCourses((prevCourses) => [...prevCourses, newCourse])
    console.log("Registered course:", newCourse)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-4">
      <RegisterClassForm onRegister={handleRegister} />
      <div className="flex flex-col items-center gap-4 w-full">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default App
