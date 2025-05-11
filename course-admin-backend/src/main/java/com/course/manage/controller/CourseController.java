package com.course.manage.controller;

import com.course.manage.dto.CourseRequest;
import com.course.manage.dto.CourseResponseDTO;
import com.course.manage.model.Course;
import com.course.manage.model.CourseCategory;
import com.course.manage.model.User;
import com.course.manage.repository.CourseRepository;
import com.course.manage.repository.CourseCategoryRepository;
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

    @PostMapping
    public Course createCourse(@RequestBody CourseRequest courseRequest) {
        // Fetch the category by ID using the repository directly
        CourseCategory category = courseCategoryRepository.findById(courseRequest.getCategoryId()).orElse(null);
        if (category == null) {
            throw new RuntimeException("Category not found");
        }

        // Create a new course and set its category
        Course course = new Course();
        course.setTitle(courseRequest.getTitle());
        course.setDescription(courseRequest.getDescription());
        course.setInstructorName(courseRequest.getInstructorName());
        course.setImageUrl(courseRequest.getImageUrl());
        course.setCategory(category);
        course.setDuration(courseRequest.getDuration());
        course.setFees(courseRequest.getFees());
        // Save the course using the repository directly
        return courseRepository.save(course);
    }


    // Get all courses
//    @GetMapping
//    public List<Course> getAllCourses() {
//        return courseRepository.findAll();
//    }
    
    @GetMapping
    public Page<Course> getAllCourses(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(required = false) String name 
    ) {
        Pageable pageable = PageRequest.of(page, size);
    
        if (name != null && !name.isBlank()) {
        	return courseRepository.findByTitleContainingIgnoreCase(name, pageable);
        } else {
            return courseRepository.findAll(pageable);
        }
    }
    
    @GetMapping("/search/byTitle")
    public List<Course> searchCoursesByName(@RequestParam("name") String name) {
        return courseRepository.findByTitleContainingIgnoreCase(name);
    }
    // Get a specific course by id
    @GetMapping("/{id}")
    public ResponseEntity<CourseResponseDTO> getCourseById(@PathVariable Long id) {
        Optional<Course> course = courseRepository.findById(id);
        if (!course.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        CourseResponseDTO responseDTO = new CourseResponseDTO(course.get());
        return ResponseEntity.ok(responseDTO);
    }

    // Update a course
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody CourseRequest course) {
    	CourseCategory category = courseCategoryRepository.findById(course.getCategoryId()).orElse(null);
        if (category == null) {
            throw new RuntimeException("Category not found");
        }

        
    	Optional<Course> existingCourseOptional = courseRepository.findById(id);
        if (!existingCourseOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Course existingCourse = existingCourseOptional.get();

        // Update only the properties you want to change
        existingCourse.setTitle(course.getTitle());
        existingCourse.setDescription(course.getDescription());
        existingCourse.setInstructorName(course.getInstructorName());
        existingCourse.setCategory(category);
        existingCourse.setFees(course.getFees());
        existingCourse.setDuration(course.getDuration());
        existingCourse.setQuizTime(course.getQuizTime());
        Course updatedCourse = courseRepository.save(existingCourse);
        return ResponseEntity.ok(updatedCourse);
    }

    // Delete a course by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        Optional<Course> courseOptional = courseRepository.findById(id);
        if (!courseOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        courseRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
