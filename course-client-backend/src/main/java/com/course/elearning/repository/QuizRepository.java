package com.course.elearning.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.course.elearning.model.Quiz;
import org.springframework.data.domain.Pageable;
public interface QuizRepository extends JpaRepository<Quiz, Long> {
	 Page<Quiz> findByCourseId(Long courseId, Pageable pageable);
	 
	 List<Quiz> findByCourseId(Long courseId);
}
