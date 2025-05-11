package com.course.elearning.dto;



public class AuthResponse {
    private String message;
    private String token;
    private String username;

    private Long id;

    public AuthResponse(String message, String token, String username, Long id) {
        this.message = message;
        this.token = token;
        this.username = username;

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



    public Long getId() {
        return id;
    }
}
