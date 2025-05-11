package com.course.elearning.dto;

import lombok.Data;

@Data
public class QuizRequest {

    private String title;
    private String description;
    private String content;
    private Integer correctOption;
    private Long courseId;
}
