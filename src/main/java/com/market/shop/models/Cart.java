package com.market.shop.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int cartId;
    private int productId;
    private int userId;
    private int quantity;
}
