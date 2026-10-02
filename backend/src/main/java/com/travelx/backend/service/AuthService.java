package com.travelx.backend.service;

import com.travelx.backend.controller.dto.LoginRequest;
import com.travelx.backend.controller.dto.LoginResponse;
import com.travelx.backend.entity.User;
import com.travelx.backend.repository.UserRepository;
import com.travelx.backend.Security.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthService(
      UserRepository userRepository,
      BCryptPasswordEncoder passwordEncoder,
      JwtService jwtService) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  public LoginResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("Invalid email or password"));

    if (!passwordEncoder.matches(
        request.getPassword(),
        user.getPassword())) {

      throw new RuntimeException("Invalid email or password");
    }

    String token = jwtService.generateToken(user.getEmail());

    return new LoginResponse(
        token,
        user.getId(),
        user.getName(),
        user.getEmail());
  }
}