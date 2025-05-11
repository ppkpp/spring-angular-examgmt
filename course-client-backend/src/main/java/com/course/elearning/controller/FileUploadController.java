package com.course.elearning.controller;

import com.course.elearning.dto.FileUploadResponse;

import net.coobird.thumbnailator.Thumbnails;

import org.mp4parser.IsoFile;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    // Absolute path (change it based on your real directory)
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";
    
    @PostMapping("/uploads")
    public ResponseEntity<FileUploadResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Create upload and thumbnail directories
            new File(UPLOAD_DIR).mkdirs();
            new File(UPLOAD_DIR).mkdirs();

            String originalFilename = file.getOriginalFilename();
            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String saveFileUUId = UUID.randomUUID().toString();
            String savedFilename = saveFileUUId+ extension;
            String fullPath = UPLOAD_DIR + savedFilename;

            // Save the uploaded file
            file.transferTo(new File(fullPath));

            // Detect MIME type
            String mimeType = Files.probeContentType(Paths.get(fullPath));
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }

            // Generate thumbnail if image or video
            String thumbnailUrl = null;
            String thumbFilename =   saveFileUUId+"_thumb" + ".jpg";
            String thumbPath = UPLOAD_DIR + thumbFilename;
            Long videoDuration = null;
            if (mimeType.startsWith("image")) {
                Thumbnails.of(fullPath)
                        .size(150, 150)
                        .toFile(thumbPath);
                thumbnailUrl = "/uploads/" + thumbFilename;
            } else if (mimeType.startsWith("video")) {
                // Extract frame at 1 second
                ProcessBuilder pb = new ProcessBuilder(
                        "ffmpeg", "-i", fullPath,
                        "-ss", "00:00:03.000",
                        "-vframes", "1",
                        thumbPath
                );
                pb.redirectErrorStream(true);
                Process process = pb.start();
                int exitCode = process.waitFor();

                if (exitCode == 0 && new File(thumbPath).exists()) {
                    thumbnailUrl = "/uploads/" + thumbFilename;
                }
                // Extract duration using mp4parser
                try (FileInputStream fis = new FileInputStream(fullPath)) {
                    IsoFile isoFile = new IsoFile(fis.getChannel());
                    double seconds = (double)
                            isoFile.getMovieBox().getMovieHeaderBox().getDuration() /
                            isoFile.getMovieBox().getMovieHeaderBox().getTimescale();
                    videoDuration = (long) (seconds ); // milliseconds
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            // Build and return the response
            FileUploadResponse response = new FileUploadResponse();
            response.setOriginalFilename(originalFilename);
            response.setSavedFilename(savedFilename);
            response.setPath(fullPath);
            response.setWebUrl("/uploads/" + savedFilename);
            response.setThumbnailUrl(thumbnailUrl);
            response.setFileType(mimeType);
            response.setDuration(videoDuration);
            return ResponseEntity.ok(response);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    
    /*@PostMapping("/uploads")
    public ResponseEntity<FileUploadResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Create the upload directory if it doesn't exist
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Get original filename and extension
            String originalFilename = file.getOriginalFilename();
            String extension = "";

            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            // Generate unique filename
            String savedFilename = UUID.randomUUID().toString() + extension;
            String filePath = UPLOAD_DIR + savedFilename;

            // Save the file to disk
            file.transferTo(new File(filePath));

            // Generate web-accessible URL (you must configure static resource mapping)
            String fileUrl = "/uploads/" + savedFilename;

            // Prepare response
            FileUploadResponse response = new FileUploadResponse();
            response.setOriginalFilename(originalFilename);
            response.setSavedFilename(savedFilename);
            response.setPath(filePath);
            response.setWebUrl(fileUrl);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }*/
    
    
    @GetMapping("/uploads/{filename}")
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable String filename) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR + filename);

        if (!Files.exists(filePath)) {
            return ResponseEntity.notFound().build();
        }

        byte[] data = Files.readAllBytes(filePath);
        ByteArrayResource resource = new ByteArrayResource(data);

        // Try to detect image MIME type
        String contentType = Files.probeContentType(filePath);
        if (contentType == null) {
            contentType = "image/jpeg"; // default fallback
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=" + filename)
                .contentType(MediaType.parseMediaType(contentType))
                .contentLength(data.length)
                .body(resource);
    }
    
} 