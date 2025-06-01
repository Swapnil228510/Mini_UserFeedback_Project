package com.example.security;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.pojo.User;

@SuppressWarnings("serial")
public class CustomUserDetails implements UserDetails {
	
	@Autowired
	private User users;
	
	public CustomUserDetails(User user) {
		super();
		this.users = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(users.getRole().name()));
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return users.getPassword();
	}

	@Override
	public String getUsername() { //we will validate by email
		// TODO Auto-generated method stub
		return users.getEmail();
	}

}
