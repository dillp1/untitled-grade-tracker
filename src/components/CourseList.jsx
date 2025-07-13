export default function CourseList({ courses, onDelete, onAddAssignment }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 w-full">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onDelete={onDelete}
          onAddAssignment={onAddAssignment}
        />
      ))}
    </div>
  );
}
