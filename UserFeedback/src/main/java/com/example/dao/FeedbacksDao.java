package com.example.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dto.FeedbackDto;
import com.example.pojo.Feedback;

@Repository
public interface FeedbacksDao extends JpaRepository<Feedback, Long> {
	
	Optional<List<Feedback>> findByUserId(Long userId);

}
