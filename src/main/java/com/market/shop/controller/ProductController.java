package com.market.shop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.market.shop.repositories.ProductRepository;
import com.market.shop.models.Products;
import com.market.shop.service.FileServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    private final FileServiceImpl fileService;

    public ProductController(FileServiceImpl fileService) {
        this.fileService = fileService;
    }

    @Value("${project.posters}")
    private String path;

    @Value("${base.Url}")
    private String baseUrl;

    @GetMapping("/{productId}")
    public ResponseEntity<Optional<Products>> getProductById(@PathVariable Integer productId) {
        Optional<Products> pro = productRepository.findById(productId);
        return ResponseEntity.ok(pro);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Products>> getAllProducts() {
        List<Products> pro = productRepository.findAll();
        return ResponseEntity.ok(pro);
    }

    @PostMapping("/post")
    public ResponseEntity<Products> addProduct(
            @RequestPart("product") String productJson,
            @RequestPart("image") MultipartFile file) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        Products product = objectMapper.readValue(productJson, Products.class);

        String uploadedFileName = fileService.uploadFile(path, file);
        String url = baseUrl + "/file/"+ path + uploadedFileName;
        product.setImgUrl(url);

        Products savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    }
}
