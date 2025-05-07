package com.market.shop.service;
import com.market.shop.repositories.CartRepository;
import com.market.shop.repositories.ProductRepository;
import com.market.shop.models.Cart;
import com.market.shop.models.Products;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class CartService {

    private CartRepository cartRepository;
    private ProductRepository productRepository;

    CartService(CartRepository cartRepository,ProductRepository productRepository){
        this.cartRepository=cartRepository;
        this.productRepository=productRepository;
    }


    public String addProduct(Cart cart){
         cartRepository.save(cart);
         return "Item added";

    }
    public List<Products> getProducts(int userId){
        List<Cart> carts = cartRepository.findByUserId(userId);

        List<Products> products = carts.stream()
                .map(cart -> productRepository.findById(cart.getProductId()))
                .filter(productOptional -> productOptional.isPresent())
                .map(productOptional -> productOptional.get())
                .toList();

        return products;


    }
    @Transactional
    public String deleteProduct(int userId,int productId){
        String msg=cartRepository.deleteByUserIdAndProductId(userId,productId);
        return msg;
    }

}
