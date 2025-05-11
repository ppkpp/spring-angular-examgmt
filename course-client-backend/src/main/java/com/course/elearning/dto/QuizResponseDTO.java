package com.course.elearning.dto;

import java.util.List;

import com.course.elearning.model.Course;
import com.course.elearning.model.Option;
import com.course.elearning.model.Quiz;
import lombok.Data;

@Data
public class QuizResponseDTO {

    private Long id;
    private String title;
    private String description;
    private String content;
   
    private Long courseId;
    private Course course; // Full course object
    private List<Option> option;
    public QuizResponseDTO(Quiz quiz) {
        this.id = quiz.getId();
        this.title = quiz.getTitle();
        this.description = quiz.getDescription();
        this.content = quiz.getContent();
       
        this.courseId = quiz.getCourse() != null ? quiz.getCourse().getId() : null;
        this.course = quiz.getCourse();
        this.option = quiz.getOptions();
    }
}
