
package com.course.elearning.repository;

import com.course.elearning.model.Answer;
import com.course.elearning.model.CourseCategory;
import com.course.elearning.model.Quiz;
import com.course.elearning.model.Student;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
//	@Query("SELECT a FROM Answer a WHERE a.quiz.course.id = :courseId")
//	List<Answer> findByCourseId(@Param("courseId") Long courseId);
//
//	List<Answer> findByQuiz_Course_Id(Long courseId);
//	
//	  List<Answer> findByStudent_UsernameAndQuiz_Course_Id(String username, Long courseId);
//	  Optional<Answer> findByStudentAndQuiz(Student student, Quiz quiz);

}
