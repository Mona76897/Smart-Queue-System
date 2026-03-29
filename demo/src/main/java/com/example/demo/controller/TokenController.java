package com.example.demo.controller;
import com.example.demo.repository.TokenRepository;

import com.example.demo.model.Token;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tokens")
@CrossOrigin("*")
public class TokenController {

    private final TokenRepository repo;

    public TokenController(TokenRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Token> getTokens() {
        return repo.findAll();
    }

    @PostMapping
    public Token generate(@RequestParam String counter) {

        int next = repo.findAll().size() + 1;

        Token t = new Token();
        t.setNumber(next);
        t.setStatus("WAITING");
        t.setCounter(counter);
        t.setCreatedAt(java.time.LocalDateTime.now());

        return repo.save(t);
    }

@PostMapping("/next")
public Token callNext(@RequestParam String counter) {

    List<Token> tokens = repo.findAll();

    for (Token t : tokens) {
        if (t.getStatus().equals("WAITING")) {
            t.setStatus("DONE");
            return repo.save(t); // ✅ update in DB
        }
    }

    return null;
}}