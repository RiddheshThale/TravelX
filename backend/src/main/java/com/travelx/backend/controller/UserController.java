package com.travelx.backend.controller;

import com.travelx.backend.dto.RegisterRequest;
import com.travelx.backend.entity.User;
import com.travelx.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping("/register")
  public User register(@Valid @RequestBody RegisterRequest request) {

    User user = new User();

    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPassword(request.getPassword());

    return userService.saveUser(user);
  }
}