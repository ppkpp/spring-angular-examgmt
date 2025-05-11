package com.course.elearning.repository;

import com.course.elearning.model.Course;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
	List<Course> findByTitleContainingIgnoreCase(String title);
	
	Page<Course> findByCategoryId(Long categoryId, Pageable pageable);
}
