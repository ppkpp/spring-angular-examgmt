package com.course.elearning.dto;

import lombok.Data;

@Data
public class SubmitAnswerRequest {
    private Long quizId;
    private Long courseId;
    private Integer answerNumber;
    private boolean finalAnswer;
}
