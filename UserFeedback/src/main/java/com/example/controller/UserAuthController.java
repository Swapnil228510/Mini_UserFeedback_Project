package com.example.controller;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.UserDao;
import com.example.dto.ApiResponse;
import com.example.dto.SignInDto;
import com.example.dto.SignInResponse;
import com.example.exception.ResourceNotFoundException;
import com.example.pojo.User;
import com.example.security.JWTUtils;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class UserAuthController {
	
	@Autowired
	private AuthenticationManager mnger;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private JWTUtils utils;
	
	@PostMapping("/signIn")
	public ResponseEntity<?> signIn(@RequestBody @Valid SignInDto signInDto){
		
		System.out.println(" in signIn ");
		try{
			
			Authentication principal = mnger.authenticate(new UsernamePasswordAuthenticationToken(signInDto.getEmail(), signInDto.getPassword()));
			if(principal.isAuthenticated()) {
				String jwtToken = utils.generateJwtToken(principal);//JWT implementation
						User userData = userDao.findByEmail(signInDto.getEmail()).orElseThrow(()-> new ResourceNotFoundException(" Invalid Email Address"));
				return ResponseEntity.status(HttpStatus.OK).body(new SignInResponse(userData, jwtToken, "Success"));
			}else
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( new ApiResponse("not authenticated", false));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage(),false));
			
		}
		
	}

}
