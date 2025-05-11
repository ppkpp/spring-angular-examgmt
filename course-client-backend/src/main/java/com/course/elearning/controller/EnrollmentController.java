package com.course.elearning.controller;



import com.course.elearning.dto.EnrollRequestDTO;
import com.course.elearning.model.Course;
import com.course.elearning.model.Enrollment;
import com.course.elearning.model.Student;
import com.course.elearning.repository.CourseRepository;
import com.course.elearning.repository.EnrollmentRepository;
import com.course.elearning.repository.StudentRepository;


import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    @PostMapping
    public ResponseEntity<?> enrollStudent(
            @RequestBody EnrollRequestDTO enrollmentRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;

        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        Optional<Student> studentOptional = studentRepository.findByUsername(username);
        if (!studentOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized student");
        }

        Student student = studentOptional.get();

        Course course = courseRepository.findById(enrollmentRequest.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // ✅ Check if enrollment already exists
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByStudentAndCourse(student, course);
        if (existingEnrollment.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("You are already enrolled in this course.");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setNotes(enrollmentRequest.getNotes());
        enrollment.setImageUrl(enrollmentRequest.getImageUrl());

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEnrollment);
    }
    @GetMapping("/check")
    public ResponseEntity<String> checkEnrollment(
            @RequestParam Long courseId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        // Get the username from the authentication principal
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;

        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        // Find the student by username
        Optional<Student> studentOptional = studentRepository.findByUsername(username);
        if (!studentOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized student");
        }

        Student student = studentOptional.get();

        // Find the course by ID
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Check if the student is already enrolled in the course
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByStudentAndCourse(student, course);
        if (existingEnrollment.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body("Enrolled");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body("NotEnrolled");
        }
    }
    
    @GetMapping("/my-courses")
    public ResponseEntity<?> getEnrolledCourses() {
        // Extract the username from the security context
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;

        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        // Find the student by username
        Optional<Student> studentOptional = studentRepository.findByUsername(username);
        if (!studentOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized student");
        }

        Student student = studentOptional.get();

        // Return the enrolled courses
        return ResponseEntity.ok(student.getCourses());
    }


}
