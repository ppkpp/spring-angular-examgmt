package com.course.manage.controller;

import com.course.manage.model.Student;
import com.course.manage.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping
    public Page<Student> getAllStudents(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return studentRepository.findAll(pageable);
    }

   

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        Student student = studentRepository.findById(id).orElse(null);
        if (student != null) {
            student.setUsername(studentDetails.getUsername());
            if (studentDetails.getPassword() != null && !studentDetails.getPassword().isBlank()) {
                student.setPassword(passwordEncoder.encode(studentDetails.getPassword()));
            }
            student.setPhone(studentDetails.getPhone());
            student.setEmail(studentDetails.getEmail());
            student.setDob(studentDetails.getDob());
            student.setGender(studentDetails.getGender());
            student.setImageUrl(studentDetails.getImageUrl());
            return studentRepository.save(student);
        }
        return null;
    }

    
}
