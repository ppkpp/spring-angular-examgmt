package com.course.elearning.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EnrollRequestDTO {
    private String notes;
    private String imageUrl;
    private Long courseId;
}
