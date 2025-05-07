package com.market.shop.controller;

import com.market.shop.models.User;
import com.market.shop.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import  com.market.shop.UserNotFoundException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/auth")
public class UserController {


    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user){
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("Email already registered");
        }
        userRepository.save(user);
        return ResponseEntity.ok("user Registered");
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user)throws UserNotFoundException{
        Optional<User> existing = userRepository.findByEmail(user.getEmail());

        User userFromDb = existing.orElseThrow(() -> new UserNotFoundException("Invalid user or password"));

        if (!userFromDb.getPassword().equals(user.getPassword())) {
            throw new UserNotFoundException("Invalid user or password");
        }

        String email = user.getEmail();
        Integer userId = existing.get().getId();



        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login successful",
                "user", Map.of(
                        "email", email,
                        "userId", userId
                )
        ));
    }
}
