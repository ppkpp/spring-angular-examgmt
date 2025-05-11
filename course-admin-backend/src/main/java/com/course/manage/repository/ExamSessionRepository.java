package com.course.manage.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.course.manage.model.Course;
import com.course.manage.model.Student;
import com.course.manage.model.ExamSession;

@Repository
public interface ExamSessionRepository extends JpaRepository<ExamSession, Long> {
    List<ExamSession> findByStudentId(Long studentId);
	Optional<ExamSession> findByStudentAndCourse(com.course.manage.model.Student student, com.course.manage.model.Course course);
}
