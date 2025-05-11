package com.course.elearning.model;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    // The student who gave the answer
//    @ManyToOne
//    @JoinColumn(name = "student_id")
//    private Student student;

    // The quiz that the answer belongs to
    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    // The selected option (chosen by the student)
    @ManyToOne
    @JoinColumn(name = "selected_option_id")
    private Option selectedOption;

    // Automatically evaluated status
    private Boolean isCorrect;
    
    @ManyToOne
    @JoinColumn(name = "exam_session_id")
    private ExamSession examSession;

}
