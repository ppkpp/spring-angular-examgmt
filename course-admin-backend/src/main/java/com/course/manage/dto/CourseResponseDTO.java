package com.course.manage.dto;

import com.course.manage.model.Course;

import lombok.Data;

@Data
public class CourseResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String instructorName;
    private String imageUrl;
    private Long categoryId; // Only the category ID
    private Double fees;
    private String duration;
    private Integer quizTime;
    public CourseResponseDTO(Course course) {
        this.id = course.getId();
        this.title = course.getTitle();
        this.description = course.getDescription();
        this.instructorName = course.getInstructorName();
        this.imageUrl = course.getImageUrl();
        this.fees = course.getFees();
        this.duration = course.getDuration();
        this.quizTime = course.getQuizTime();
        this.categoryId = course.getCategory() != null ? course.getCategory().getId() : null;
    }


}
