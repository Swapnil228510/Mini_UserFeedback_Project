package com.example.pojo;


import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "feedbacks")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Feedback extends BaseEntity {

	@Column(length = 200)
	private String feedback;
	
	@ManyToOne
	@JoinColumn(name = "user_Id")
	private User user;
	
	@Column(name = "Date")
	private LocalDateTime localDate;
}
