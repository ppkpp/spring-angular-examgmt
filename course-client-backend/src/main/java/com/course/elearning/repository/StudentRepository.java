package com.course.elearning.repository;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.course.elearning.model.Student;


public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUsername(String username);
}
