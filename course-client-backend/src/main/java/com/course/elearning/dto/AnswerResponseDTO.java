package com.course.elearning.dto;

import com.course.elearning.model.Option;
import com.course.elearning.model.Quiz;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponseDTO {
	private Long id;
    private Quiz quiz;
    private Option selectedOption;
    private Boolean isCorrect;

}
