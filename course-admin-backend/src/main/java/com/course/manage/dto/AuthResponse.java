package com.course.manage.dto;

import com.course.manage.model.Role;

public class AuthResponse {
    private String message;
    private String token;
    private String username;
    private Role role; // Assuming Role is your enum
    private Long id;

    public AuthResponse(String message, String token, String username, Role role, Long id) {
        this.message = message;
        this.token = token;
        this.username = username;
        this.role = role;
        this.id = id;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public Role getRole() {
        return role;
    }

    public Long getId() {
        return id;
    }
}
