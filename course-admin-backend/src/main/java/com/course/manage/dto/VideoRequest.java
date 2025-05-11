package com.course.manage.dto;

import lombok.Data;

@Data
public class VideoRequest {
	  private int orderNumber;
	    private String title;
	    private String imageUrl;
	    private Long courseId;
	    private Long duration;
	    private String description;
}
