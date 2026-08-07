package com.travelx.backend.service;

import com.travelx.backend.entity.User;
import com.travelx.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  public User saveUser(User user) {

    // Duplicate Email Check
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
      throw new RuntimeException("Email already exists");
    }

    // Encrypt Password
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    // Save User
    return userRepository.save(user);
  }

}