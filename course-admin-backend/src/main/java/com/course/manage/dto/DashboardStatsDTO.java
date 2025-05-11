package com.course.manage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsDTO {
    private long totalStudents;
    private long totalCourses;
    private long totalVideos;
    private long totalQuizzes;
}
