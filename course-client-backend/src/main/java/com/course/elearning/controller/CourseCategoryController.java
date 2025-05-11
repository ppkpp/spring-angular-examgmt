package com.course.elearning.controller;

import com.course.elearning.model.CourseCategory;
import com.course.elearning.repository.CourseCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
public class CourseCategoryController {

	@Autowired
	private CourseCategoryRepository categoryRepository;

	@GetMapping
	public Page<CourseCategory> getCategories(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size) {
		Pageable pageable = PageRequest.of(page, size);
		return categoryRepository.findAll(pageable);
	}

	// READ ONE BY ID
	@GetMapping("/{id}")
	public ResponseEntity<CourseCategory> getCategoryById(@PathVariable Long id) {
		Optional<CourseCategory> category = categoryRepository.findById(id);
		return category.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

}
