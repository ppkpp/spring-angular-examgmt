package com.course.elearning.controller;

import org.springframework.security.authentication.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.course.elearning.dto.AuthResponse;
import com.course.elearning.model.Student;
import com.course.elearning.repository.StudentRepository;

import com.course.elearning.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody Student student) {
		try {
			// Authenticate the user
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(student.getUsername(), student.getPassword()));

			// Retrieve the user from the database
			Optional<Student> userOptional = studentRepository.findByUsername(student.getUsername());
			if (!userOptional.isPresent()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new AuthResponse("User not found", null, null, null));
			}

			Student authenticatedUser = userOptional.get();

			// Generate JWT token
			String token = jwtUtils.generateJwtToken(authenticatedUser.getUsername());

			// Return response with user details
			return ResponseEntity.ok().body(new AuthResponse("Login successful", token, authenticatedUser.getUsername(),
					authenticatedUser.getId()));
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new AuthResponse("Invalid username or password", null, null, null));
		} catch (UsernameNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new AuthResponse("User not found", null, null, null));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new AuthResponse("An error occurred during login", null, null, null));
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody Student student) {
	    if (studentRepository.findByUsername(student.getUsername()).isPresent()) {
	        return ResponseEntity.status(HttpStatus.CONFLICT)
	                .body(new AuthResponse("Username is already taken", null, null, null));
	    }

	    // Encode the password before saving
	    student.setPassword(passwordEncoder.encode(student.getPassword()));

	    Student savedStudent = studentRepository.save(student);

	    return ResponseEntity.status(HttpStatus.CREATED)
	            .body(new AuthResponse("Registration successful", null, savedStudent.getUsername(), savedStudent.getId()));
	}
	
	@GetMapping("/profile")
	public ResponseEntity<?> getProfile() {
	    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    String username = (principal instanceof UserDetails)
	        ? ((UserDetails) principal).getUsername()
	        : principal.toString();

	    Optional<Student> studentOptional = studentRepository.findByUsername(username);
	    if (studentOptional.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
	    }

	    return ResponseEntity.ok(studentOptional.get());
	}

}
