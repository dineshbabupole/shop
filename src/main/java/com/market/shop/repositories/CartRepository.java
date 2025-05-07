package com.market.shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.market.shop.models.Cart;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CartRepository extends JpaRepository<Cart,Integer> {
    List<Cart>  findByUserId(int Id);
    String deleteByUserIdAndProductId(int userId,int productId);
}
