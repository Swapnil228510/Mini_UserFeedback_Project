package com.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.dao.UserDao;
import com.example.pojo.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomUserDetailsSeviceImpl implements UserDetailsService {
	
	
	@Autowired
 	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		User user = userDao.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException(" Invalid Email Entered "));
		
		
		return new CustomUserDetails(user);
	}

}
