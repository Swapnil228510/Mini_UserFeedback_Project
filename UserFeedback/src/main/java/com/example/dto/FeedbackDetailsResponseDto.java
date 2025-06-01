package com.example.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FeedbackDetailsResponseDto {
	
	private String userName;
	
	private String email;
	
	private String mobNo;
	
	private String gender;
	
	private FeedbackDto feedDto;
	

}
