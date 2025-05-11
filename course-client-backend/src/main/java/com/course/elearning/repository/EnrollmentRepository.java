package com.course.elearning.repository;


import com.course.elearning.model.Course;
import com.course.elearning.model.Enrollment;
import com.course.elearning.model.Student;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
	Optional<Enrollment> findByStudentAndCourse(Student student, Course course);

}
