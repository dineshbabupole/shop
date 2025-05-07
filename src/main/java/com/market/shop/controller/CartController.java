package com.market.shop.controller;

import com.market.shop.models.Cart;
import com.market.shop.models.Products;
import com.market.shop.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*") // Allow frontend (React) to access
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Add product to cart
    @PostMapping("/add")
    public String addProductToCart(@RequestBody Cart cart) {
        return cartService.addProduct(cart);
    }

    // Get all products in user's cart
    @GetMapping("/user/{userId}")
    public List<Products> getProductsInCart(@PathVariable int userId) {
        return cartService.getProducts(userId);
    }

    // Delete product from cart
    @DeleteMapping("/delete/{userId}/{productId}")
    public String deleteProductFromCart(@PathVariable int userId, @PathVariable int productId) {
        return cartService.deleteProduct(userId, productId);
    }
}
