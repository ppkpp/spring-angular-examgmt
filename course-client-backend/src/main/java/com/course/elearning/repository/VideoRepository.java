package com.course.elearning.repository;

import com.course.elearning.model.Quiz;
import com.course.elearning.model.Video;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {
	 Page<Video> findByCourseId(Long courseId, Pageable pageable);
}
