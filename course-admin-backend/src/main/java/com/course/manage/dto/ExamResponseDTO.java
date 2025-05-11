
package com.course.manage.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.course.manage.model.Answer;
import com.course.manage.model.Course;
import com.course.manage.model.Option;
import com.course.manage.model.Quiz;
import com.course.manage.model.Student;

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
