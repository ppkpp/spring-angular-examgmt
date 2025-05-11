package com.course.manage.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String instructorName;
    
    private Double fees;
    private String duration;
    private Integer quizTime = 5; // Default: 5 minutes
    @CreationTimestamp // Automatically sets the current timestamp on insert
    private LocalDateTime createdDate;
    private String imageUrl;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private CourseCategory category;

    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Quiz> quizzes = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Video> videos = new ArrayList<>();
    
    @OneToOne(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonIgnore
    private ExamSession examSession;
    
}
