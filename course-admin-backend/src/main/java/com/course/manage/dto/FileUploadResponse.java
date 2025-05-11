package com.course.manage.dto;

import lombok.Data;

@Data
public class FileUploadResponse {
    private String originalFilename;
    private String savedFilename;
    private String path;
    private String webUrl;
    private String thumbnailUrl;
    private String fileType;
    private Long duration;
    /* Getters and setters
    public String getOriginalFilename() { return originalFilename; }
    public void setOriginalFilename(String originalFilename) { this.originalFilename = originalFilename; }

    public String getSavedFilename() { return savedFilename; }
    public void setSavedFilename(String savedFilename) { this.savedFilename = savedFilename; }

    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }

    public String getWebUrl() { return webUrl; }
    public void setWebUrl(String webUrl) { this.webUrl = webUrl; }
    
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }
   */
}
