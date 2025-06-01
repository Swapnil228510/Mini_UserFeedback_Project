package com.example.dto;

import java.time.LocalDateTime;

import com.example.pojo.User;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class SignInResponse {
	private Long id;
	private String userName;
	private String email;
	private String role;
	private String mobNo;
	private String gender;
	private String jwt;
	private String status; 
	
	public SignInResponse()
	{
		super();
	}
	
	public SignInResponse(User curruser, String jwt,String status){
        this.id = curruser.getId();
        this.email = curruser.getEmail();
        this.userName=curruser.getUserName();
        this.gender = curruser.getGender();
        this.mobNo = curruser.getMobNo();
        this.role=curruser.getRole().toString();
        this.jwt = jwt;
        this.status=status;
    }

}
