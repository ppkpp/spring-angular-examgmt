package com.course.manage.repository;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.course.manage.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
