package com.course.manage.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.course.manage.dto.ExamResponseDTO;
import com.course.manage.model.Course;
import com.course.manage.model.ExamSession;
import com.course.manage.model.Student;
import com.course.manage.repository.CourseRepository;
import com.course.manage.repository.ExamSessionRepository;
import com.course.manage.repository.StudentRepository;

@RestController
@RequestMapping("/api/examsessions")
public class ExamSessionController {

    @Autowired
    private ExamSessionRepository examSessionRepository;

    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
   
 // Convert ExamSession to ExamResponseDTO
    private ExamResponseDTO convertToDTO(ExamSession session) {
        return new ExamResponseDTO(
            session.getId(), 
            session.getCourse(), 
            session.getStartTime(),
            session.getEndTime(), 
            session.getAnswers(), 
            session.getStudent(), 
            session.getIsFinished()
        );
    }

    // Get exam sessions by student ID and return them as DTOs
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ExamResponseDTO>> getExamSessionsByStudentId(@PathVariable Long studentId) {
        // Fetch the exam sessions for the student
        List<ExamSession> examSessions = examSessionRepository.findByStudentId(studentId);

        // Convert ExamSession list to ExamResponseDTO list
        List<ExamResponseDTO> examResponseDTOs = examSessions.stream()
            .map(this::convertToDTO)  // Convert each ExamSession to ExamResponseDTO
            .collect(Collectors.toList());

        // Return the list of DTOs as the response
        return ResponseEntity.ok(examResponseDTOs);
    }
    
    

}