package com.course.manage.controller;

import com.course.manage.model.Video;
import com.course.manage.dto.CourseRequest;
import com.course.manage.dto.QuizResponseDTO;
import com.course.manage.dto.VideoRequest;
import com.course.manage.dto.VideoResponseDTO;
import com.course.manage.model.Course;
import com.course.manage.model.CourseCategory;
import com.course.manage.model.Quiz;
import com.course.manage.repository.VideoRepository;
import com.course.manage.repository.CourseRepository;
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

    
    
    
    @PostMapping
    public Video createVideo(@RequestBody VideoRequest videoRequest) {
        // Fetch the category by ID using the repository directly
        Course course = courseRepository.findById(videoRequest.getCourseId()).orElse(null);
        if (course == null) {
            throw new RuntimeException("Course not found");
        }

        // Create a new course and set its category
        Video video = new Video();
        video.setTitle(videoRequest.getTitle());
        video.setImageUrl(videoRequest.getImageUrl());
        video.setOrderNumber(videoRequest.getOrderNumber());
        video.setCourse(course);
        video.setDescription(videoRequest.getDescription());
        video.setDuration(videoRequest.getDuration());

        // Save the course using the repository directly
        return videoRepository.save(video);
    }
    
    // READ ALL
//    @GetMapping
//    public List<VideoResponseDTO> getAllVideos() {
//    	return videoRepository.findAll()
//                .stream()
//                .map(VideoResponseDTO::new)
//                .collect(Collectors.toList());
//    }
    
//    @GetMapping
//    public Page<VideoResponseDTO> getAllVideos(
//        @RequestParam(defaultValue = "0") int page,
//        @RequestParam(defaultValue = "5") int size
//    ) {
//        Pageable pageable = PageRequest.of(page, size);
//        return videoRepository.findAll(pageable)
//                .map(VideoResponseDTO::new);
//    }
    @GetMapping
    public Page<VideoResponseDTO> getAllVideos(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(required = false) Long courseId
    ) {
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
       //ResponseEntity<?> return video.map(ResponseEntity::ok)
         //           .orElseGet(() -> ResponseEntity.notFound().build());
        return video.map(v -> ResponseEntity.ok(new VideoResponseDTO(v)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVideo(@PathVariable Long id, @RequestBody Video updatedVideo) {
        Optional<Video> optionalVideo = videoRepository.findById(id);
        if (!optionalVideo.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Video existingVideo = optionalVideo.get();
        existingVideo.setTitle(updatedVideo.getTitle());
        existingVideo.setImageUrl(updatedVideo.getImageUrl());
        existingVideo.setOrderNumber(updatedVideo.getOrderNumber());

        if (updatedVideo.getCourse() != null && updatedVideo.getCourse().getId() != null) {
            Optional<Course> courseOptional = courseRepository.findById(updatedVideo.getCourse().getId());
            courseOptional.ifPresent(existingVideo::setCourse);
        }

        Video saved = videoRepository.save(existingVideo);
        return ResponseEntity.ok(saved);
    }

    /* DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideo(@PathVariable Long id) {
        if (!videoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        videoRepository.deleteById(id);
        return ResponseEntity.ok("Video deleted successfully");
    }*/
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable Long id) {
        Optional<Video> videoOptional = videoRepository.findById(id);
        if (!videoOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        videoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
