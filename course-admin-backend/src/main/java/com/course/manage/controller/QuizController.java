package com.course.manage.controller;

import com.course.manage.dto.QuizRequest;
import com.course.manage.dto.QuizResponseDTO;
import com.course.manage.dto.VideoResponseDTO;
import com.course.manage.model.Course;
import com.course.manage.model.Quiz;
import com.course.manage.repository.CourseRepository;
import com.course.manage.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CourseRepository courseRepository;

    // CREATE
    @PostMapping
    public Quiz createQuiz(@RequestBody QuizRequest quizRequest) {
        Course course = courseRepository.findById(quizRequest.getCourseId()).orElse(null);
        if (course == null) {
            throw new RuntimeException("Course not found");
        }

        Quiz quiz = new Quiz();
        quiz.setTitle(quizRequest.getTitle());
        quiz.setDescription(quizRequest.getDescription());
        quiz.setContent(quizRequest.getContent());
        quiz.setCorrectOption(quizRequest.getCorrectOption());
        quiz.setCourse(course);

        return quizRepository.save(quiz);
    }

    // READ ALL
//    @GetMapping
//    public List<QuizResponseDTO> getAllQuizzes() {
//        return quizRepository.findAll()
//                .stream()
//                .map(QuizResponseDTO::new)
//                .collect(Collectors.toList());
//    }
    
    
    
    @GetMapping
    public Page<QuizResponseDTO> getAllQuizzes(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(required = false) Long courseId
    ) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Quiz> quizzes;
        if (courseId != null) {
            quizzes = quizRepository.findByCourseId(courseId, pageable);
        } else {
            quizzes = quizRepository.findAll(pageable);
        }

        return quizzes.map(QuizResponseDTO::new);
    }

    
    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<QuizResponseDTO> getQuizById(@PathVariable Long id) {
        Optional<Quiz> quiz = quizRepository.findById(id);
        return quiz.map(q -> ResponseEntity.ok(new QuizResponseDTO(q)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<QuizResponseDTO> updateQuiz(@PathVariable Long id, @RequestBody QuizRequest quizRequest) {
        Optional<Quiz> optionalQuiz = quizRepository.findById(id);
        if (!optionalQuiz.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Quiz existingQuiz = optionalQuiz.get();
        existingQuiz.setTitle(quizRequest.getTitle());
        existingQuiz.setDescription(quizRequest.getDescription());
        existingQuiz.setContent(quizRequest.getContent());
        existingQuiz.setCorrectOption(quizRequest.getCorrectOption());

        if (quizRequest.getCourseId() != null) {
            Optional<Course> courseOptional = courseRepository.findById(quizRequest.getCourseId());
            courseOptional.ifPresent(existingQuiz::setCourse);
        }

        Quiz savedQuiz = quizRepository.save(existingQuiz);
        return ResponseEntity.ok(new QuizResponseDTO(savedQuiz));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        Optional<Quiz> quizOptional = quizRepository.findById(id);
        if (!quizOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        quizRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
