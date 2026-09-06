package com.travelx.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

  @NotBlank(message = "Name is required")
  private String name;

  @Email(message = "Enter valid email")
  @NotBlank(message = "Email is required")
  private String email;

  @Size(min = 6, message = "Password should be minimum 6 characters")
  private String password;
}