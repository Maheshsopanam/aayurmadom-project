package com.aayurmadom.controller;

import com.aayurmadom.entity.Order;
import com.aayurmadom.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return orderRepository.save(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/user/{email}")
    public List<Order> getOrdersByUser(@PathVariable String email) {
        return orderRepository.findByUserEmail(email);
    }
}