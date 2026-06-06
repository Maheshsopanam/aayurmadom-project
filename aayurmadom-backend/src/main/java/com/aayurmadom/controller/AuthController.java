package com.aayurmadom.controller;

import com.aayurmadom.entity.User;
import com.aayurmadom.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return "Email already registered";
        }

        userRepository.save(user);
        return "Registration successful";
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginRequest) {

        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            return "Invalid email or password";
        }

        User user = userOptional.get();

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return "Invalid email or password";
        }

        return "Login successful";
    }
}