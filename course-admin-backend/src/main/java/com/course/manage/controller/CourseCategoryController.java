package com.course.manage.controller;

import com.course.manage.model.CourseCategory;
import com.course.manage.repository.CourseCategoryRepository;
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

    // CREATE
    @PostMapping
    public CourseCategory createCategory(@RequestBody CourseCategory category) {
        return categoryRepository.save(category);
    }

    // READ ALL
    @GetMapping("/find/all")
    public List<CourseCategory> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    @GetMapping
    public Page<CourseCategory> getPaginatedCategories(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(required = false) String name
    ) {
        Pageable pageable = PageRequest.of(page, size);
        if (name != null && !name.isEmpty()) {
            return categoryRepository.findByNameContainingIgnoreCase(name, pageable);
        }

        return categoryRepository.findAll(pageable);
    }


    // READ ONE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<CourseCategory> getCategoryById(@PathVariable Long id) {
        Optional<CourseCategory> category = categoryRepository.findById(id);
        return category.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<CourseCategory> updateCategory(@PathVariable Long id, @RequestBody CourseCategory updatedCategory) {
        return categoryRepository.findById(id)
                .map(existingCategory -> {
                    existingCategory.setName(updatedCategory.getName());
                    CourseCategory saved = categoryRepository.save(existingCategory);
                    return ResponseEntity.ok(saved);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
