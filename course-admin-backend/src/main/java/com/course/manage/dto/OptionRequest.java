package com.course.manage.dto;

import lombok.Data;

@Data
public class OptionRequest {
    private String content;
    private Integer optionNumber;
    private Long quizId; // ID of the associated quiz

    
}
