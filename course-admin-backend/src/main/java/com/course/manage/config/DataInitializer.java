package com.course.manage.config;

import com.course.manage.model.Role;
import com.course.manage.model.User;
import com.course.manage.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDefaultUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String defaultUsername = "admin";

            if (userRepository.findByUsername(defaultUsername).isEmpty()) {
                User user = new User();
                user.setUsername(defaultUsername);
                user.setPassword(passwordEncoder.encode("admin123"));
                user.setRole(Role.ADMIN); // Set default role
                user.setEmail("admin@example.com"); // Set default email
                user.setPhone("09123456789"); // Set default phone number

                userRepository.save(user);
                System.out.println("✅ Default user created: " + defaultUsername);
            } else {
                System.out.println("ℹ️ Default user already exists: " + defaultUsername);
            }
        };
    }
}
