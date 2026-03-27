package com.example.demo.Controller;

import com.example.demo.model.Order;
import com.example.demo.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/orders")
public class TestController {

    private final OrderRepository orderRepository;

    public TestController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping("/orders")
    public String createOrder(@RequestBody Order order) {
        orderRepository.save(order);
        return "Order saved!";
    }

    @GetMapping("/orders")
    public Iterable<Order> getOrders() {
        return orderRepository.findAll();
    }

    @PostMapping("/webhook/orders")
    public String handleWebhook(@RequestBody Order order) {

        orderRepository.save(order);

        System.out.println("Saved from webhook: " + order);

        return "Webhook processed";
    }
}