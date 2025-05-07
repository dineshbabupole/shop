package com.market.shop.controller;

import org.springframework.web.bind.annotation.RestController;



import com.market.shop.service.FileServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/file/")
public class FileController {

    @Value("${project.posters}")
    private  String path;
    private final FileServiceImpl fileService;

    public FileController(FileServiceImpl fileService) {
        this.fileService = fileService;
    }
    @PostMapping("/Upload")
    public ResponseEntity<String>  uploadFileName(@RequestPart MultipartFile file) throws IOException{
        String uploadFileName=fileService.uploadFile(path,file);
        return ResponseEntity.ok("File uploaded:"+uploadFileName);
    }
    @GetMapping("poster/{fileName}")
    public void servFileHandler(@PathVariable String fileName, HttpServletResponse response) throws IOException {
        InputStream resourceFile= fileService.getResourceFile(path,fileName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resourceFile,response.getOutputStream());
    }
}