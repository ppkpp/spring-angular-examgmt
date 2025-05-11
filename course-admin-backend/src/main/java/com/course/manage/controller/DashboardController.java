package com.course.manage.controller;



import com.course.manage.dto.DashboardStatsDTO;
import com.course.manage.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private QuizRepository quizRepository;

    @GetMapping
    public DashboardStatsDTO getDashboardStats() {
        long totalStudents = studentRepository.count();
        long totalCourses = courseRepository.count();
        long totalVideos = videoRepository.count();
        long totalQuizzes = quizRepository.count();

        return new DashboardStatsDTO(totalStudents, totalCourses, totalVideos, totalQuizzes);
    }
}
