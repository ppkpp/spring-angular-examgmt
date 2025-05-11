package com.course.manage.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.course.manage.model.Quiz;
import org.springframework.data.domain.Pageable;
public interface QuizRepository extends JpaRepository<Quiz, Long> {
	 Page<Quiz> findByCourseId(Long courseId, Pageable pageable);
}
