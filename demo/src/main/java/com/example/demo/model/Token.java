package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity   // 🔥 VERY IMPORTANT
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int number;
    private String status;
    private String counter;
    private LocalDateTime createdAt;

    // getters
    public Long getId() { return id; }
    public int getNumber() { return number; }
    public String getStatus() { return status; }
    public String getCounter() { return counter; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // setters
    public void setId(Long id) { this.id = id; }
    public void setNumber(int number) { this.number = number; }
    public void setStatus(String status) { this.status = status; }
    public void setCounter(String counter) { this.counter = counter; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}