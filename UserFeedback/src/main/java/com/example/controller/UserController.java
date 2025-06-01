package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.ApiResponse;
import com.example.dto.SignInDto;
import com.example.pojo.User;
import com.example.service.UserServiceImpl;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserServiceImpl userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> rigisterUser(@RequestBody User user){
		
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.Register(user));
	}
	
	@PostMapping("/signIn")
	public ResponseEntity<?> signIn(@RequestBody SignInDto signDto){
		
		User user = userService.SignIn(signDto);
		
		if(user != null) {
			return	ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("You have successfully Logged In "+user.getUserName(), true));
		}else {
			return	ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse("Invalid Credentials ",false));
		}
			
		 
		
				
		
	}
	

}
