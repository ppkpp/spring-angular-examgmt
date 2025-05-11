package com.course.elearning.controller;

import com.course.elearning.model.Video;
import com.course.elearning.dto.CourseRequest;
import com.course.elearning.dto.QuizResponseDTO;
import com.course.elearning.dto.VideoRequest;
import com.course.elearning.dto.VideoResponseDTO;
import com.course.elearning.model.Course;
import com.course.elearning.model.CourseCategory;
import com.course.elearning.model.Quiz;
import com.course.elearning.repository.VideoRepository;
import com.course.elearning.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/video-courses")
public class VideoController {

	@Autowired
	private VideoRepository videoRepository;

	@Autowired
	private CourseRepository courseRepository;

	@GetMapping
	public Page<VideoResponseDTO> getAllVideos(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "5") int size, @RequestParam(required = false) Long courseId) {
		Pageable pageable = PageRequest.of(page, size);

		Page<Video> videoes;
		if (courseId != null) {
			videoes = videoRepository.findByCourseId(courseId, pageable);
		} else {
			videoes = videoRepository.findAll(pageable);
		}

		return videoes.map(VideoResponseDTO::new);
	}

	// READ ONE
	@GetMapping("/{id}")
	public ResponseEntity<VideoResponseDTO> getVideoById(@PathVariable Long id) {
		Optional<Video> video = videoRepository.findById(id);
		// ResponseEntity<?> return video.map(ResponseEntity::ok)
		// .orElseGet(() -> ResponseEntity.notFound().build());
		return video.map(v -> ResponseEntity.ok(new VideoResponseDTO(v)))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

}
