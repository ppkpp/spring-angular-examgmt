package com.course.manage.repository;

import com.course.manage.model.CourseCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseCategoryRepository extends JpaRepository<CourseCategory, Long> {
    Page<CourseCategory> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
