package com.course.elearning.controller;

import com.course.elearning.dto.AnswerResponseDTO;
import com.course.elearning.dto.ExamResponseDTO;
import com.course.elearning.dto.SubmitAnswerRequest;
import com.course.elearning.model.Answer;
import com.course.elearning.model.Course;
import com.course.elearning.model.ExamSession;
import com.course.elearning.model.Option;
import com.course.elearning.model.Quiz;
import com.course.elearning.model.Student;
import com.course.elearning.repository.AnswerRepository;
import com.course.elearning.repository.CourseRepository;
import com.course.elearning.repository.ExamSessionRepository;
import com.course.elearning.repository.OptionRepository;
import com.course.elearning.repository.QuizRepository;
import com.course.elearning.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.time.Duration;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/exams")
public class ExamSessionController {

	@Autowired
	private AnswerRepository answerRepository;

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private QuizRepository quizRepository;

	@Autowired
	private ExamSessionRepository examSessionRepository;

	@Autowired
	private OptionRepository optionRepository;

	@Autowired
	private CourseRepository courseRepository;

	
	@GetMapping("/course/{courseId}")
	public ResponseEntity<?> getExamSessionByCourseAndStudent(@PathVariable Long courseId) {
		// 1. Get logged-in user
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username;

		if (principal instanceof UserDetails) {
			username = ((UserDetails) principal).getUsername();
		} else {
			username = principal.toString();
		}

		Optional<Student> studentOptional = studentRepository.findByUsername(username);
		if (studentOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized student");
		}

		Student student = studentOptional.get();

		// 2. Find course
		Optional<Course> courseOptional = courseRepository.findById(courseId);
		if (courseOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
		}

		Course course = courseOptional.get();
		
		// 3. Fetch ExamSession by student and course
		Optional<ExamSession> examSessionOptional = examSessionRepository.findByStudentAndCourse(student, course);
		if (examSessionOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exam session not found for this course");
		}

		ExamSession session = examSessionOptional.get();

		// 4. Map to DTO
		ExamResponseDTO dto = new ExamResponseDTO(session.getId(), session.getCourse(), session.getStartTime(),
				session.getEndTime(), session.getAnswers(), session.getStudent(), session.getIsFinished());

		return ResponseEntity.ok(dto);
	}

	@PostMapping("/submit")
	public ResponseEntity<?> submitAnswer(@RequestBody SubmitAnswerRequest request) {
		// 1. Get logged-in student
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username;

		if (principal instanceof UserDetails) {
			username = ((UserDetails) principal).getUsername();
		} else {
			username = principal.toString();
		}

		Optional<Student> studentOptional = studentRepository.findByUsername(username);
		if (studentOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized student");
		}

		Student student = studentOptional.get();

		// 2. Load Quiz and Option
		Optional<Quiz> quizOptional = quizRepository.findById(request.getQuizId());
		if (quizOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quiz not found");
		}

		Quiz quiz = quizOptional.get();
		// ✅ Check if already answered
		// 3. Check if there is already an active ExamSession
		ExamSession session = examSessionRepository.findByStudentAndCourse(student, quiz.getCourse()).orElseGet(() -> {
			ExamSession newSession = new ExamSession();
			newSession.setStudent(student);
			newSession.setCourse(quiz.getCourse());
			newSession.setStartTime(LocalDateTime.now());
			newSession.setIsFinished(false);
			return examSessionRepository.save(newSession);
		});
		// Optional: Prevent re-answering after session is marked finished
		if (session.getIsFinished()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("This exam session is already finished.");
		}

		// 4. Check if already answered (in this session)
		boolean alreadyAnswered = session.getAnswers().stream()
				.anyMatch(a -> a.getSelectedOption().getQuiz().getId().equals(quiz.getId()));

		if (alreadyAnswered) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("You have already submitted an answer for this quiz.");
		}
		
		// ✅ Check if exam time is exceeded before submitting
		if (quiz.getCourse().getQuizTime() != null) {
			
		    Duration quizDuration = Duration.ofMinutes(quiz.getCourse().getQuizTime()); // or Duration.ofMinutes(...)
		    LocalDateTime allowedEndTime = session.getStartTime().plus(quizDuration);
		    if (LocalDateTime.now().isAfter(allowedEndTime)) {
		        session.setIsFinished(true);
		        session.setEndTime(LocalDateTime.now());
		        examSessionRepository.save(session);
		        return ResponseEntity.status(HttpStatus.CONFLICT).body("TimesUp");
		    }
		}
		// 3. Find the selected option based on optionNumber
		Optional<Option> selectedOptionOptional = optionRepository.findByQuizAndOptionNumber(quiz,
				request.getAnswerNumber());
		if (selectedOptionOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid option selected");
		}

		Option selectedOption = selectedOptionOptional.get();

		// 4. Submit answer
		boolean isCorrect = quiz.getCorrectOption() != null
				&& quiz.getCorrectOption().equals(request.getAnswerNumber());

		Answer answer = new Answer();
		answer.setExamSession(session);
		answer.setQuiz(quiz);
		answer.setIsCorrect(isCorrect);
		answer.setSelectedOption(selectedOption);
		answerRepository.save(answer);

		// ✅ Update session if this is the final answerWW
		
		if (request.isFinalAnswer()) {
			
		    session.setIsFinished(true);
		    session.setEndTime(LocalDateTime.now());
		    examSessionRepository.save(session);
		}
		
		return ResponseEntity.ok(new HashMap<String, Object>() {
			{
				put("message", "Answer submitted successfully.");
				put("isCorrect", isCorrect);
			}
		});
	}

}
