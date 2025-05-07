package com.market.shop.service;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
@Service
public class FileServiceImpl{

    public String uploadFile(String path, MultipartFile file) throws IOException {
        if(Files.exists(Paths.get(path+File.separator+file.getOriginalFilename()))) {
            throw new IOException("File All ready Exists");
        }
        String fileName=file.getOriginalFilename();
        String filePath=path+ File.separator+fileName;
        File f=new File(path);
        if(!f.exists()){
            f.mkdir();
        }
        Files.copy(file.getInputStream(), Paths.get(filePath));
        return fileName;
    }


    public InputStream getResourceFile(String path, String fileName) throws FileNotFoundException {
        String  filePath=path+File.separator+fileName;
        return new FileInputStream(filePath);
    }
}