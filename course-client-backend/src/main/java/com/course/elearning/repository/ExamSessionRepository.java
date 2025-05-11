package com.course.elearning.repository;

import com.course.elearning.model.Course;
import com.course.elearning.model.ExamSession;
import com.course.elearning.model.Quiz;
import com.course.elearning.model.Student;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamSessionRepository extends JpaRepository<ExamSession, Long> {

	Optional<ExamSession> findByStudentAndCourse(Student student, Course course);

}
