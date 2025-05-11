
package com.course.elearning.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.course.elearning.model.Answer;
import com.course.elearning.model.Course;
import com.course.elearning.model.Option;
import com.course.elearning.model.Quiz;
import com.course.elearning.model.Student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExamResponseDTO {
	private Long id;
	private Course course;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
    private List<Answer> answer;
   private Student student;
    private Boolean isFinish;

}
