package com.course.elearning.dto;

import com.course.elearning.model.Option;

import lombok.Data;

@Data
public class OptionResponseDTO {
    private Long id;
    private String content;
    private Integer optionNumber;
    private Long quizId; // Only returning the Quiz ID here

    // Constructor to map the Option entity to DTO
    public OptionResponseDTO(Option option) {
        this.id = option.getId();
        this.content = option.getContent();
        this.optionNumber = option.getOptionNumber();
        this.quizId = option.getQuiz() != null ? option.getQuiz().getId() : null; // Set quiz ID
    }

}
