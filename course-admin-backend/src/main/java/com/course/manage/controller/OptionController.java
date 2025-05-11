package com.course.manage.controller;

import com.course.manage.dto.OptionRequest;
import com.course.manage.dto.OptionResponseDTO;
import com.course.manage.model.Option;
import com.course.manage.model.Quiz;
import com.course.manage.repository.OptionRepository;
import com.course.manage.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/options")
public class OptionController {

    @Autowired
    private OptionRepository optionRepository;

    @Autowired
    private QuizRepository quizRepository;

    // CREATE
    @PostMapping
    public Option createOption(@RequestBody OptionRequest optionRequest) {
        Quiz quiz = quizRepository.findById(optionRequest.getQuizId()).orElse(null);
        if (quiz == null) {
            throw new RuntimeException("Quiz not found");
        }

        Option option = new Option();
        option.setContent(optionRequest.getContent());
        option.setOptionNumber(optionRequest.getOptionNumber());
        option.setQuiz(quiz);

        return optionRepository.save(option);
    }

    // READ ALL
    @GetMapping
    public List<OptionResponseDTO> getAllOptions() {
        return optionRepository.findAll()
                .stream()
                .map(OptionResponseDTO::new)
                .collect(Collectors.toList());
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<OptionResponseDTO> getOptionById(@PathVariable Long id) {
        Optional<Option> option = optionRepository.findById(id);
        return option.map(o -> ResponseEntity.ok(new OptionResponseDTO(o)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<OptionResponseDTO> updateOption(@PathVariable Long id, @RequestBody OptionRequest optionRequest) {
        Optional<Option> optionalOption = optionRepository.findById(id);
        if (!optionalOption.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Option existingOption = optionalOption.get();
        existingOption.setContent(optionRequest.getContent());
        existingOption.setOptionNumber(optionRequest.getOptionNumber());

        if (optionRequest.getQuizId() != null) {
            Optional<Quiz> quizOptional = quizRepository.findById(optionRequest.getQuizId());
            quizOptional.ifPresent(existingOption::setQuiz);
        }

        Option savedOption = optionRepository.save(existingOption);
        return ResponseEntity.ok(new OptionResponseDTO(savedOption));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOption(@PathVariable Long id) {
        Optional<Option> optionOptional = optionRepository.findById(id);
        if (!optionOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        optionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
