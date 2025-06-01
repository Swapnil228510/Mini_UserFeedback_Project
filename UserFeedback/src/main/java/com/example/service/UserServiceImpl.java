package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.dao.UserDao;
import com.example.dto.ApiResponse;
import com.example.dto.SignInDto;
import com.example.pojo.Roles;
import com.example.pojo.User;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PasswordEncoder encode;

	@Override
	public ApiResponse Register(User user) {
		
		user.setPassword(encode.encode(user.getPassword()));
		user.setRole(Roles.CUSTOMER);
		userDao.save(user);
		return new ApiResponse("User registerd Successfully ", true);
	}

	@Override
	public User SignIn(SignInDto signinDto) {
		User user = userDao.findByEmailAndPassword(signinDto.getEmail(), signinDto.getPassword()).orElseThrow(()-> new RuntimeException("Invalid Credentials"));
		
		return user;
	}
	
	

}
