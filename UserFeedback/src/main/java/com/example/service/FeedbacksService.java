package com.example.service;

import java.util.List;

import com.example.dto.ApiResponse;
import com.example.dto.FeedbackDetailsResponseDto;
import com.example.dto.FeedbackDto;
import com.example.pojo.Feedback;

public interface FeedbacksService {
	
	public ApiResponse addFeedbackByUserId(Feedback feedback,Long useriD);
	
	public List<FeedbackDto> allFeedbackforUser(Long userId); 
	
	public List<FeedbackDto> updateFeedBack(FeedbackDto feedDto, Long feedbackId);
	
	public String deleteFeedBack(Long feedId);
	
	public List<FeedbackDto> getAllFeedbacks();
	
	public FeedbackDetailsResponseDto detailedFeedbackInfo(Long feedId);

}
