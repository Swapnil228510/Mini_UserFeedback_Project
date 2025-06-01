package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.FeedbackDto;
import com.example.pojo.Feedback;
import com.example.service.FeedbackServiceImpl;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/feedback")
public class FeedbackController {
	
	@Autowired
	private FeedbackServiceImpl feedbackService;
	
	@PostMapping("/add/{userId}")
	public ResponseEntity<?> addFeedbackByUser(@RequestBody Feedback feedback, @PathVariable Long userId){
		
		return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.addFeedbackByUserId(feedback, userId));
		
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<?> getAllFeedbackByUser( @PathVariable Long userId){
		
		return ResponseEntity.status(HttpStatus.OK).body(feedbackService.allFeedbackforUser(userId));
		
	}
	
	@PutMapping("/update/{feedId}")
	public ResponseEntity<?> updateFeedbackbyFeedId(@RequestBody FeedbackDto feedDto, @PathVariable Long feedId){
		
		return ResponseEntity.status(HttpStatus.OK).body(feedbackService.updateFeedBack(feedDto, feedId));
		
	}
	
	//Admin API
	@DeleteMapping("/delete/{feedid}")
	public ResponseEntity<?> deleteFeedById (@PathVariable Long feedid){
		
		return ResponseEntity.status(HttpStatus.OK).body(feedbackService.deleteFeedBack(feedid));
	}
	
	//AdminAPI
	@GetMapping("/all")
	public ResponseEntity<?> getAllFeedbacks (){
		return ResponseEntity.status(HttpStatus.OK).body(feedbackService.getAllFeedbacks());
		
	}
	
	//AdminAPI
	@GetMapping("/singlefeed/{feedId}")
	public ResponseEntity<?> getSingleFeedbackDetails(@PathVariable Long feedId){
		
		return ResponseEntity.status(HttpStatus.OK).body(feedbackService.detailedFeedbackInfo(feedId));
		
	}
	
}
