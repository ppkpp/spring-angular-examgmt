package com.course.elearning.controller;

import com.course.elearning.dto.CourseRequest;
import com.course.elearning.dto.CourseResponseDTO;
import com.course.elearning.dto.CourseResponseWithChildDTO;
import com.course.elearning.model.Course;
import com.course.elearning.model.CourseCategory;

import com.course.elearning.repository.CourseRepository;
import com.course.elearning.repository.CourseCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

	private final CourseRepository courseRepository;
	private final CourseCategoryRepository courseCategoryRepository;

	@Autowired
	public CourseController(CourseRepository courseRepository, CourseCategoryRepository courseCategoryRepository) {
		this.courseRepository = courseRepository;
		this.courseCategoryRepository = courseCategoryRepository;
	}

	@GetMapping
	public Page<CourseResponseDTO> getAllCourses(@RequestParam(required = false) Long categoryId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "5") int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Course> courses;
		if (categoryId != null) {
			courses = courseRepository.findByCategoryId(categoryId, pageable);
		} else {
			courses = courseRepository.findAll(pageable);
		}
		return courses.map(CourseResponseDTO::new);
	}

	@GetMapping("/search/byTitle")
	public List<Course> searchCoursesByName(@RequestParam("name") String name) {
		return courseRepository.findByTitleContainingIgnoreCase(name);
	}

	// Get a specific course by id
	@GetMapping("/{id}")
	public ResponseEntity<CourseResponseWithChildDTO> getCourseById(@PathVariable Long id) {
		Optional<Course> course = courseRepository.findById(id);
		if (!course.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		CourseResponseWithChildDTO responseDTO = new CourseResponseWithChildDTO(course.get());
		return ResponseEntity.ok(responseDTO);
	}

}
