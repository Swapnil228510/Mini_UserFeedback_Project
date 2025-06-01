package com.example.pojo;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "password")
public class User extends BaseEntity {
	
	@NotBlank(message = "UserName should not be blank!! ")
	@Column(length = 20)
	private String userName;
	
	@NotBlank
	@Column(nullable = false)
	private String password;
	
	@NotBlank(message = "Email should not be blank!! ")
	@Column(length = 80 ,unique = true)
	private String email;
	
	@Column(length = 10)
	private String gender;
	
	@NotBlank(message = "Mobile number should not be blank")
	@Column(length = 13)
	private String mobNo;
	
	@Enumerated(EnumType.STRING)
	private Roles role;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Feedback> feedbacks;

}
