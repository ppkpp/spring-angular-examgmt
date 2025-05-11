package com.course.elearning.controller;

import com.course.elearning.dto.QuizRequest;
import com.course.elearning.dto.QuizResponseDTO;
import com.course.elearning.dto.VideoResponseDTO;
import com.course.elearning.model.Course;
import com.course.elearning.model.ExamSession;
import com.course.elearning.model.Quiz;
import com.course.elearning.model.Student;
import com.course.elearning.repository.CourseRepository;
import com.course.elearning.repository.ExamSessionRepository;
import com.course.elearning.repository.QuizRepository;
import com.course.elearning.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

	@Autowired
	private QuizRepository quizRepository;

	@Autowired
	private CourseRepository courseRepository;
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private ExamSessionRepository examSessionRepository;

	@GetMapping
	public List<QuizResponseDTO> getAllQuizzes(@RequestParam(required = false) Long courseId) {
	    List<Quiz> quizzes;

	    if (courseId != null) {
	        quizzes = quizRepository.findByCourseId(courseId);
	    } else {
	        quizzes = quizRepository.findAll();
	    }

	    return quizzes.stream()
	                  .map(QuizResponseDTO::new)
	                  .toList();
	}

	@GetMapping("/by-course/{courseId}")
	public ResponseEntity<?> getQuizzesByCourse(@PathVariable Long courseId) {
	    // 1. Get logged-in student
	    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    String username;
	    if (principal instanceof UserDetails) {
	        username = ((UserDetails) principal).getUsername();
	    } else {
	        username = principal.toString();
	    }

	    Optional<Student> studentOpt = studentRepository.findByUsername(username);
	    if (studentOpt.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized student");
	    }

	    Student student = studentOpt.get();

	    // 2. Check if course exists
	    Optional<Course> courseOpt = courseRepository.findById(courseId);
	    if (courseOpt.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
	    }

	    Course course = courseOpt.get();

	    // 3. Check if ExamSession exists and is finished
	    Optional<ExamSession> sessionOpt = examSessionRepository.findByStudentAndCourse(student, course);
	    if (sessionOpt.isPresent() && sessionOpt.get().getIsFinished()) {
	        return ResponseEntity.status(HttpStatus.CONFLICT).body("TimesUp");
	    }

	    // ✅ Just return OK status, no quiz data
	    return ResponseEntity.ok(Map.of("examtime", course.getQuizTime()));
	}


	// READ ONE
	@GetMapping("/{id}")
	public ResponseEntity<QuizResponseDTO> getQuizById(@PathVariable Long id) {
		Optional<Quiz> quiz = quizRepository.findById(id);
		return quiz.map(q -> ResponseEntity.ok(new QuizResponseDTO(q)))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}
}
