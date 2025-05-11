package com.course.elearning.dto;

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
    // Getters and Setters
}

