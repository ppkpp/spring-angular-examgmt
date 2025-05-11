package com.course.manage.dto;

import lombok.Data;

@Data
public class CourseRequest {
    private String title;
    private String description;
    private String instructorName;
    private String imageUrl;
    private Long categoryId; // categoryId instead of category object
    private Double fees;
    private String duration;
    private Integer quizTime;
    // Getters and Setters
}

