package com.example.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.FeedbacksDao;
import com.example.dao.UserDao;
import com.example.dto.ApiResponse;
import com.example.dto.FeedbackDetailsResponseDto;
import com.example.dto.FeedbackDto;
import com.example.exception.ResourceNotFoundException;
import com.example.pojo.Feedback;
import com.example.pojo.User;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbacksService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private FeedbacksDao feedbackDao;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public  ApiResponse addFeedbackByUserId(Feedback feedbackByUser, Long useriD) {
		User user = userDao.findById(useriD).orElseThrow(()-> new RuntimeException("Invalid User Id "));
		
		Feedback feedback = new Feedback();
		feedback.setUser(user);
		feedback.setFeedback(feedbackByUser.getFeedback());
		feedback.setLocalDate(LocalDateTime.now());
		
		feedbackDao.save(feedback);
			
		return  new ApiResponse("Feedback added Successfully ", true);
	}

	@Override
	public List<FeedbackDto> allFeedbackforUser(Long userId) {
		List<Feedback> feedbackList = feedbackDao.findByUserId(userId).orElseThrow(()-> new RuntimeException("Invalid User Id"));
		
		List<FeedbackDto> allFeedbacksDto = new ArrayList<FeedbackDto>();
		
		for(Feedback singleFeedBack : feedbackList) {
			 FeedbackDto feeddto = mapper.map(singleFeedBack, FeedbackDto.class);
			 allFeedbacksDto.add(feeddto);
			
		}
		
		return allFeedbacksDto;
	}

	@Override
	public List<FeedbackDto> updateFeedBack(FeedbackDto updatedFeedDto, Long feedbackId) {
		Feedback feedback = feedbackDao.findById(feedbackId).orElseThrow(()-> new RuntimeException("Invalid Feedback Id "));
		
		Long userId = feedback.getUser().getId();
		feedback.setFeedback(updatedFeedDto.getFeedback());
		feedback.setLocalDate(LocalDateTime.now());
		
		
		
		feedbackDao.save(feedback);
		
		
		return allFeedbackforUser(userId);
	}

	@Override
	public String deleteFeedBack(Long feedId) {
		Feedback feedback = feedbackDao.findById(feedId).orElseThrow(()-> new RuntimeException("Invalid Feedback Id "));
		
		if(feedback != null) {
			feedbackDao.deleteById(feedId);
			
			return "Feedback is removed";
			
		}
		
		return "Invalid Feedback Id please check once";
	}

	@Override
	public List<FeedbackDto> getAllFeedbacks() {
		List<Feedback> feedbackList = feedbackDao.findAll();
		
		List<FeedbackDto> feedDtoList = new ArrayList<>();
		
		for(Feedback feed :  feedbackList) {
			FeedbackDto singleFeedDto = mapper.map(feed,FeedbackDto.class);
			feedDtoList.add(singleFeedDto);
		}
		return feedDtoList;
	}

	@Override
	public FeedbackDetailsResponseDto detailedFeedbackInfo(Long feedId) {
		
		Feedback singleFeed = feedbackDao.findById(feedId).orElseThrow(()-> new ResourceNotFoundException("Invalid Feedback Id"));
		
		User user = userDao.findById(singleFeed.getUser().getId()).orElseThrow(()-> new ResourceNotFoundException("Invalid User Id"));;
		
		FeedbackDto feedDto = mapper.map(singleFeed, FeedbackDto.class);
		System.out.println("feedback dto asjhabhjda"+ feedDto);
		
		FeedbackDetailsResponseDto detailsFeedResponse = mapper.map(user, FeedbackDetailsResponseDto.class);
		
		detailsFeedResponse.setFeedDto(feedDto);
		
		
		
		
		return detailsFeedResponse;
	}
	
	
	
	
	

}
