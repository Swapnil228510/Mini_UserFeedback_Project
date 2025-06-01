package com.example.service;

import com.example.dto.ApiResponse;
import com.example.dto.SignInDto;
import com.example.pojo.User;


public interface UserService {
	
	public ApiResponse Register(User user);
	
	public User SignIn(SignInDto signinDto);
	
	

}
