package com.course.manage.repository;

import com.course.manage.model.Quiz;
import com.course.manage.model.Video;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {
	 Page<Video> findByCourseId(Long courseId, Pageable pageable);
}
