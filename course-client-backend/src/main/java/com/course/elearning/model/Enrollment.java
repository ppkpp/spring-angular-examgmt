package com.course.elearning.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String imageUrl;

	@Enumerated(EnumType.STRING)
	private EnrollmentStatus enrollmentStatus = EnrollmentStatus.PENDING;

	private String notes;

	@ManyToOne
	private Student student;

	@ManyToOne
	private Course course;

	private LocalDateTime enrollmentDate = LocalDateTime.now();
}
