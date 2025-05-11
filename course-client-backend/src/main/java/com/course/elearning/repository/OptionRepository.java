package com.course.elearning.repository;

import com.course.elearning.model.Option;
import com.course.elearning.model.Quiz;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {
	 Optional<Option> findByQuizAndOptionNumber(Quiz quiz, Integer optionNumber);

}
