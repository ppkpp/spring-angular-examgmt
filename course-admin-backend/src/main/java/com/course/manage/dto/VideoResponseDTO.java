package com.course.manage.dto;

import java.time.LocalDateTime;

import com.course.manage.model.Course;
import com.course.manage.model.Video;
import lombok.Data;

@Data
public class VideoResponseDTO {
    private Long id;
    private String title;
    private String imageUrl;
    private Course course; // Full course object
    private Long duration;
    private String description;
    private LocalDateTime createdDate;
    public VideoResponseDTO(Video video) {
        this.id = video.getId();
        this.title = video.getTitle();
        this.imageUrl = video.getImageUrl();
        this.course = video.getCourse(); // full course object
        this.duration = video.getDuration();
        this.description = video.getDescription();
        this.createdDate = video.getCreatedDate();
    }
}
