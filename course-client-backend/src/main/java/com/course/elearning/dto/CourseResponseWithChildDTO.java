

package com.course.elearning.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.course.elearning.model.Course;
import com.course.elearning.model.CourseCategory;
import com.course.elearning.model.Quiz;
import com.course.elearning.model.Video;

import lombok.Data;

@Data
public class CourseResponseWithChildDTO {
    private Long id;
    private String title;
    private String description;
    private String instructorName;
    private String imageUrl;
    private Long categoryId; // Only the category ID
    private List<Video> video;
    private List<Quiz> quiz;
    private CourseCategory category;
    private Double fees;
    private String duration;
    private LocalDateTime createDate;
    private Integer quizTime;
    public CourseResponseWithChildDTO(Course course) {
        this.id = course.getId();
        this.title = course.getTitle();
        this.description = course.getDescription();
        this.instructorName = course.getInstructorName();
        this.imageUrl = course.getImageUrl();
        this.fees = course.getFees();
        this.duration = course.getDuration();
        this.category = course.getCategory();
        this.categoryId = course.getCategory() != null ? course.getCategory().getId() : null;
        this.video = course.getVideos();
        this.quiz = course.getQuizzes();
        this.quizTime = course.getQuizTime();
        this.createDate = course.getCreatedDate();
    }


}
